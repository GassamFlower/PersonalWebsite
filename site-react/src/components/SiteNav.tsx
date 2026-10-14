// SiteNav — 图鉴索引（v6 §6：页码 + 区名，mono）
import s from './SiteNav.module.css';

const navItems = [
  { no: '01', href: '#hero', label: '封面' },
  { no: '04', href: '#cases', label: '项目' },
  { no: '05', href: '#capability', label: '能力' },
  { no: '06', href: '#growth', label: '成长' },
  { no: '07', href: '#principles', label: '规矩' },
  { no: 'A', href: '#offcat', label: '附录' },
  { no: '08', href: '#contact', label: '联系' },
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
            <a key={item.href} href={item.href}>
              <span className={s.navNo}>{item.no}</span>{item.label}
            </a>
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
