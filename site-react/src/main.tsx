import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { browserLocale } from './i18n/locale';
import { routeFromPath } from './lib/routes';
import './styles/global.css';

// 客户端水合：若初始 HTML 是 SSR 预渲染（#root 已有内容），用 hydrateRoot 挂事件；
// 否则（直播/直开测试）退化为 createRoot 常规渲染。
// 语言与页面都由 URL 决定（/ → 中文主页，/en/ → 英文主页，/writing/<slug>/ → 文章子页），
// 解析走 routes.ts 同一个函数，与 prerender 必须一致，否则水合会渲染成另一张页面。
// 不包 DOMContentLoaded：type="module" 本身延迟到 DOM 解析完才执行，
// 而在 vite dev 下 DCL 可能早于整张模块图执行完就发车，包一层会整页白屏且无报错。
const root = document.getElementById('root');
if (root) {
  const locale = browserLocale();
  const route = routeFromPath(window.location.pathname);
  const isServerRendered = root.children.length > 0;
  const tree = (
    <React.StrictMode>
      <App locale={locale} route={route} />
    </React.StrictMode>
  );
  if (isServerRendered) {
    ReactDOM.hydrateRoot(root, tree);
  } else {
    ReactDOM.createRoot(root).render(tree);
  }
}
