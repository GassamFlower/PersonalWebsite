// App.tsx — 组装 9 区（v4 顺序保真）+ 末尾附录「工作台之外」（v6 §11，插在建区之后、封底之前）
import React from 'react';
import SiteNav from './components/SiteNav';
import Hero from './components/Hero/Hero';
import Story from './components/Story';
import Timeline from './components/Timeline';
import Cases from './components/Cases';
import CapabilityMap from './components/CapabilityMap';
import Growth from './components/Growth';
import Principles from './components/Principles';
import Offcat from './components/Offcat';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/global.css';

export default function App() {
  return (
    <React.Fragment>
      <a className="skip-link" href="#main">跳到正文</a>
      <SiteNav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Story />
        <Timeline />
        <Cases />
        <CapabilityMap />
        <Growth />
        <Principles />
        <Offcat />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}