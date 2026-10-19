// routes.ts — 站点路径的唯一解析处（宪法 §1.2：允许构建期预渲染的静态子页，但不引路由库）。
// 客户端水合与 prerender 必须走同一个函数，否则两边渲染的页面不是同一张，SSR 就白做了。
import type { Locale } from '../i18n/locale';

export type Route = { kind: 'home' } | { kind: 'post'; slug: string };

const BASE = import.meta.env.BASE_URL; // 自定义域在站点根 → '/'

// /writing/<slug>/ 与 /en/writing/<slug>/ → 同一篇的两个语言副本；其余一律主页
export function routeFromPath(pathname: string): Route {
  const rel = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const seg = rel.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const i = seg[0] === 'en' ? 1 : 0;
  if (seg[i] === 'writing' && seg[i + 1]) return { kind: 'post', slug: seg[i + 1] };
  return { kind: 'home' };
}

export function homePath(locale: Locale): string {
  return `${BASE}${locale === 'en' ? 'en/' : ''}`;
}

export function postPath(slug: string, locale: Locale): string {
  return `${homePath(locale)}writing/${slug}/`;
}
