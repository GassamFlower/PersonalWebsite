// prerender.mjs — 把 SSR 渲染出的 HTML 注入 dist/index.html 的 #root 空壳。
// 运行时机：vite build（客户端产物）→ vite build --config vite.config.ssr.ts（dist-server）→ 本脚本。
// 纪律：产物仍是纯静态 dist/，无后端；关键内容写入初始 HTML，无 JS 时仍可见（宪法 §17）。
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const require = createRequire(import.meta.url);

// 1) 读客户端 index.html（含 hashed 资源引用）
const htmlPath = resolve(root, 'dist', 'index.html');
let html = readFileSync(htmlPath, 'utf8');

// 2) 执行 SSR bundle，得到完整 App HTML
const serverPath = resolve(root, 'dist-server', 'entry-server.cjs');
const { render } = require(serverPath);
const appHtml = render();

// 3) 注入 #root
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  throw new Error('dist/index.html 中找不到 #root 空壳，无法注入 SSR 内容');
}
html = html.replace(marker, `<div id="root">${appHtml}</div>`);

// 4) 说明：无 JS 时可见（meta 补一条友好一致性，纯注释不影响渲染）
writeFileSync(htmlPath, html, 'utf8');

console.log(`[prerender] 已注入 SSR HTML -> dist/index.html（${(appHtml.length / 1024).toFixed(1)} kB 内容）`);