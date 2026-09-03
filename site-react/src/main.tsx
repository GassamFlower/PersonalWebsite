import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// 客户端水合：若初始 HTML 是 SSR 预渲染（#root 已有内容），用 hydrateRoot 挂事件；
// 否则（直播/直开测试）退化为 createRoot 常规渲染。
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;
  const isServerRendered = root.children.length > 0;
  if (isServerRendered) {
    ReactDOM.hydrateRoot(
      root,
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
});