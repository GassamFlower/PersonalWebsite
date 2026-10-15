// Story — 图版 02 · 品牌故事（v6：文字块图版化＝编号发线行 + 竖排区名；线稿墨黑）
import { useUi } from '../i18n/LocaleContext';
import s from './Story.module.css';

export default function Story() {
  const { t } = useUi();
  const paragraphs = [t.story.para1, t.story.para2, t.story.para3, t.story.para4, t.story.para5];
  const subNav = [
    { href: '#hero', label: t.story.linkPosition },
    { href: '#story', label: t.story.linkStory },
    { href: '#principles', label: t.story.linkMethod },
    { href: '#cases', label: t.story.linkWorks },
    { href: '#growth', label: t.story.linkInsight },
    { href: '#contact', label: t.story.linkContact },
  ];

  return (
    <section id="story" className="section">
      <span className="plate-rail">{t.story.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.story.tagNo}</b> · {t.story.tagZh}</span>
          <div className="right-nav">
            {subNav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <span className="page-num">02</span>
          </div>
        </div>
        <div className={s.storyRule}></div>

        <h2 className={s.storyHeadline}>{t.story.headline1}<br />{t.story.headline2}</h2>

        <div className={s.storyGrid}>
          <ol className={s.storyBody}>
            {paragraphs.map((p, i) => (
              <li key={i} className={s.storyRow}>
                <span className={s.storyNo}>{`0${i + 1}`}</span>
                <p className={s.storyPara}>{p}</p>
              </li>
            ))}
          </ol>

          <div className={s.storyArt} aria-hidden="true">
            <svg viewBox="0 0 420 540" className={s.bridgeSvg}>
              <line x1="20" y1="50" x2="400" y2="50" stroke="var(--color-faint)" strokeWidth="0.5" strokeDasharray="3 3" />
              <g stroke="var(--color-faint)" strokeWidth="0.5">
                <line x1="40" y1="46" x2="40" y2="50" />
                <line x1="80" y1="46" x2="80" y2="50" />
                <line x1="120" y1="46" x2="120" y2="50" />
                <line x1="160" y1="46" x2="160" y2="50" />
                <line x1="200" y1="46" x2="200" y2="50" />
                <line x1="240" y1="42" x2="240" y2="50" />
                <line x1="280" y1="46" x2="280" y2="50" />
                <line x1="320" y1="46" x2="320" y2="50" />
                <line x1="360" y1="46" x2="360" y2="50" />
              </g>
              <line x1="20" y1="320" x2="400" y2="320" stroke="var(--color-faint)" strokeWidth="0.5" strokeDasharray="3 3" />
              <g stroke="var(--color-faint)" strokeWidth="0.5">
                <line x1="40" y1="320" x2="40" y2="324" />
                <line x1="80" y1="320" x2="80" y2="324" />
                <line x1="120" y1="320" x2="120" y2="324" />
                <line x1="160" y1="320" x2="160" y2="324" />
                <line x1="200" y1="320" x2="200" y2="324" />
                <line x1="280" y1="320" x2="280" y2="324" />
                <line x1="320" y1="320" x2="320" y2="324" />
                <line x1="360" y1="320" x2="360" y2="324" />
              </g>
              <line x1="20" y1="490" x2="400" y2="490" stroke="var(--color-faint)" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="240" y1="50" x2="240" y2="420" stroke="var(--color-ink)" strokeWidth="1.8" />
              <line x1="232" y1="58" x2="248" y2="58" stroke="var(--color-ink)" strokeWidth="0.8" />
              {/* 左拉索 */}
              <line x1="240" y1="70" x2="60" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="90" x2="80" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="110" x2="100" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="130" x2="120" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="150" x2="140" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="170" x2="160" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="190" x2="180" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="210" x2="200" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="230" x2="220" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="250" x2="236" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              {/* 右拉索 */}
              <line x1="240" y1="70" x2="420" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="90" x2="400" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="110" x2="380" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="130" x2="360" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="150" x2="340" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="170" x2="320" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="190" x2="300" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="210" x2="280" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="230" x2="260" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              <line x1="240" y1="250" x2="244" y2="320" stroke="var(--color-ink)" strokeWidth="0.5" />
              {/* 桥面 */}
              <line x1="20" y1="318" x2="400" y2="318" stroke="var(--color-faint)" strokeWidth="0.6" />
              <line x1="20" y1="322" x2="400" y2="322" stroke="var(--color-ink)" strokeWidth="1.4" />
              <line x1="20" y1="330" x2="400" y2="330" stroke="var(--color-faint)" strokeWidth="0.5" />
              <g stroke="var(--color-faint)" strokeWidth="0.5">
                <line x1="60" y1="322" x2="60" y2="330" />
                <line x1="100" y1="322" x2="100" y2="330" />
                <line x1="140" y1="322" x2="140" y2="330" />
                <line x1="180" y1="322" x2="180" y2="330" />
                <line x1="220" y1="322" x2="220" y2="330" />
                <line x1="260" y1="322" x2="260" y2="330" />
                <line x1="300" y1="322" x2="300" y2="330" />
                <line x1="340" y1="322" x2="340" y2="330" />
                <line x1="380" y1="322" x2="380" y2="330" />
              </g>
              {/* V 形桥墩 */}
              <line x1="240" y1="320" x2="200" y2="420" stroke="var(--color-ink)" strokeWidth="1.4" />
              <line x1="240" y1="320" x2="280" y2="420" stroke="var(--color-ink)" strokeWidth="1.4" />
              <line x1="200" y1="420" x2="280" y2="420" stroke="var(--color-ink)" strokeWidth="1.4" />
              <line x1="200" y1="420" x2="200" y2="450" stroke="var(--color-ink)" strokeWidth="1.4" />
              <line x1="280" y1="420" x2="280" y2="450" stroke="var(--color-ink)" strokeWidth="1.4" />
              {/* 承台 */}
              <line x1="170" y1="450" x2="310" y2="450" stroke="var(--color-ink)" strokeWidth="1.2" />
              <line x1="180" y1="450" x2="180" y2="490" stroke="var(--color-faint)" strokeWidth="0.6" />
              <line x1="240" y1="450" x2="240" y2="490" stroke="var(--color-faint)" strokeWidth="0.6" />
              <line x1="300" y1="450" x2="300" y2="490" stroke="var(--color-faint)" strokeWidth="0.6" />
              {/* 两侧基准短虚线 */}
              <line x1="60" y1="320" x2="60" y2="332" stroke="var(--color-faint)" strokeWidth="0.5" />
              <line x1="400" y1="320" x2="400" y2="332" stroke="var(--color-faint)" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        <div className={`rail ${s.storyFoot}`}>
          <span>PLATE 02 / 08</span>
          <span className={s.footSep} aria-hidden="true">|</span>
          <span>CAT.2026-10</span>
          <span className={s.footSep} aria-hidden="true">|</span>
          <span>REV v6</span>
          <span className={s.footSep} aria-hidden="true">|</span>
          <span>{t.story.footSigned}</span>
        </div>
      </div>
    </section>
  );
}