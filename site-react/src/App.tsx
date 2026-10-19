// App.tsx — v7.1 叙事微调（v6 图鉴 §13.8）：封面 → 故事(02·曾经/正在) → 案例(03) → 能力(04) → 写作(05) → 规矩(06) → 封底(07)。
// 「当下」插页撤下，doing 真源并入故事区「正在做什么」块；「来路」编年区按用户裁决下线（罗列=与故事区重复），md 真源与守卫保留；
// 「附录 · 工作台之外」按用户裁决整区撤下（2026-10-16），md 真源与 check-content 守卫保留。
// 「成长」月度索引区按用户裁决整区撤下（2026-10-17，罗列+自评腔），md 真源与 check-content 守卫保留。
import React from 'react';
import SiteNav from './components/SiteNav';
import Hero from './components/Hero/Hero';
import Story from './components/Story';
import Cases from './components/Cases';
import Capability from './components/Capability';
import Writing from './components/Writing';
import Principles from './components/Principles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Post from './components/Post';
import { LocaleProvider, useUi } from './i18n/LocaleContext';
import { getPost } from './lib/content';
import type { Locale } from './i18n/locale';
import type { Route } from './lib/routes';
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
        <Principles />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default function App({ locale = 'zh', route = { kind: 'home' } }: { locale?: Locale; route?: Route }) {
  // 子页与主页是两张不同的静态 HTML（宪法 §1.2）；slug 不在已发布清单里时回落主页，
  // 这条只会在 dev/preview 的 SPA 回退下走到，线上不存在的子页由 GitHub Pages 直接 404。
  const post = route.kind === 'post' ? getPost(route.slug) : undefined;
  return (
    <LocaleProvider locale={locale}>
      {post ? <Post post={post} /> : <Shell />}
    </LocaleProvider>
  );
}
