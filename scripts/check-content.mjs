// check-content.mjs — 内容真源守卫（docs/i §5.4 + docs/h 批 2），build 末尾跑，失败 exit 1 并列出条目。
// 规则：① growth 的 month frontmatter 必须等于文件名 YYYY-MM（防旧条目冒充新条目）
//       ② now 恒为 1 个文件；updated 形如 YYYY-MM；doing/learning 的 text 非空
//       ③ *En 覆盖率：凡页面上会渲染的中文正文须有英文并列副本；纯拉丁装饰串豁免（批 1 裁决）
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const contentDir = join(root, 'src', 'content');
const CJK = /[\u4e00-\u9fff]/;

function front(str) {
  const m = str.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}

// 标量值（key: value 单行式；本仓库 frontmatter 全用这一式）；空值/块式列表头返回 null
function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:[ \\t]*(.*)$`, 'm'));
  const v = m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
  return v === '' ? null : v;
}

// 列表条目（块式 - x 或内联 [x, y] 均可）
function items(fm, key) {
  const inline = fm.match(new RegExp(`^${key}:[ \\t]*\\[([^\\]]*)\\]`, 'm'));
  if (inline) return inline[1].split(',').map((x) => x.trim()).filter(Boolean);
  const lines = fm.split(/\r?\n/);
  const start = lines.findIndex((l) => new RegExp(`^${key}:[ \\t]*$`).test(l));
  if (start === -1) return null;
  const out = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\S/.test(lines[i])) break; // 回到顶层键即停
    const it = lines[i].match(/^\s+-\s+(.*)$/);
    if (it) out.push(it[1].trim().replace(/^["']|["']$/g, ''));
  }
  return out;
}

// 条件副本：zh 字段存在、非空且含中文时，才要求 *En（纯拉丁串豁免）
function needEn(fm, zhKey) {
  const v = scalar(fm, zhKey);
  if (v !== null) return CJK.test(v);
  const list = items(fm, zhKey);
  return !!list && list.some((x) => CJK.test(x));
}

const EN_RULES = {
  cases: { always: ['titleEn', 'problemEn', 'whatIDidEn'], cond: [['challenge', 'challengeEn'], ['outcome', 'outcomeEn'], ['stack', 'stackEn'], ['imageAlt', 'imageAltEn']] },
  timeline: { always: ['titleEn', 'roleEn', 'detailEn'], cond: [['flag', 'flagEn'], ['stack', 'stackEn']] },
  skills: { always: ['domainEn', 'taglineEn'], cond: [['evidence', 'evidenceEn']] },
  offcat: { always: ['titleEn'], cond: [['tags', 'tagsEn']] },
  growth: { always: ['takeawayEn'], cond: [['tags', 'tagsEn']] },
};

const errors = [];

for (const [dir, rule] of Object.entries(EN_RULES)) {
  const d = join(contentDir, dir);
  for (const f of readdirSync(d).filter((x) => x.endsWith('.md'))) {
    const fm = front(readFileSync(join(d, f), 'utf8'));
    if (!fm) { errors.push(`${dir}/${f}: frontmatter 解析失败（缺闭合 ---）`); continue; }
    for (const key of rule.always) {
      if (!scalar(fm, key)) errors.push(`${dir}/${f}: 缺 ${key}`);
    }
    for (const [zhKey, enKey] of rule.cond) {
      // En 侧允许单行标量或块式列表（imageAlt/imageAltEn 这类一图一alt的字段用块式）
      if (needEn(fm, zhKey) && !scalar(fm, enKey) && !(items(fm, enKey) ?? []).length) errors.push(`${dir}/${f}: ${zhKey} 含中文但缺 ${enKey}`);
    }
  }
}

// skills 特有：skillsEn 必须存在且与 skills 条数一致（并排两列，错行即图文不符）
for (const f of readdirSync(join(contentDir, 'skills')).filter((x) => x.endsWith('.md'))) {
  const fm = front(readFileSync(join(contentDir, 'skills', f), 'utf8'));
  const zhList = items(fm, 'skills');
  const enList = items(fm, 'skillsEn');
  if (!enList || enList.length === 0) errors.push(`skills/${f}: 缺 skillsEn`);
  else if (zhList && enList.length !== zhList.length)
    errors.push(`skills/${f}: skillsEn ${enList.length} 条 ≠ skills ${zhList.length} 条`);
}

// ① growth：month === 文件名
const growthDir = join(contentDir, 'growth');
for (const f of readdirSync(growthDir).filter((x) => x.endsWith('.md'))) {
  const fm = front(readFileSync(join(growthDir, f), 'utf8'));
  const m = fm.match(/^month:\s*"?(\d{4}-\d{2})"?/m);
  if (!m) errors.push(`growth/${f}: 缺 month 字段`);
  else if (m[1] !== basename(f, '.md')) errors.push(`growth/${f}: month=${m[1]} 与文件名不一致`);
}

// ② now：恒 1 文件 + updated 格式 + 条目非空
const nowDir = join(contentDir, 'now');
const nowFiles = existsSync(nowDir) ? readdirSync(nowDir).filter((x) => x.endsWith('.md')) : [];
if (nowFiles.length !== 1) {
  errors.push(`now/: 必须恰好 1 个 md，当前 ${nowFiles.length} 个`);
} else {
  const fm = front(readFileSync(join(nowDir, nowFiles[0]), 'utf8'));
  if (!/^updated:\s*"?\d{4}-\d{2}"?\s*$/m.test(fm)) errors.push(`now/${nowFiles[0]}: updated 须形如 "2026-10"`);
  const lines = fm.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].match(/^\s*-\s+text:\s*(.*)$/);
    if (!t) continue;
    const val = t[1].trim().replace(/^["']|["']$/g, '');
    if (!val) { errors.push(`now/${nowFiles[0]}: 存在空 text 条目`); continue; }
    if (CJK.test(val) && !/^\s+textEn:\s*\S/.test(lines[i + 1] ?? ''))
      errors.push(`now/${nowFiles[0]}: text「${val.slice(0, 18)}…」缺 textEn`);
  }
  const note = scalar(fm, 'note');
  if (note && CJK.test(note) && !scalar(fm, 'noteEn')) errors.push(`now/${nowFiles[0]}: note 含中文但缺 noteEn`);
}

if (errors.length) {
  console.error('[check-content] 未通过：\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('[check-content] 通过（growth ' + readdirSync(growthDir).filter((x) => x.endsWith('.md')).length + ' 条 · now 1 条）');
