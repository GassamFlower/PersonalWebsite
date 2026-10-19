// SiteNav — 图鉴索引（v6 §6：页码 + 区名，mono）
// 编号是版面图版号（各区 plate-rail / meta）的镜像，不是导航自己的序号：增删区时必须同步增删项，
// 否则 01→03 这类空洞会让读者以为漏了一个区（2026-10-17 补回 02 故事即为此）。
import { useUi } from '../i18n/LocaleContext';
import s from './SiteNav.module.css';

export default function SiteNav() {
  const { t, locale } = useUi();
  const navItems = [
    { no: '01', href: '#hero', label: t.nav.itemHero },
    { no: '02', href: '#story', label: t.nav.itemStory },
    { no: '03', href: '#cases', label: t.nav.itemCases },
    { no: '04', href: '#capability', label: t.nav.itemCapability },
    { no: '05', href: '#writing', label: t.nav.itemWriting },
    { no: '06', href: '#principles', label: t.nav.itemPrinciples },
    { no: '07', href: '#contact', label: t.nav.itemContact },
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
              <span className={s.navNo}>{item.no}</span>{item.label}
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
