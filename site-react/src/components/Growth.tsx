// Growth — 图版 06 · 成长记录（v6：月度索引表 month │ takeaway │ tags）
import { getGrowth } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick, pickList } from '../i18n/enums';
import s from './Growth.module.css';

export default function Growth() {
  const { t, locale } = useUi();
  const posts = getGrowth();
  const subNav = [
    { href: '#hero', label: t.growth.linkArchive },
    { href: '#cases', label: t.growth.linkWorks },
    { href: '#principles', label: t.growth.linkMethod },
    { href: '#growth', label: t.growth.linkLog },
    { href: '#contact', label: t.growth.linkAbout },
  ];
  return (
    <section id="growth" className="section">
      <span className="plate-rail">{t.growth.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.growth.tagNo}</b> · {t.growth.tagZh}</span>
          <div className="right-nav">
            {subNav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <a className={s.rightArrow} href="#contact" aria-label={t.growth.nextAria}>→</a>
          </div>
        </div>
        <div className={s.growthRule}></div>

        <div className={s.growthGrid}>
          <div className={s.growthLeft}>
            <h2 className={`section-title ${s.growthTitle}`}>{t.growth.headline1}<br />{t.growth.headline2}</h2>
            <p className={s.growthSub}>{t.growth.sub}</p>
            <div className={s.growthChart} aria-hidden="true">
              <svg viewBox="0 0 320 220">
                <line x1="24" y1="180" x2="304" y2="180" stroke="var(--color-ink)" strokeWidth="1" />
                <line x1="24" y1="20" x2="24" y2="180" stroke="var(--color-ink)" strokeWidth="1" />
                <rect x="40" y="172" width="20" height="8" fill="var(--color-ink)" opacity="0.32" />
                <rect x="76" y="160" width="20" height="20" fill="var(--color-ink)" opacity="0.40" />
                <rect x="112" y="146" width="20" height="34" fill="var(--color-ink)" opacity="0.50" />
                <rect x="148" y="128" width="20" height="52" fill="var(--color-ink)" opacity="0.60" />
                <rect x="184" y="106" width="20" height="74" fill="var(--color-ink)" opacity="0.72" />
                <rect x="220" y="82" width="20" height="98" fill="var(--color-ink)" opacity="0.84" />
                <rect x="256" y="58" width="20" height="122" fill="var(--color-ink)" opacity="0.95" />
                <rect x="292" y="34" width="20" height="146" fill="var(--color-ink)" opacity="1" />
                <polyline points="50,168 86,154 122,140 158,122 194,100 230,76 266,52 302,28" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
                <polyline points="294,30 302,28 300,36" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="50" cy="168" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
                <circle cx="86" cy="154" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
                <circle cx="122" cy="140" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
                <circle cx="158" cy="122" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
                <circle cx="194" cy="100" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
                <circle cx="230" cy="76" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
                <circle cx="266" cy="52" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
                <circle cx="302" cy="28" r="2.5" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.2" />
              </svg>
            </div>
          </div>

          <div className={s.growthList}>
            <div className={`rail ${s.growthHead}`}>
              <span>{t.growth.thMonth}</span>
              <span>{t.growth.thTakeaway}</span>
              <span>{t.growth.thTags}</span>
            </div>
            {posts.map((p, i) => (
              <article key={i} className={s.growthItem}>
                <span className={s.growthMonth}>{p.month}</span>
                <p className={s.growthTakeaway}>{pick(locale, p.takeaway, p.takeawayEn)}</p>
                {!!p.tags?.length && (
                  <span className={s.growthTags}>{pickList(locale, p.tags, p.tagsEn).join(' · ')}</span>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
