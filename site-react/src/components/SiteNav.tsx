// SiteNav — 图鉴索引（v6 §6：页码 + 区名，mono）
// v9 降噪（docs/视觉方向-v9-降噪.md D1）：删「01 封面」（logo 即回顶）+ 去编号前缀
//（编号职责归各区眉栏「档案 0X」，原「导航编号=图版号镜像」规矩废止）。
import { useUi } from '../i18n/LocaleContext';
import s from './SiteNav.module.css';

export default function SiteNav() {
  const { t, locale } = useUi();
  const navItems = [
    { href: '#story', label: t.nav.itemStory },
    { href: '#cases', label: t.nav.itemCases },
    { href: '#capability', label: t.nav.itemCapability },
    { href: '#writing', label: t.nav.itemWriting },
    { href: '#principles', label: t.nav.itemPrinciples },
    { href: '#contact', label: t.nav.itemContact },
  ];

  return (
    <header className={`${s.siteNav} ${locale === 'en' ? s.siteNavEn : ''}`}>
      <div className={`container ${s.navInner}`}>
        <a className={s.brand} href="#hero">
          <span className={s.brandEn}>PERSONAL DOSSIER</span>
          <span className={s.dot}>·</span>
          <span className={s.brandZh}>{t.nav.brandZh}</span>
        </a>
        <nav className={s.navLinks} aria-label={t.nav.ariaMain}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <span className={s.navStatus}>
            <span className={s.statusDot}></span>{t.nav.statusOnline}
          </span>
          {/* 语言切换（宪法 §1.1）：原生 <a> 指向两个静态 HTML，不用 JS 切；当前语言实底、另一路描边 */}
          <span className={s.langSwitch} role="group" aria-label={t.nav.langAria}>
            <a href={`${import.meta.env.BASE_URL}`} lang="zh-CN" className={locale === 'zh' ? s.langOn : undefined}>{'中'}</a>
            <a href={`${import.meta.env.BASE_URL}en/`} lang="en" className={locale === 'en' ? s.langOn : undefined}>{'EN'}</a>
          </span>
        </nav>
      </div>
      <div className={s.navRule}></div>
    </header>
  );
}
