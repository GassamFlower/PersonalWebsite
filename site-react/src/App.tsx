// App.tsx — v7 叙事改向（v6 图鉴 §13）：封面 → 当下 → 故事 → 案例(03) → 写作(04) → 履历(05) → 成长 → 规矩 → 附录 → 封底。
// 技能档案区已下线；总图版数仍为 8（写作区接替 04 号位，履历移到 05）。
import React from 'react';
import SiteNav from './components/SiteNav';
import Hero from './components/Hero/Hero';
import Now from './components/Now';
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
        <Now />
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
