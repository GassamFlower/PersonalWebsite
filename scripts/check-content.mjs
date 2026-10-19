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

// md 正文（闭合 --- 之后的部分）；写作集合的中文正文放这里（docs/k §3）
function bodyOf(str) {
  const m = str.match(/^---\r?\n[\s\S]*?\r?\n---[ \t]*\r?\n?([\s\S]*)$/);
  return m ? m[1].trim() : '';
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

// 块式标量（key: | 之后的缩进正文，按首行缩进 dedent）；英文正文 bodyEn 用它，避免把整篇文章塞进一行
function block(fm, key) {
  const lines = fm.split(/\r?\n/);
  const start = lines.findIndex((l) => new RegExp(`^${key}:[ \\t]*[|>][-+]?[ \\t]*$`).test(l));
  if (start === -1) return '';
  const out = [];
  let indent = null;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\S/.test(lines[i])) break;
    const ind = lines[i].match(/^(\s*)/)[1].length;
    if (indent === null && lines[i].trim()) indent = ind;
    out.push(lines[i].slice(indent ?? 0));
  }
  return out.join('\n').trim();
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

// ⑤ capability.md（docs/k §1.2 改版）：整体自述 intro / introEn 必须成对等长，缺一侧即图文不符
{
  const p = join(contentDir, 'capability.md');
  if (!existsSync(p)) errors.push('capability.md 不存在（能力档位区整体自述真源）');
  else {
    const fm = front(readFileSync(p, 'utf8'));
    const zhList = items(fm, 'intro');
    const enList = items(fm, 'introEn');
    if (!zhList.length) errors.push('capability.md: 缺 intro');
    if (!enList.length) errors.push('capability.md: 缺 introEn');
    else if (zhList.length !== enList.length)
      errors.push(`capability.md: introEn ${enList.length} 条 ≠ intro ${zhList.length} 条`);
  }
}

