// SiteNav — 全局顶部水平导航（React 版 · 保真 Astro SiteNav）
import s from './SiteNav.module.css';

const navItems = [
  { href: '#hero', label: '做过的' },
  { href: '#cases', label: '项目' },
  { href: '#capability', label: '能力' },
  { href: '#growth', label: '成长' },
  { href: '#principles', label: '规矩' },
  { href: '#contact', label: '联系' },
];

export default function SiteNav() {
  return (
    <header className={s.siteNav}>
      <div className={`container ${s.navInner}`}>
        <a className={s.brand} href="#hero">
          <span className={s.brandEn}>PERSONAL DOSSIER</span>
          <span className={s.dot}>·</span>
          <span className={s.brandZh}>独立交付档案</span>
        </a>
        <nav className={s.navLinks} aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <span className={s.navStatus}>
            <span className={s.statusDot}></span>在线
          </span>
        </nav>
      </div>
      <div className={s.navRule}></div>
    </header>
  );
}