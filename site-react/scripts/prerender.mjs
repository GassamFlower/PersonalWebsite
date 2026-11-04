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

// AI 爬虫分组（站主 2026-11-03 裁决：检索类与训练类都放行）。
// 检索类决定能否被 AI 搜索引用；训练类只决定内容是否进入训练语料。
// Google-Extended 不影响 Google 搜索与 AI Overviews，后者走 Googlebot。
const AI_RETRIEVAL = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Claude-User',
  'Claude-SearchBot',
  'Bingbot',
  'Googlebot',
];
const AI_TRAINING = ['GPTBot', 'Google-Extended', 'ClaudeBot', 'CCBot', 'Applebot-Extended', 'meta-externalagent'];

const FEED_TITLE = { zh: 'PERSONAL DOSSIER · 写作', en: 'PERSONAL DOSSIER · Writing' };
const FEED_DESC = {
  zh: '独立系统建构者的写作。',
  en: 'Essays from an independent systems builder.',
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
  const ld = page.kind === 'post' ? blogPosting(page) + breadcrumb(page) : homeSchema(page);
  const feed = `<link rel="alternate" type="application/rss+xml" title="${attr(FEED_TITLE[page.locale])}" href="${SITE}${page.locale === 'en' ? 'en/' : ''}rss.xml" />`;
  return out.replace('</head>', `    ${langLinks(page)}\n    ${feed}\n${ld}  </head>`);
}

// 统一的 JSON-LD 输出：转义 < 防止内容里的尖括号截断脚本块
function ldScript(data) {
  return `    <script type="application/ld+json">${JSON.stringify(data, null, 2).replace(/</g, '\\u003c')}</script>\n`;
}

// 子页的机器可读层（docs/k §5）：一篇一个 BlogPosting，只写站内已成立的事实
// （headline/description 取本篇真源字段，datePublished 是 YYYY-MM，作者与站点指主页已有的 @id）
function blogPosting(page) {
  const url = `${SITE}${page.path}`;
  return ldScript({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline: page.title,
    description: page.description,
    image: `${SITE}${page.locale === 'en' ? 'og-en.png' : 'og.png'}`,
    inLanguage: page.locale === 'en' ? 'en' : 'zh-CN',
    datePublished: page.date,
    articleSection: page.locale === 'en' ? 'Writing' : '写作',
    author: { '@id': `${SITE}#person` },
    publisher: { '@id': `${SITE}#person` },
    isPartOf: { '@id': `${SITE}#website` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  });
}

// 面包屑只写真实存在的两级：语言主页 → 本篇。写作区没有独立列表页，不造中间层。
function breadcrumb(page) {
  const homeUrl = `${SITE}${page.locale === 'en' ? 'en/' : ''}`;
  return ldScript({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: page.locale === 'en' ? 'Home' : '首页',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: `${SITE}${page.path}`,
      },
    ],
  });
}

// 主页：ProfilePage 指向主页已有的 Person；案例清单只收 featured 三张详案卡，
// 名字与说明直接取自内容真源，不写评分、价格、客户名。
function homeSchema(page) {
  const homeUrl = `${SITE}${page.locale === 'en' ? 'en/' : ''}`;
  return ldScript({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${homeUrl}#profilepage`,
    url: homeUrl,
    inLanguage: page.locale === 'en' ? 'en' : 'zh-CN',
    mainEntity: { '@id': `${SITE}#person` },
    hasPart: {
      '@type': 'ItemList',
      itemListElement: heroFacts().map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: page.locale === 'en' ? (c.titleEn ?? c.title) : c.title,
          description: page.locale === 'en' ? c.noteEn : c.note,
          url: `${SITE}#case-${c.order}`,
        },
      })),
    },
  });
}


