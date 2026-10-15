// entry-server.tsx — 预渲染入口：把完整 App 渲染成静态 HTML 字符串。
// 目的：保住宪法 §17「无 JS 时关键内容仍完整可见」；两种语言各出一份初始 HTML（§1.1）。
// 纪律：服务端不做任何 effect(DOM/window/IntersectionObserver/r3f)，仅渲染内容结构。
import { renderToString } from 'react-dom/server';
import App from './App';
import { missingKeys } from './i18n/ui';
import type { Locale } from './i18n/locale';

export function render(locale: Locale = 'zh') {
  return renderToString(<App locale={locale} />);
}

export { missingKeys };
export type { Locale };
