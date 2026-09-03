// App.tsx — 组装 9 区分区（v4 顺序保真）
import React from 'react';
import SiteNav from './components/SiteNav';
import Hero from './components/Hero/Hero';
import Story from './components/Story';
import Timeline from './components/Timeline';
import Cases from './components/Cases';
import CapabilityMap from './components/CapabilityMap';
import Growth from './components/Growth';
import Principles from './components/Principles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/global.css';

export default function App() {
  return (
    <React.Fragment>
      <SiteNav />
      <main id="main">
        <Hero />
        <Story />
        <Timeline />
        <Cases />
        <CapabilityMap />
        <Growth />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </React.Fragment>
  );
}