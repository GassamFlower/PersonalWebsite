// locale.ts — 语言标识与解析。SSR（prerender）与客户端水合必须用同一个规则，否则两边渲染的语言不一致。
export type Locale = 'zh' | 'en';

// 路径规则（宪法 §1.1）：/ 是中文，/en/ 是英文，两个静态 HTML，切换靠原生 <a>。
export function localeFromPath(pathname: string): Locale {
  return /(^|\/)en(\/|$)/.test(pathname) ? 'en' : 'zh';
}

export function browserLocale(): Locale {
  return localeFromPath(window.location.pathname);
}
