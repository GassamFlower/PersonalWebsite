// Timeline — 档案 03 · 做过的事（React 版 · 内容真源 getTimeline）
import { getTimeline } from '../lib/content';
import s from './Timeline.module.css';

export default function Timeline() {
  const nodes = getTimeline();
  return (
    <section id="timeline" className="section timeline">
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>档案 03</b> · 做过的事</span>
          <span className="meta">03</span>
        </div>
        <div className={s.tlRule}></div>

        <h2 className={`section-title ${s.tlTitle}`}>干过的活，<br />都有据可查</h2>

        <div className={s.tl}>
          {nodes.map((n, i) => (
            <article key={i} className={s.tlNode}>
              <span className={s.tlMarker} aria-hidden="true"></span>
              <div className={s.tlHead}>
                <span className={s.tlYear}>{n.year}</span>
                {n.flag && <span className={s.tlFlag}>{n.flag}</span>}
              </div>
              <h3 className={s.tlName}>{n.title}</h3>
              <p className={s.tlRole}>{n.role}</p>
              <p className={s.tlDesc}>{n.detail}</p>
              {n.stack.length > 0 && (
                <p className={s.tlStack}>{n.stack.join('　/　')}</p>
              )}
            </article>
          ))}
        </div>

        {/* 左下角档案盒 + 存档印章 */}
        <div className={s.tlArt} aria-hidden="true">
          <svg viewBox="0 0 320 170" className={s.archiveSvg}>
            <line x1="10" y1="14" x2="220" y2="14" stroke="var(--color-faint)" strokeWidth="0.6" strokeDasharray="3 3" />
            <line x1="115" y1="14" x2="115" y2="156" stroke="var(--color-faint)" strokeWidth="0.5" strokeDasharray="6 1 1 1" />
            <rect x="20" y="40" width="60" height="100" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
            <rect x="32" y="52" width="36" height="6" fill="none" stroke="var(--color-faint)" strokeWidth="0.6" />
            <rect x="32" y="64" width="36" height="6" fill="none" stroke="var(--color-faint)" strokeWidth="0.6" />
            <rect x="86" y="40" width="60" height="100" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
            <rect x="92" y="32" width="3" height="60" fill="none" stroke="var(--color-faint)" strokeWidth="0.7" />
            <rect x="100" y="28" width="3" height="68" fill="none" stroke="var(--color-line)" strokeWidth="0.7" />
            <rect x="108" y="34" width="3" height="60" fill="none" stroke="var(--color-faint)" strokeWidth="0.7" />
            <rect x="116" y="30" width="3" height="66" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
            <rect x="124" y="32" width="3" height="62" fill="none" stroke="var(--color-faint)" strokeWidth="0.7" />
            <rect x="132" y="28" width="3" height="68" fill="none" stroke="var(--color-line)" strokeWidth="0.7" />
            <rect x="106" y="118" width="20" height="6" rx="1" fill="none" stroke="var(--color-ink)" strokeWidth="0.8" />
            <rect x="152" y="40" width="60" height="100" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
            <rect x="164" y="52" width="36" height="6" fill="none" stroke="var(--color-faint)" strokeWidth="0.6" />
            <rect x="164" y="64" width="36" height="6" fill="none" stroke="var(--color-faint)" strokeWidth="0.6" />
            <g transform="translate(238 80)">
              <circle cx="34" cy="34" r="34" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" />
              <circle cx="34" cy="34" r="28" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" />
              <text x="34" y="42" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="18" fill="var(--color-accent)" fontWeight="700">存档</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}