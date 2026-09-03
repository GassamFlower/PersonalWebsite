// entry-server.tsx — 预渲染入口：把完整 App 渲染成静态 HTML 字符串。
// 目的：保住宪法 §17「无 JS 时关键内容仍完整可见」。
// 纪律：服务端不做任何 effect(DOM/window/IntersectionObserver/r3f)，仅渲染内容结构；
//       r3f 因 show3D 初始为 false 且仅客户端 useEffect 置真，服务端不会渲染粒子。
import { renderToString } from 'react-dom/server';
import App from './App';

export function render() {
  return renderToString(<App />);
}