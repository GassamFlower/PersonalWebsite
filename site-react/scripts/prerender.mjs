// prerender.mjs — 把 SSR 渲染出的 HTML 注入各语言 index.html 的 #root 空壳。
// 运行时机：vite build（客户端产物）→ vite build --config vite.config.ssr.ts（dist-server）→ 本脚本。
// 纪律：产物仍是纯静态 dist/，无后端；关键内容写入初始 HTML，无 JS 时仍可见（宪法 §17）。
// 语言 = 两个静态 HTML（宪法 §1.1）：/ 与 /en/，各出一份完整初始 HTML，不靠 JS 切换。
// 页面 = 主页两张 + 每篇文章两张子页（宪法 §1.2）：子页由这里逐个发射目录 index.html，
// GitHub Pages 原生认目录索引，不需要 rewrite；路径口径与客户端共用 routes.ts。
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
// 自定义域生效后一切对外 URL（canonical / hreflang / og / JSON-LD）都走域名根，不再写 github.io 子路径
const SITE = 'https://onetale.cn/';
const EN_HEAD = {
  title: 'PERSONAL DOSSIER · Independent Delivery Archive',
  description:
    'Turning a tangle into a working system — the public delivery archive of an independent systems builder.',
  imageAlt:
    'A paper-white card with ink-black hairlines and crop marks, a vermilion signature seal at the lower right.',
};

// 中文主页的 head 事实直接从壳里读，不再在脚本里抄一份平行副本（改了 index.html 不会两头不一致）
function zhHomeHead(html) {
  const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1];
  const description = /<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(html)?.[1];
  if (!title || !description) throw new Error('site-react/index.html 缺 title 或 description，无法发射主页 head');
  return { title, description };
}

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
// 内容字段进 HTML 属性前转义（标题/摘要里出现引号是内容的事，不能让壳破相）
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// hreflang：同一张页面的两个语言副本互指（§1.1）；x-default 归中文主页，子页不声明
function langLinks(page) {
  const zhUrl = `${SITE}${page.kind === 'home' ? '' : `writing/${page.slug}/`}`;
  const enUrl = `${SITE}en/${page.kind === 'home' ? '' : `writing/${page.slug}/`}`;
  const pair =
    `<link rel="alternate" hreflang="zh-CN" href="${zhUrl}" />\n    ` +
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`;
  return page.kind === 'home' ? `${pair}\n    <link rel="alternate" hreflang="x-default" href="${zhUrl}" />` : pair;
}

// 逐页 head：title/description/og:* /canonical 都指向本页，分享图仍用站点级 og(-en).png（每篇配图属后续批）
function applyHead(html, page) {
  const url = `${SITE}${page.path}`;
  let out = html;
  if (page.locale === 'en') out = out.replace('<html lang="zh-CN">', '<html lang="en">');
  out = replaceTag(out, /<title>[\s\S]*?<\/title>/, `<title>${attr(page.title)}</title>`);
  out = replaceAttr(out, 'name="description"', `<meta name="description" content="${attr(page.description)}" />`);
  out = replaceAttr(out, 'property="og:type"', `<meta property="og:type" content="${page.kind === 'post' ? 'article' : 'website'}" />`);
  out = replaceAttr(out, 'property="og:locale"', `<meta property="og:locale" content="${page.locale === 'en' ? 'en_US' : 'zh_CN'}" />`);
  out = replaceAttr(out, 'property="og:url"', `<meta property="og:url" content="${attr(url)}" />`);
  out = replaceAttr(out, 'property="og:title"', `<meta property="og:title" content="${attr(page.title)}" />`);
  out = replaceAttr(out, 'property="og:description"', `<meta property="og:description" content="${attr(page.description)}" />`);
  out = replaceAttr(out, 'property="og:image"', `<meta property="og:image" content="${SITE}${page.locale === 'en' ? 'og-en.png' : 'og.png'}" />`);
  if (page.locale === 'en') {
    out = replaceAttr(out, 'property="og:image:alt"', `<meta property="og:image:alt" content="${attr(EN_HEAD.imageAlt)}" />`);
  }
  // canonical 必须跟着页面与语言走，否则子页会把自己声明成主页的副本
  out = replaceTag(out, /<link[^>]*rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${attr(url)}" />`);
  const ld = page.kind === 'post' ? blogPosting(page) : '';
  return out.replace('</head>', `    ${langLinks(page)}\n${ld}  </head>`);
}

// 子页的机器可读层（docs/k §5）：一篇一个 BlogPosting，只写站内已成立的事实
// （headline/description 取本篇真源字段，datePublished 是 YYYY-MM，作者与站点指主页已有的 @id）
function blogPosting(page) {
  const url = `${SITE}${page.path}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline: page.title,
    description: page.description,
    inLanguage: page.locale === 'en' ? 'en' : 'zh-CN',
    datePublished: page.date,
    author: { '@id': `${SITE}#person` },
    isPartOf: { '@id': `${SITE}#website` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return `    <script type="application/ld+json">${JSON.stringify(data, null, 2).replace(/</g, '\\u003c')}</script>\n`;
}

// 1) 读客户端 index.html 空壳（含 hashed 资源引用）；先读一次，各页都从这份壳出发
const shell = readFileSync(resolve(root, 'dist', 'index.html'), 'utf8');
const marker = '<div id="root"></div>';
if (!shell.includes(marker)) {
  throw new Error('dist/index.html 中找不到 #root 空壳，无法注入 SSR 内容');
}
const ZH_HOME = zhHomeHead(shell);

// 2) 执行 SSR bundle
const serverPath = resolve(root, 'dist-server', 'entry-server.cjs');
const { render, missingKeys, postSlugs, postMeta } = require(serverPath);

// 3) 每个已知语言先过键位守卫（缺键不静默回退中文，直接 build 失败）
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
}

// 4) 页面清单：两张主页 + 每篇已发布文章两张子页（postSlugs 只收 published !== false 的）
const posts = postSlugs();
const pages = [];
for (const locale of EMIT) {
  const home = locale === 'en' ? EN_HEAD : ZH_HOME;
  pages.push({
    kind: 'home', locale, slug: '', route: { kind: 'home' },
    path: locale === 'en' ? 'en/' : '', title: home.title, description: home.description,
  });
}
for (const slug of posts) {
  for (const locale of EMIT) {
    const meta = postMeta(slug, locale);
    if (!meta) throw new Error(`[prerender] ${locale} 取不到 ${slug} 的 head 字段`);
    pages.push({
      kind: 'post', locale, slug, route: { kind: 'post', slug },
      path: `${locale === 'en' ? 'en/' : ''}writing/${slug}/`, ...meta,
    });
  }
}

// 5) 逐页渲染并落盘：dist/index.html、dist/en/index.html、dist[/en]/writing/<slug>/index.html
for (const page of pages) {
  const appHtml = render(page.locale, page.route);
  const html = applyHead(shell.replace(marker, `<div id="root">${appHtml}</div>`), page);
  const outDir = resolve(root, 'dist', page.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), html, 'utf8');
  console.log(`[prerender] ${page.locale} ${page.kind} → dist/${page.path}index.html（${(appHtml.length / 1024).toFixed(1)} kB 内容）`);
}
console.log(`[prerender] 共发射 ${pages.length} 张静态页面（主页 ${EMIT.length} 张 + 子页 ${posts.length * EMIT.length} 张）`);