// 1) 读客户端 index.html 空壳（含 hashed 资源引用）；先读一次，各页都从这份壳出发
// 首屏样式内联（docs/o §4 R1）：外部 CSS 是这条链路上唯一的「样式单点失败源」——
// 本机实测 5 次取回 1 次在 TLS 之后被连接重置（docs/o §2.2），重置发生时访客看到的是裸 HTML。
// 只内联 CSS，JS 仍外链：内容层由 SSR 兜住（宪法 §17），样式层没有等价兜底，所以补在这里。
// 三条前提各由一道断言兜住，任一不成立即 build 失败，不做静默降级：
//   ① url() 必须绝对路径——子页在 /writing/<slug>/，相对路径会解析到文章目录下去取字体；
//   ② CSS 内不得出现 </style，否则内联即破相；
//   ③ 内联后壳里不得再残留 rel="stylesheet"（将来 vite 拆出第二个 CSS 分片时会被这条拦下，
//      而不是让某一页悄悄漏掉样式）。
function inlineCss(html) {
  const href = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/.exec(html)?.[1];
  if (!href) throw new Error('dist/index.html 找不到样式表 link，无法内联首屏 CSS');
  const css = readFileSync(resolve(root, 'dist', href.replace(/^\/+/, '')), 'utf8');
  if (/<\/style/i.test(css)) throw new Error('CSS 内含 </style，内联会破相');
  if (/url\(\s*['"]?[.]{1,2}\//.test(css)) throw new Error('CSS 含相对 url()，子页会解析错位，禁止内联');
  const out = html.replace(/<link[^>]*rel="stylesheet"[^>]*>[ \t]*\r?\n?/, `    <style>${css}</style>\n`);
  if (/rel="stylesheet"/.test(out)) throw new Error('样式表未完全内联：产物仍残留 rel="stylesheet"');
  return out;
}

const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

// 站点地图的双语互指与首页 x-default（与 head 的 hreflang 同口径）
function alternatesXml(page) {
  const base = page.kind === 'home' ? '' : `writing/${page.slug}/`;
  const zh = `${SITE}${base}`;
  const en = `${SITE}en/${base}`;
  let out = `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${xmlEscape(zh)}" />\n`;
  out += `    <xhtml:link rel="alternate" hreflang="en" href="${xmlEscape(en)}" />\n`;
  if (page.kind === 'home') out += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(zh)}" />\n`;
  return out;
}

// 站点地图由页面清单生成：新增文章只改内容真源，这里随构建更新。
// 文章真源只有年月（YYYY-MM），不补日期，因此不写 lastmod。
function sitemapXml(pages) {
  const urls = pages
    .map((page) => `  <url>\n    <loc>${xmlEscape(`${SITE}${page.path}`)}</loc>\n${alternatesXml(page)}  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function robotsTxt() {
  const group = (ua) => `User-agent: ${ua}\nAllow: /\n`;
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# 检索类：决定能否被 AI 搜索引用',
    ...AI_RETRIEVAL.map(group),
    '# 训练类：站主已放行',
    ...AI_TRAINING.map(group),
    `Sitemap: ${SITE}sitemap.xml`,
    '',
  ].join('\n');
}

function feedXml(locale, slugs) {
  const en = locale === 'en';
  const home = `${SITE}${en ? 'en/' : ''}`;
  const self = `${home}rss.xml`;
  const items = slugs
    .map((slug) => {
      const meta = postMeta(slug, locale);
      if (!meta) throw new Error(`[feed] ${locale} 取不到 ${slug} 的 head 字段`);
      const link = `${home}writing/${slug}/`;
      return `    <item>
      <title>${xmlEscape(meta.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>
      <description>${xmlEscape(meta.description)}</description>
    </item>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(FEED_TITLE[locale])}</title>
    <link>${xmlEscape(home)}</link>
    <description>${xmlEscape(FEED_DESC[locale])}</description>
    <language>${en ? 'en' : 'zh-CN'}</language>
    <atom:link href="${xmlEscape(self)}" rel="self" type="application/rss+xml" />
${items ? `${items}\n` : ''}  </channel>
</rss>
`;
}

// 每页写盘前的机器层断言：JSON-LD 可解析、类型齐、canonical 与 feed 链接指向本页
function assertPage(html, page) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (blocks.length === 0) throw new Error(`[schema] ${page.path} 缺 JSON-LD`);
  for (const block of blocks) {
    try {
      JSON.parse(block);
    } catch (err) {
      throw new Error(`[schema] ${page.path} JSON-LD 无法解析：${err.message}`);
    }
  }
  const all = blocks.join('\n');
  if (page.kind === 'home') {
    if (!all.includes('"ProfilePage"')) throw new Error(`[schema] ${page.path} 缺 ProfilePage`);
    if (!all.includes('"ItemList"')) throw new Error(`[schema] ${page.path} 缺案例 ItemList`);
  } else {
    if (!all.includes('"BlogPosting"')) throw new Error(`[schema] ${page.path} 缺 BlogPosting`);
    if (!all.includes('"BreadcrumbList"')) throw new Error(`[schema] ${page.path} 缺 BreadcrumbList`);
  }
  if (!html.includes(`<link rel="canonical" href="${SITE}${page.path}" />`)) {
    throw new Error(`[head] ${page.path} canonical 未指向本页`);
  }
  if (!html.includes('rel="alternate" type="application/rss+xml"')) {
    throw new Error(`[head] ${page.path} 缺 RSS 链接`);
  }
}

function assertMachineLayer(pages, sitemap, robots, feeds) {
  const locCount = (sitemap.match(/<loc>/g) ?? []).length;
  if (locCount !== pages.length) throw new Error(`[sitemap] URL 数 ${locCount} 不等于页面数 ${pages.length}`);
  if (sitemap.includes('gassamflower')) throw new Error('[sitemap] 仍含旧域名 gassamflower');
  for (const page of pages) {
    if (!sitemap.includes(`<loc>${SITE}${page.path}</loc>`)) throw new Error(`[sitemap] 缺 ${page.path}`);
  }
  if (!robots.includes(`Sitemap: ${SITE}sitemap.xml`)) throw new Error('[robots] Sitemap 指向错误');
  for (const ua of [...AI_RETRIEVAL, ...AI_TRAINING]) {
    if (!robots.includes(`User-agent: ${ua}`)) throw new Error(`[robots] 缺 ${ua}`);
  }
  for (const [locale, xml] of Object.entries(feeds)) {
    if (!xml.includes('<rss version="2.0"')) throw new Error(`[feed] ${locale} 不是 RSS 2.0`);
    if (!xml.includes('<channel>')) throw new Error(`[feed] ${locale} 缺 channel`);
  }
}

const shell = inlineCss(readFileSync(resolve(root, 'dist', 'index.html'), 'utf8'));
const marker = '<div id="root"></div>';
if (!shell.includes(marker)) {
  throw new Error('dist/index.html 中找不到 #root 空壳，无法注入 SSR 内容');
}
const ZH_HOME = zhHomeHead(shell);

// 2) 执行 SSR bundle
const serverPath = resolve(root, 'dist-server', 'entry-server.cjs');
const { render, missingKeys, postSlugs, postMeta, heroFacts } = require(serverPath);

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
  assertPage(html, page);
  const outDir = resolve(root, 'dist', page.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), html, 'utf8');
  console.log(`[prerender] ${page.locale} ${page.kind} → dist/${page.path}index.html（${(appHtml.length / 1024).toFixed(1)} kB 内容）`);
}

// 机器可读层与页面同源生成：robots、sitemap、两套 RSS。静态 public/ 副本已移除，避免再次漂移。
const sitemap = sitemapXml(pages);
const robots = robotsTxt();
const feeds = {};
for (const locale of EMIT) {
  const slugs = posts.filter((slug) => Boolean(postMeta(slug, locale)));
  feeds[locale] = feedXml(locale, slugs);
  writeFileSync(resolve(root, 'dist', locale === 'en' ? 'en/rss.xml' : 'rss.xml'), feeds[locale], 'utf8');
}
writeFileSync(resolve(root, 'dist', 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(root, 'dist', 'robots.txt'), robots, 'utf8');
assertMachineLayer(pages, sitemap, robots, feeds);
console.log(`[machine] robots + sitemap ×${pages.length} + RSS ×${EMIT.length} 已生成并自检`);
console.log(`[prerender] 共发射 ${pages.length} 张静态页面（主页 ${EMIT.length} 张 + 子页 ${posts.length * EMIT.length} 张）`);
