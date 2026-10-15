// Hero — 封面（v6：深墨场 + 巨衬线立论 + 白档案卡压在墨上；3D 粒子已按 Q3=b 移除）
import { useEffect, useState } from 'react';
import { getCases } from '../../lib/content';
import { useUi } from '../../i18n/LocaleContext';
import { pick, enumLabel, STATUS_EN } from '../../i18n/enums';
import Seal from '../Seal';
import s from './Hero.module.css';

export default function Hero() {
  const { t, locale } = useUi();
  const [inTitle, setInTitle] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInTitle(true);
  }, []);

  // 事实行取内容真源前 3 案，不硬编码；仅「已上线」级事实盖朱砂章（v5 §2.2 纪律继承）
  const facts = getCases().slice(0, 3);
  // v7 §13.6：能力图谱下线后，三链改指案例/履历/规矩
  const props = [
    { href: '#cases', label: t.hero.propDelivery },
    { href: '#timeline', label: t.hero.propImpact },
    { href: '#principles', label: t.hero.propPrinciples },
  ];

  return (
    <section id="hero" className={`section hero field crop ${s.hero}`}>
      <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
      <span className="plate-rail">{t.hero.plateRail}</span>

      <div className={`container ${s.heroInner}`}>
        <div className="section-head">
          <span className="tag"><b>{t.hero.eyebrowNo}</b> · {t.hero.siteLatin} · {t.hero.role}</span>
          <span className={s.heroReg} aria-hidden="true">
            <span className="regmark"><i className="k" /><i className="r" /><i className="w" /></span>
          </span>
        </div>
        <div className={s.heroRule}></div>

        <div className={s.heroGrid}>
          <div className={s.heroLeft}>
            <div className={`rail ${s.heroRail}`}>
              <span className="gate">{t.hero.railGate}</span> · {t.hero.signature} · {t.hero.role}
            </div>
            <h1 className={`${s.heroTitle} ${inTitle ? s.heroTitleIn : ''}`}>
              {t.hero.titleLine1}<br />{t.hero.titleLine2}
            </h1>
            <p className={s.heroSub}>{t.hero.subline}<br />{t.hero.subline2}</p>
            <a className={s.heroFocus} href="#contact">{t.hero.focusCta}</a>
          </div>

          <aside className={s.dossier} aria-label={t.hero.dossierAria}>
            <header className={s.dossierHead}>
              <span className="rail">
                <span className="gate">{t.hero.gateLabel}</span> · {t.hero.releasedLabel} 2026-08 · {t.hero.revLabel} 2026-10
              </span>
              <span className={s.dossierName}>{t.hero.dossierName}</span>
            </header>

            <ul className={s.factList}>
              {facts.map((c) => (
                <li key={c.title} className={s.factRow}>
                  <span className={s.factStatus}>{enumLabel(locale, STATUS_EN, c.status)}</span>
                  <span className={s.factTitle}>{pick(locale, c.title, c.titleEn)}</span>
                  {c.status === '已上线' && <Seal label={t.hero.sealVerified} />}
                </li>
              ))}
            </ul>

            <footer className={s.dossierFoot}>
              <a className={`btn ${s.dossierCta}`} href="#cases">{t.hero.worksCta}</a>
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
