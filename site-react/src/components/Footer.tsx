// Footer — 黑尾收尾（v6 §2/§5：并入深墨场，与封面首尾合上「这本图鉴」）
import { useUi } from '../i18n/LocaleContext';
import s from './Footer.module.css';

export default function Footer() {
  const { t } = useUi();
  return (
    <footer className={`field ${s.siteFooter}`}>
      <div className={`container ${s.footerInner}`}>
        <p className={s.footerNote}>{t.footer.note}</p>
        <p className={s.footerTag}>{t.footer.tagline} · PERSONAL DOSSIER</p>
        <span className={s.footerMark} aria-hidden="true">
          <svg viewBox="0 0 28 28">
            <rect x="1.5" y="1.5" width="25" height="25" fill="none" stroke="var(--color-field-line)" strokeWidth="1.2" />
            <path d="M8 21 C 8 12, 14 7, 14 7 " fill="none" stroke="var(--color-field-line)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M14 7 C 17 14, 20 18, 20 21" fill="none" stroke="var(--color-field-muted)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="14" y1="8" x2="9" y2="16" stroke="var(--color-field-muted)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </footer>
  );
}
