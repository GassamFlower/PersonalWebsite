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

// 要发的语言。加 'en' 的前提是 UI 字典与内容 *En 字段补齐——缺一个键这份脚本就 exit 1，
// 绝不让英文页静默回退成中文（那等于两种语言讲不同的事）。
const EMIT = ['zh'];
const KNOWN = ['zh', 'en'];

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
    // 标题/描述/og:* 的英文副本属批 4，这里先把 lang 属性换对，避免英文内容挂 zh-CN 标记
    html = html.replace('<html lang="zh-CN">', '<html lang="en">');
    const outDir = resolve(root, 'dist', locale);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'index.html'), html, 'utf8');
  } else {
    writeFileSync(resolve(root, 'dist', 'index.html'), html, 'utf8');
  }
  console.log(`[prerender] ${locale} → dist/${locale === 'zh' ? '' : `${locale}/`}index.html（${(appHtml.length / 1024).toFixed(1)} kB 内容）`);
}
