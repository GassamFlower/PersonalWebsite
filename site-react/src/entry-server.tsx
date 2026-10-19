// entry-server.tsx — 预渲染入口：把完整 App 渲染成静态 HTML 字符串。
// 目的：保住宪法 §17「无 JS 时关键内容仍完整可见」；两种语言各出一份初始 HTML（§1.1）。
// 纪律：服务端不做任何 effect(DOM/window/IntersectionObserver/r3f)，仅渲染内容结构。
// 多页（§1.2）：同一次调用按 route 选页面，子页清单与逐页 head 也从这里取，路径口径与组件共用 routes.ts/content.ts。
import { renderToString } from 'react-dom/server';
import App from './App';
import { missingKeys } from './i18n/ui';
import { getWriting, getPostMeta } from './lib/content';
import type { Locale } from './i18n/locale';
import type { Route } from './lib/routes';

export function render(locale: Locale = 'zh', route: Route = { kind: 'home' }) {
  return renderToString(<App locale={locale} route={route} />);
}

// prerender 发射子页用：已发布文章的 slug 清单 + 本篇在该语言的 head 字段
export function postSlugs(): string[] {
  return getWriting().map((p) => p.slug);
}

export function postMeta(slug: string, locale: Locale) {
  return getPostMeta(slug, locale);
}

export { missingKeys };
export type { Locale, Route };
