// prerender.mjs — 把 SSR 渲染出的 HTML 注入各语言 index.html 的 #root 空壳。
// 运行时机：vite build（客户端产物）→ vite build --config vite.config.ssr.ts（dist-server）→ 本脚本。
// 纪律：产物仍是纯静态 dist/，无后端；关键内容写入初始 HTML，无 JS 时仍可见（宪法 §17）。
// 语言 = 两个静态 HTML（宪法 §1.1）：/ 与 /en/，各出一份完整初始 HTML，不靠 JS 切换。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// 要发的语言。批 2 已完成：UI 字典与内容 *En 字段齐备（缺一个键这份脚本仍 exit 1），
// en 正式发射 → dist/en/index.html（宪法 §1.1 两个静态 HTML）。
const EMIT = ['zh', 'en'];
const KNOWN = ['zh', 'en'];

// en 版 head 副本（中文原文以 site-react/index.html 为准，这里是对应译文，措辞见 docs/h §3）
const SITE = 'https://gassamflower.github.io/PersonalWebsite/';
const EN_HEAD = {
  title: 'PERSONAL DOSSIER · Independent Delivery Archive',
  description:
    'Turning a tangle into a working system — the public delivery archive of an independent systems builder.',
  imageAlt:
    'A paper-white card with ink-black hairlines and crop marks, a vermilion signature seal at the lower right.',
};

// hreflang：两个静态 HTML 互为语言副本（§1.1），x-default 归中文主页
const LANG_LINKS =
  `<link rel="alternate" hreflang="zh-CN" href="${SITE}" />\n    ` +
  `<link rel="alternate" hreflang="en" href="${SITE}en/" />\n    ` +
  `<link rel="alternate" hreflang="x-default" href="${SITE}" />`;

// 按正则整段替换 head 标签；找不到就报错——head 结构变了说明副本会错位，不能静默跳过
function replaceTag(html, re, next) {
  if (!re.test(html)) throw new Error(`head 改写失败：dist/index.html 中找不到 ${re}`);
  return html.replace(re, next);
}
// 用属性串定位一个 <meta>（兼容换行书写的多行属性）
function replaceAttr(html, attr, next) {
  const esc = attr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return replaceTag(html, new RegExp(`<meta[^>]*${esc}[^>]*/>`), next);
}

// 1) 读客户端 index.html 空壳（含 hashed 资源引用）；先读一次，避免多语言互相污染
const shell = readFileSync(resolve(root, 'dist', 'index.html'), 'utf8');
const marker = '<div id="root"></div>';
if (!shell.includes(marker)) {
  throw new Error('dist/index.html 中找不到 #root 空壳，无法注入 SSR 内容');
}

// 2) 执行 SSR bundle
const serverPath = resolve(root, 'dist-server', 'entry-server.cjs');
const { render, missingKeys } = require(serverPath);

// 3) 每个已知语言报进度；每个要发的语言先过键位守卫再落盘
for (const locale of KNOWN) {
  const missing = missingKeys(locale);
  if (!EMIT.includes(locale)) {
    if (missing.length > 0) {
      console.log(`[i18n] ${locale} 未发布：UI 字典缺 ${missing.length} 键（例：${missing.slice(0, 4).join(', ')}…）`);
    } else {
      console.log(`[i18n] ${locale} 字典已齐，但未列入 EMIT，故不发`);
    }
    continue;
  }
  if (missing.length > 0) {
    throw new Error(
      `[i18n] ${locale} 已列入 EMIT 但字典缺 ${missing.length} 个键：\n  ${missing.join('\n  ')}`
    );
  }

  const appHtml = render(locale);
  let html = shell.replace(marker, `<div id="root">${appHtml}</div>`);
  if (locale !== 'zh') {
    // 英文页 head：lang、标题、描述与 og:* 全量换成英文副本，og:image 指向 og-en.png
    html = html.replace('<html lang="zh-CN">', '<html lang="en">');
    html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${EN_HEAD.title}</title>`);
    html = replaceAttr(html, 'name="description"', `<meta name="description" content="${EN_HEAD.description}" />`);
    html = replaceAttr(html, 'property="og:locale"', `<meta property="og:locale" content="en_US" />`);
    html = replaceAttr(html, 'property="og:url"', `<meta property="og:url" content="${SITE}en/" />`);
    html = replaceAttr(html, 'property="og:title"', `<meta property="og:title" content="${EN_HEAD.title}" />`);
    html = replaceAttr(html, 'property="og:description"', `<meta property="og:description" content="${EN_HEAD.description}" />`);
    html = replaceAttr(html, 'property="og:image"', `<meta property="og:image" content="${SITE}og-en.png" />`);
    html = replaceAttr(html, 'property="og:image:alt"', `<meta property="og:image:alt" content="${EN_HEAD.imageAlt}" />`);
  }
  html = html.replace('</head>', `    ${LANG_LINKS}\n  </head>`);
  if (locale !== 'zh') {
    const outDir = resolve(root, 'dist', locale);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'index.html'), html, 'utf8');
  } else {
    writeFileSync(resolve(root, 'dist', 'index.html'), html, 'utf8');
  }
  console.log(`[prerender] ${locale} → dist/${locale === 'zh' ? '' : `${locale}/`}index.html（${(appHtml.length / 1024).toFixed(1)} kB 内容）`);
}
