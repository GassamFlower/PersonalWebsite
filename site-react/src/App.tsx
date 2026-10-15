// App.tsx — v7.1 叙事微调（v6 图鉴 §13.8）：封面 → 故事(02·曾经/正在) → 案例(03) → 写作(04) → 来路(05) → 成长 → 规矩 → 附录 → 封底。
// 「当下」插页撤下，doing 真源并入故事区「正在做什么」块；总图版数仍为 8。
import React from 'react';
import SiteNav from './components/SiteNav';
import Hero from './components/Hero/Hero';
import Story from './components/Story';
import Cases from './components/Cases';
import Writing from './components/Writing';
import Timeline from './components/Timeline';
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
        <Writing />
        <Timeline />
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
