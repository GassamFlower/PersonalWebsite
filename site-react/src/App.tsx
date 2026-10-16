// App.tsx — v7.1 叙事微调（v6 图鉴 §13.8）：封面 → 故事(02·曾经/正在) → 案例(03) → 能力(04) → 写作(05) → 成长(06) → 规矩(07) → 附录 → 封底(08)。
// 「当下」插页撤下，doing 真源并入故事区「正在做什么」块；「来路」编年区按用户裁决下线（罗列=与故事区重复），md 真源与守卫保留。
import React from 'react';
import SiteNav from './components/SiteNav';
import Hero from './components/Hero/Hero';
import Story from './components/Story';
import Cases from './components/Cases';
import Capability from './components/Capability';
import Writing from './components/Writing';
import Growth from './components/Growth';
import Principles from './components/Principles';
import Offcat from './components/Offcat';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LocaleProvider, useUi } from './i18n/LocaleContext';
import type { Locale } from './i18n/locale';
import './styles/global.css';

function Shell() {
  const { t } = useUi();
  return (
    <React.Fragment>
      <a className="skip-link" href="#main">{t.shell.skipLink}</a>
      <SiteNav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Story />
        <Cases />
        <Capability />
        <Writing />
        <Growth />
        <Principles />
        <Offcat />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default function App({ locale = 'zh' }: { locale?: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Shell />
    </LocaleProvider>
  );
}
