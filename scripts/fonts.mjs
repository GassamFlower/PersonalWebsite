// scripts/fonts.mjs — 中文衬线显示字体的子集化与覆盖率守卫
//
// 背景 2026-10-14：站点曾挂 fonts.googleapis.com，而该域名在大陆网络不可达
// （本机 curl 12s 超时即为证据），访客拿到的是系统回退字，v6 的衬线字阶在人家机器上塌掉。
// 全量 Noto Serif SC 每字重 3.1 MB（101 个 unicode-range 分片），整页文本命中 21 片 = 806 kB/字重，
// 移动端不可接受，所以按实际渲染字符做子集。
//
// 用法：
//   node scripts/fonts.mjs          重新生成子集（需 python + fonttools + brotli + Noto Serif SC 可变字体）
//   node scripts/fonts.mjs --check  校验现有子集是否覆盖当前渲染文本（进 build，缺字即失败）
//
// 注：本文件刻意不在字符串字面量里写中文标点 —— 编辑链路会把全角引号规范化成 ASCII 从而截断字符串，
// 需要余量时用码位表达。
// 注 2：本文件是**脚本不是库**——顶层直接执行子集化。别 import 它做单测（会原地重跑三档，4 分钟），
// 要测 serifText() 就把它抽进临时模块。
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 脚本在 scripts/ 下，仓库根要往上退一级。
// 必须用 fileURLToPath：早期用 pathname.slice(1) 只在 Windows 凑巧对（/E:/… 去首斜杠），
// Linux（CI）上会变成相对路径，导致读不到子集清单——2026-10-14 CI 就是这么红的。
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WEIGHTS = [500, 600, 700];
const OUT_DIR = 'assets/fonts';
const SOURCE = process.env.NOTO_SERIF_SOURCE || 'C:/Windows/Fonts/NotoSerifSC-VF.ttf';

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
// 符号与标点余量：内容新增常见标点后不必立刻重跑
const MARGIN_CP = [
  ...range(0x41, 0x5a), ...range(0x61, 0x7a), ...range(0x30, 0x39),
  0x2010, 0x2013, 0x2014, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2026,
  0x2190, 0x2191, 0x2192, 0x2193, 0x2212, 0x2713, 0x00a9, 0x00ae, 0x00b0,
  0x00b7, 0x00d7, 0x00f7, 0x00b1,
  ...range(0x2160, 0x2169), ...range(0xff01, 0xff5e), ...range(0x3000, 0x3011),
  ...'%#&*/\\|_+=-[]{}<>()~^@'.split('').map((c) => c.codePointAt(0)),
];

const stripStyle = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

// 只留下「真正用衬线渲染」的文本：带 data-font="sans" 的子树整段剔除。
// 为什么需要剔除：--font-sans（Noto Sans SC → 系统字）不挂 webfont，零字节；
// 长文正文因此走 sans。若仍把这些字收进衬线子集，一篇 2000 字的文章会白要 ~500 kB 字体。
// 用栈而不是正则：正文里 <li> 可嵌套 <ul><li>，非贪婪匹配会提前截断、把后文漏进来。
function serifText(html) {
  const stack = [];
  let out = '';
  for (const tok of stripStyle(html).split(/(<[^>]*>)/g)) {
    if (tok === '') continue;
    if (tok[0] !== '<') {
      if (!stack.some((e) => e.sans)) out += tok;
      continue;
    }
    if (tok.startsWith('<!')) continue;
    const name = /^<\/?([a-zA-Z][-\w]*)/.exec(tok)?.[1]?.toLowerCase();
    if (!name) continue;
    if (tok[1] === '/') {
      const i = stack.map((e) => e.name).lastIndexOf(name);
      if (i >= 0) stack.length = i;
      continue;
    }
    if (!VOID.has(name) && !tok.endsWith('/>')) {
      stack.push({ name, sans: /data-font\s*=\s*["']sans["']/.test(tok) });
    }
  }
  return out.replace(/&[a-z]+;|&#\d+;/g, ' ');
}

// 子集输入 = 部署面的初始 HTML，不是 src/content 的 md 全文。
// 原来扫 md 全文是把「未发布的草稿、不渲染的字段」也算进覆盖集（实测多要 65 码位），
// 且永远不知道该字最终用哪档字体渲染；改扫 HTML 后，缺字判定与实际渲染面一一对应。
// 顺序保证不失守：vite build → prerender → fonts --check，检查时 HTML 已是最新产物。
const htmlFiles = (dir, out = []) => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) htmlFiles(f, out);
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

function renderedChars() {
  const set = new Set(MARGIN_CP);
  const add = (t) => { for (const ch of t) { const cp = ch.codePointAt(0); if (cp > 0x1f) set.add(cp); } };
  for (const dir of ['dist', 'site-react/dist']) {
    for (const f of htmlFiles(path.join(ROOT, dir))) add(serifText(fs.readFileSync(f, 'utf8')));
  }
  return set;
}

const coverageFile = path.join(ROOT, OUT_DIR, 'serif-coverage.json');
const chars = renderedChars();

if (process.argv.includes('--check')) {
  if (!fs.existsSync(coverageFile)) {
    console.error('[fonts] 缺子集清单，请先执行 node scripts/fonts.mjs');
    process.exit(1);
  }
  const have = new Set(JSON.parse(fs.readFileSync(coverageFile, 'utf8')));
  const missing = [...chars].filter((cp) => !have.has(cp));
  if (missing.length) {
    console.error(`[fonts] 衬线子集缺 ${missing.length} 个字符：${missing.map((c) => String.fromCodePoint(c)).join('')}`);
    console.error('[fonts] 内容变了，请重跑 node scripts/fonts.mjs');
    process.exit(1);
  }
  console.log(`[fonts] 覆盖率校验通过（子集 ${have.size} / 当前渲染 ${chars.size} 字符）`);
  process.exit(0);
}

if (!fs.existsSync(SOURCE)) {
  console.error(`[fonts] 找不到源字体 ${SOURCE}，用 NOTO_SERIF_SOURCE 指定 Noto Serif SC 可变字体`);
  process.exit(1);
}
const textArg = [...chars].map((cp) => String.fromCodePoint(cp)).join('');
console.log(`[fonts] 目标 ${chars.size} 字符，源 ${SOURCE}`);
fs.mkdirSync(path.join(ROOT, OUT_DIR), { recursive: true });
const tmpDir = path.join(ROOT, '.tmp-fontsrc');
fs.mkdirSync(tmpDir, { recursive: true });

for (const w of WEIGHTS) {
  const out = `noto-serif-sc-${w}.woff2`;
  const outFile = path.join(ROOT, OUT_DIR, out);
  // fontTools 4.60 的 subset 无 --instancer，先固化字重再裁字
  const inst = path.join(tmpDir, `nss-${w}.ttf`);
  execFileSync('python', ['-m', 'fontTools.varLib.instancer', SOURCE, `wght=${w}`, '-o', inst],
    { stdio: 'inherit', cwd: ROOT });
  execFileSync('python', ['-m', 'fontTools.subset', inst,
    `--text=${textArg}`, '--flavor=woff2',
    '--layout-features=kern', '--desubroutinize', '--no-hinting',
    `--output-file=${outFile}`], { stdio: 'inherit', cwd: ROOT });
  const kb = (fs.statSync(outFile).size / 1024).toFixed(1);
  console.log(`[fonts] ${out} ${kb} kB`);
}
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.writeFileSync(coverageFile, JSON.stringify([...chars].sort((a, b) => a - b)));
console.log(`[fonts] 清单 ${path.relative(ROOT, coverageFile)}：${chars.size} 码位`);
