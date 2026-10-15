// SiteNav — 图鉴索引（v6 §6：页码 + 区名，mono）
import { useUi } from '../i18n/LocaleContext';
import s from './SiteNav.module.css';

export default function SiteNav() {
  const { t } = useUi();
  const navItems = [
    { no: '01', href: '#hero', label: t.nav.itemHero },
    { no: '04', href: '#cases', label: t.nav.itemCases },
    { no: '05', href: '#capability', label: t.nav.itemCapability },
    { no: '06', href: '#growth', label: t.nav.itemGrowth },
    { no: '07', href: '#principles', label: t.nav.itemPrinciples },
    { no: 'A', href: '#offcat', label: t.nav.itemOffcat },
    { no: '08', href: '#contact', label: t.nav.itemContact },
  ];

  return (
    <header className={s.siteNav}>
      <div className={`container ${s.navInner}`}>
        <a className={s.brand} href="#hero">
          <span className={s.brandEn}>PERSONAL DOSSIER</span>
          <span className={s.dot}>·</span>
          <span className={s.brandZh}>{t.nav.brandZh}</span>
        </a>
        <nav className={s.navLinks} aria-label={t.nav.ariaMain}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              <span className={s.navNo}>{item.no}</span>{item.label}
            </a>
          ))}
          <span className={s.navStatus}>
            <span className={s.statusDot}></span>{t.nav.statusOnline}
          </span>
        </nav>
      </div>
      <div className={s.navRule}></div>
    </header>
  );
}
