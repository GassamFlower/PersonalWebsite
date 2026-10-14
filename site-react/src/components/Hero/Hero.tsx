// Hero — 封面（v6：深墨场 + 巨衬线立论 + 白档案卡压在墨上；3D 粒子已按 Q3=b 移除）
import { useEffect, useState } from 'react';
import { getCases } from '../../lib/content';
import Seal from '../Seal';
import s from './Hero.module.css';

const props = [
  { href: '#capability', label: '独立交付' },
  { href: '#cases', label: '业务落地' },
  { href: '#principles', label: '边界诚实' },
];

export default function Hero() {
  const [inTitle, setInTitle] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInTitle(true);
  }, []);

  // 事实行取内容真源前 3 案，不硬编码；仅「已上线」级事实盖朱砂章（v5 §2.2 纪律继承）
  const facts = getCases().slice(0, 3);

  return (
    <section id="hero" className={`section hero field crop ${s.hero}`}>
      <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
      <span className="plate-rail">封面 · COVER</span>

      <div className={`container ${s.heroInner}`}>
        <div className="section-head">
          <span className="tag"><b>档案 01</b> · PERSONAL DOSSIER · 独立系统建构者</span>
          <span className={s.heroReg} aria-hidden="true">
            <span className="regmark"><i className="k" /><i className="r" /><i className="w" /></span>
          </span>
        </div>
        <div className={s.heroRule}></div>

        <div className={s.heroGrid}>
          <div className={s.heroLeft}>
            <div className={`rail ${s.heroRail}`}>
              <span className="gate">DOSSIER</span> · 一个故事 · 独立系统建构者
            </div>
            <h1 className={`${s.heroTitle} ${inTitle ? s.heroTitleIn : ''}`}>
              把复杂的事情，<br />变成可以运行的系统。
            </h1>
            <p className={s.heroSub}>8 年在真实系统里 · 工业数字化 · 全栈 · 真实交付</p>
            <a className={s.heroFocus} href="#contact">聊聊你的问题 →</a>
          </div>

          <aside className={s.dossier} aria-label="已验证事实档案卡">
            <header className={s.dossierHead}>
              <span className="rail">
                <span className="gate">GATE✓</span> · 上线 2026-08 · REV 2026-10
              </span>
              <span className={s.dossierName}>档案卡</span>
            </header>

            <ul className={s.factList}>
              {facts.map((c) => (
                <li key={c.title} className={s.factRow}>
                  <span className={s.factStatus}>{c.status}</span>
                  <span className={s.factTitle}>{c.title}</span>
                  {c.status === '已上线' && <Seal label="已验证" />}
                </li>
              ))}
            </ul>

            <footer className={s.dossierFoot}>
              <a className={`btn ${s.dossierCta}`} href="#cases">精选作品 01—04</a>
            </footer>
          </aside>
        </div>

        <div className={s.heroFoot}>
          {props.map((p) => (
            <a key={p.href} className={s.heroProp} href={p.href}>
              <span>{p.label}</span>
              <span className={s.arrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
