// Hero — 封面（v6：深墨场 + 巨衬线立论 + 白档案卡压在墨上；3D 粒子已按 Q3=b 移除）
import { useEffect, useState } from 'react';
import { getHeroFacts } from '../../lib/content';
import { useUi } from '../../i18n/LocaleContext';
import { pick } from '../../i18n/enums';
import { MkCircle } from '../annotations/Annotations';
import s from './Hero.module.css';

export default function Hero() {
  const { t, locale } = useUi();
  const [inTitle, setInTitle] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInTitle(true);
  }, []);

  // 档案卡三行 = 真源 featured 的详案卡（数量由 check-content ⑦ 兜住），不在组件里挑案
  const facts = getHeroFacts();

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
            {/* v8 手层①：h1 单行拼接防空白节点（nowrap）；「一个故事」套手绘圈注（dark=提亮朱砂） */}
            <h1 className={`${s.heroTitle} ${locale === 'en' ? s.heroTitleEn : ''} ${inTitle ? s.heroTitleIn : ''}`}>{t.hero.titlePre}<MkCircle dark>{t.hero.titleMark}</MkCircle>{t.hero.titlePost}</h1>
            <p className={s.heroSub}>{t.hero.subline}<br />{t.hero.subline2}</p>
            <a className={s.heroFocus} href="#contact">{t.hero.focusCta}</a>
          </div>

          <aside className={s.dossier} aria-label={t.hero.dossierAria}>
            <header className={s.dossierHead}>
              <span className="rail"><span className="gate">{t.hero.gateLabel}</span></span>
              <span className={s.dossierName}>{t.hero.dossierName}</span>
            </header>

            {/* v8.7（用户裁决）：三行由名单改成可点索引——整行一个原生 <a> 直达案例区那张详案卡；
                卡内不盖「已验证」章（与案例卡同日撤章同一裁决），进度与边界由那张卡自己讲。
                那行说明是 whatIDid 截到第一个句读（派生自真源字段，不另造事实），故整块走 sans。 */}
            <ul className={s.factList}>
              {facts.map((c) => (
                <li key={c.order} className={s.factRow}>
                  <a className={s.factLink} href={`#case-${c.order}`}>
                    <span className={s.factTitle}>{pick(locale, c.title, c.titleEn)}</span>
                    <span className={s.factNote} data-font="sans">{pick(locale, c.note, c.noteEn)}</span>
                    <span className={s.factArrow} aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>

            <footer className={s.dossierFoot}>
              <a className={`btn ${s.dossierCta}`} href="#cases" data-font="sans">{t.hero.worksCta}</a>
              {/* 本站版本事实从卡眉挪到卡脚：压在案例名单头上会被读成「这三个案子的上线时间」 */}
              <span className={s.dossierSite}>
                {t.hero.siteLabel} · {t.hero.releasedLabel} 2026-08 · {t.hero.revLabel} 2026-10
              </span>
            </footer>
          </aside>
        </div>
      </div>
    </section>
  );
}
