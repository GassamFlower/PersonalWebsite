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
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// 脚本在 scripts/ 下，仓库根要往上退一级
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.slice(1)), '..');
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

const strip = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;|&#\d+;/g, ' ');

function renderedChars() {
  const set = new Set(MARGIN_CP);
  const add = (t) => { for (const ch of t) { const cp = ch.codePointAt(0); if (cp > 0x1f) set.add(cp); } };
  for (const p of ['dist/index.html', 'site-react/dist/index.html']) {
    const f = path.join(ROOT, p);
    if (fs.existsSync(f)) add(strip(fs.readFileSync(f, 'utf8')));
  }
  const walk = (d) => {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f);
      else if (e.name.endsWith('.md')) add(fs.readFileSync(f, 'utf8'));
    }
  };
  walk(path.join(ROOT, 'src/content'));
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
