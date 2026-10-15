// LocaleContext.tsx — 把语言与 UI 字典传给各分区组件。
// 服务端由 prerender 指定 locale，客户端由 URL 推出同一 locale，两边必须一致否则水合报错。
import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from './locale';
import { uiFor, ui, type ZoneUi } from './ui';

const LocaleCtx = createContext<{ locale: Locale; t: ZoneUi }>({
  locale: 'zh',
  t: ui.zh,
});

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <LocaleCtx.Provider value={{ locale, t: uiFor(locale) }}>
      {children}
    </LocaleCtx.Provider>
  );
}

export function useUi() {
  return useContext(LocaleCtx);
}
