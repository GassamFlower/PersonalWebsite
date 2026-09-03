// Growth — 档案 06 · 成长记录（React 版 · md 驱动 getGrowth）
import { getGrowth } from '../lib/content';
import s from './Growth.module.css';

const subNav = [
  { href: '#hero', label: '档案' },
  { href: '#cases', label: '作品' },
  { href: '#principles', label: '方法' },
  { href: '#growth', label: '记录' },
  { href: '#contact', label: '关于' },
];

export default function Growth() {
  const posts = getGrowth();
  return (
    <section id="growth" className="section growth">
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>档案 06</b> · 成长记录</span>
          <div className="right-nav">
            {subNav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <a className={s.rightArrow} href="#contact" aria-label="下一页">→</a>
          </div>
        </div>
        <div className={s.growthRule}></div>

        <div className={s.growthGrid}>
          <div className={s.growthLeft}>
            <h2 className={`section-title ${s.growthTitle}`}>公开的成长，<br />一个月记一次</h2>
            <p className={s.growthSub}>给自己一个月进步的交代</p>
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
                <polyline points="50,168 86,154 122,140 158,122 194,100 230,76 266,52 302,28" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" />
                <polyline points="294,30 302,28 300,36" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
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
            {posts.map((p, i) => (
              <article key={i} className={s.growthItem}>
                <span className={s.growthMonth}>{p.month}</span>
                <p className={s.growthTakeaway}>{p.takeaway}</p>
                <span className={s.growthArrow}>→</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}