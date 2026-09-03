// Footer — 底部（React 版 · 保真 Astro Base footer）
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.siteFooter}>
      <div className={`container ${s.footerInner}`}>
        <p className={s.footerNote}>展示内容均经匿名化脱敏，不涉及具体公司 / 客户信息</p>
        <p className={s.footerTag}>把一团乱麻，理成能用的系统 · PERSONAL DOSSIER</p>
        <span className={s.footerMark} aria-hidden="true">
          <svg viewBox="0 0 28 28">
            <rect x="1.5" y="1.5" width="25" height="25" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
            <path d="M8 21 C 8 12, 14 7, 14 7 " fill="none" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M14 7 C 17 14, 20 18, 20 21" fill="none" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="14" y1="8" x2="9" y2="16" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </footer>
  );
}