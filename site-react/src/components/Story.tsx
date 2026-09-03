// Story — 档案 02 · 品牌故事（React 版 · 保真 Astro Story，桥 SVG 平移）
import s from './Story.module.css';

const paragraphs = [
  '八年政务系统维护，让我懂业务、懂数据、也看见系统背后的真实需求与约束。',
  '进入一家工业类企业，我看见长期被忽视的数字化空白——流程割裂、数据孤岛、体验落后。',
  '我从零搭起工业运维平台 OPS 与统一用户中心 UUC，让数据流动，让一线可用，让管理可视。',
  '靠强烈的好奇心与持续学习的劲头，我把系统做深、做实用；已经能上手 AI 落地（RAG、知识库、智能体），仍在往更深之处精进。',
  '我自建「五级项目体系 + 单一信源 SSOT」的做事规矩，以结构化的方法，把复杂的事做成可持续的系统。',
];

const subNav = [
  { href: '#hero', label: '定位' },
  { href: '#story', label: '品牌故事' },
  { href: '#principles', label: '方法与体系' },
  { href: '#cases', label: '项目精选' },
  { href: '#growth', label: '洞见' },
  { href: '#contact', label: '联系' },
];

export default function Story() {
  return (
    <section id="story" className="section story">
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>档案 02</b> · 品牌故事</span>
          <div className="right-nav">
            {subNav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <span className="page-num">02</span>
          </div>
        </div>
        <div className={s.storyRule}></div>

        <h2 className={s.storyHeadline}>在真实系统里，<br />把空白做成能用的东西</h2>

        <div className={s.storyGrid}>
          <div className={s.storyBody}>
            {paragraphs.map((p, i) => (
              <p key={i} className={s.storyPara}>{p}</p>
            ))}
          </div>

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

        <div className={s.storyFoot}>
          <span>FILE 02 / 06</span>
          <span className={s.footSep}>|</span>
          <span>DATE 2025-08-19</span>
          <span className={s.footSep}>|</span>
          <span>BY YIYI</span>
        </div>
      </div>
    </section>
  );
}