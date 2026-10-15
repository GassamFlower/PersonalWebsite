// check-content.mjs — 内容真源守卫（docs/i §5.4），build 末尾跑，失败 exit 1 并列出条目。
// 规则：① growth 的 month frontmatter 必须等于文件名 YYYY-MM（防旧条目冒充新条目）
//       ② now 恒为 1 个文件；updated 形如 YYYY-MM；doing/learning 的 text 非空
//       ③（预留）h 文档批 2 的 *En 覆盖率守卫并入此处，不另立门户
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const contentDir = join(root, 'src', 'content');

function front(str) {
  const m = str.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}

const errors = [];

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
  for (const line of fm.split(/\r?\n/)) {
    if (/^\s*-\s+text:\s*$/.test(line)) errors.push(`now/${nowFiles[0]}: 存在空 text 条目`);
  }
}

if (errors.length) {
  console.error('[check-content] 未通过：\n  ' + errors.join('\n  '));
  process.exit(1);
}
console.log('[check-content] 通过（growth ' + readdirSync(growthDir).filter((x) => x.endsWith('.md')).length + ' 条 · now 1 条）');