// ⑥ writing-plan.md（docs/j §4）：空态实质内容。why/planLabel 单行标量须有 *En；topics 与 topicsEn 条数一一对应
{
  const p = join(contentDir, 'writing-plan.md');
  if (!existsSync(p)) errors.push('writing-plan.md 不存在（写作区空态实质内容真源）');
  else {
    const fm = front(readFileSync(p, 'utf8'));
    for (const [zhKey, enKey] of [['why', 'whyEn'], ['planLabel', 'planLabelEn']]) {
      if (!scalar(fm, zhKey)) errors.push(`writing-plan.md: 缺 ${zhKey}`);
      else if (CJK.test(scalar(fm, zhKey)) && !scalar(fm, enKey)) errors.push(`writing-plan.md: ${zhKey} 含中文但缺 ${enKey}`);
    }
    const zhList = items(fm, 'topics');
    const enList = items(fm, 'topicsEn');
    if (!zhList.length) errors.push('writing-plan.md: 缺 topics');
    if (!enList.length) errors.push('writing-plan.md: 缺 topicsEn');
    else if (zhList.length !== enList.length)
      errors.push(`writing-plan.md: topicsEn ${enList.length} 条 ≠ topics ${zhList.length} 条`);
  }
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

// ③ skills 的 level 只允许两档（docs/k §1.2）：真源里没有「在学」，页面也不画「在学」；
//    出现第三档或「精通」一律拦停——en 侧 LEVEL_EN 查不到键会静默回落中文，属于图文不符。
const LEVELS = ['已交付', '会用'];
for (const f of readdirSync(join(contentDir, 'skills')).filter((x) => x.endsWith('.md'))) {
  const lv = scalar(front(readFileSync(join(contentDir, 'skills', f), 'utf8')), 'level');
  if (!lv) errors.push(`skills/${f}: 缺 level`);
  else if (!LEVELS.includes(lv)) errors.push(`skills/${f}: level=${lv} 不在两档（${LEVELS.join('/')}）之内`);
}

// ④ 写作集合（docs/k §3/§4）：目录可以不存在（第一篇未落地），存在则逐篇硬校验。
//    中文正文走 md body，英文正文走 frontmatter bodyEn；两者缺一即该篇不上页。
//    渲染器只认块级子集（## / - / 段落），所以行内语法必须在 build 时拦，不能让它原样吐到页面上。
const INLINE = [
  [/\*\*/, '**加粗**'],
  [/`/, '`行内代码`'],
  [/[[\]]/, '[链接]'],
  [/!\[/, '!图片'],
  [/^\s*>/m, '> 引用'],
  [/^\s*#(?!# )/m, '非 ## 的标题层级'],
  [/\|/, '表格'],
];
const writingDir = join(contentDir, 'writing');
const writingFiles = existsSync(writingDir) ? readdirSync(writingDir).filter((x) => x.endsWith('.md')) : [];
// slug 即子页 URL 段（docs/j §4 · 宪法 §1.2），发布后改它等于换 URL；
// en 是语言段，撞进来会让 /en/writing/<slug>/ 的解析两头不是人，故一并 reserved。
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slugsSeen = new Map();
for (const f of writingFiles) {
  const str = readFileSync(join(writingDir, f), 'utf8');
  const fm = front(str);
  if (!fm) { errors.push(`writing/${f}: frontmatter 解析失败（缺闭合 ---）`); continue; }
  const d = basename(f, '.md');
  for (const key of ['title', 'date', 'summary', 'slug', 'titleEn', 'summaryEn']) {
    if (!scalar(fm, key)) errors.push(`writing/${f}: 缺 ${key}`);
  }
  const slug = scalar(fm, 'slug');
  if (slug) {
    if (!SLUG_RE.test(slug)) errors.push(`writing/${f}: slug=${slug} 须为 ASCII 小写字母数字加单个连字符，不以连字符开头结尾`);
    else if (slug.length > 40) errors.push(`writing/${f}: slug=${slug} 长度 ${slug.length} > 40`);
    else if (slug === 'en') errors.push(`writing/${f}: slug=en 与语言段冲突，换一个`);
    if (slugsSeen.has(slug)) errors.push(`writing/${f}: slug=${slug} 与 ${slugsSeen.get(slug)} 重复（子页 URL 必须唯一）`);
    else slugsSeen.set(slug, `writing/${f}`);
  }
  // 英文正文：块式 bodyEn 优先，单行标量也收（docs/j §3 改版后正文用块式标量）
  const enBody = block(fm, 'bodyEn') || (scalar(fm, 'bodyEn') ?? '');
  if (!enBody) errors.push(`writing/${f}: 缺 bodyEn（英文正文，块式标量 bodyEn: |）`);
  const date = scalar(fm, 'date');
  if (date && !/^\d{4}-\d{2}(-\d{2})?$/.test(date)) errors.push(`writing/${f}: date=${date} 须形如 2026-10`);
  else if (date && !d.startsWith(date.slice(0, 7))) errors.push(`writing/${f}: 文件名前缀须是 ${date.slice(0, 7)}`);
  const body = bodyOf(str);
  if (!body) errors.push(`writing/${f}: md body（中文正文）为空`);
  for (const [re, label] of INLINE) {
    if (re.test(body) || re.test(enBody))
      errors.push(`writing/${f}: 用了不支持的行内语法 ${label}（渲染器只认 ## / - / 段落）`);
  }
}

// ⑦ 封面档案卡（docs/f §封面 · v8.7）：`featured: true` 恰好 3 条，且只能标在 tier=feature 的详案卡上。
//    三行是卡面的设计容量，选哪三案属内容裁决——所以口径放真源、由守卫兜住，绝不写死在组件里。
//    那行说明取 `whatIDid` 到第一个句读，故 featured 的案必须有 whatIDid（不另造字段=不新增事实）。
const HERO_SLOTS = 3;
const featured = [];
for (const f of readdirSync(join(contentDir, 'cases')).filter((x) => x.endsWith('.md'))) {
  const fm = front(readFileSync(join(contentDir, 'cases', f), 'utf8'));
  if (!/^\s*featured:\s*true\s*$/m.test(fm)) continue;
  const tier = scalar(fm, 'tier');
  if (tier !== 'feature') errors.push(`cases/${f}: featured 只能标在 tier=feature 的详案卡上（当前 tier=${tier ?? '缺'}）`);
  if (!scalar(fm, 'whatIDid')) errors.push(`cases/${f}: featured 但缺 whatIDid（封面卡那行说明的取词处）`);
  featured.push(f);
}
if (featured.length !== HERO_SLOTS)
  errors.push(`cases/: 封面档案卡需要恰好 ${HERO_SLOTS} 条 featured: true，当前 ${featured.length} 条${featured.length ? `（${featured.join('、')}）` : ''}`);

if (errors.length) {
  console.error('[check-content] 未通过：\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log(
  '[check-content] 通过（growth ' + readdirSync(growthDir).filter((x) => x.endsWith('.md')).length +
  ' 条 · now 1 条 · skills ' + readdirSync(join(contentDir, 'skills')).filter((x) => x.endsWith('.md')).length +
  ' 档 · writing ' + writingFiles.length + ' 篇）'
);
