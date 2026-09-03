// Principles — 档案 07 · 做事的规矩（React 版 · 保真 Astro Principles）
import s from './Principles.module.css';

const gates = [
  { no: '01', title: '一 · 立项门', desc: '先把话说清楚，\n再动手' },
  { no: '02', title: '二 · 架构门', desc: '参考图为准绳，\n不凭感觉' },
  { no: '03', title: '三 · 业务门', desc: '素材有清单，\n证据才能过' },
  { no: '04', title: '四 · 上线门', desc: '可访问、可追溯、\n可复盘' },
];

export default function Principles() {
  return (
    <section id="principles" className="section principles">
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>档案 07</b> · 做事的规矩</span>
          <span className="meta">07</span>
        </div>
        <div className={s.prRule}></div>

        <h2 className={s.prMega}>先立规矩，<br />再让 <span className={s.ai}>AI</span> 干活</h2>

        <div className={s.flow}>
          <div className={s.stages}>
            {gates.map((g) => (
              <div className={s.stage} key={g.no}>
                <span className={s.stageNo}>{g.no}</span>
                <h3 className={s.stageTitle}>{g.title}</h3>
              </div>
            ))}
          </div>

          <div className={s.flowLine} aria-hidden="true">
            <span className={s.grayRail}></span>
            <span className={s.node}></span>
            <span className={s.node}></span>
            <span className={s.node}></span>
            <span className={s.node}></span>
            <span className={s.finish} aria-hidden="true">
              <svg viewBox="0 0 24 24" className={s.finishSvg}>
                <circle cx="12" cy="12" r="11" fill="var(--color-base)" stroke="var(--color-accent)" strokeWidth="1.4" />
                <polyline points="6,12 10.5,16.5 18,8" fill="none" stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <div className={s.descs}>
            {gates.map((g) => (
              <div className={s.desc} key={g.no}>
                {g.desc.split('\n').map((line, i) => (
                  <p key={i} className={s.line}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={s.prFoot}>
          <p className={s.prNote}>知识库与工作台分离，文档前缀排序，单一信源 SSOT。</p>
          <div className={s.stampArt} aria-hidden="true">
            <svg viewBox="0 0 200 220" className={s.stampSvg}>
              <line x1="100" y1="10" x2="100" y2="210" stroke="var(--color-faint)" strokeWidth="0.5" strokeDasharray="6 1 1 1" />
              <rect x="80" y="14" width="40" height="22" rx="4" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
              <line x1="80" y1="22" x2="120" y2="22" stroke="var(--color-ink)" strokeWidth="0.8" />
              <rect x="86" y="36" width="28" height="6" fill="none" stroke="var(--color-ink)" strokeWidth="1" />
              <polygon points="76,46 124,46 130,180 70,180" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
              <rect x="74" y="178" width="52" height="14" rx="1" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
              <text x="100" y="120" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="14" fill="var(--color-ink)" fontWeight="700" letterSpacing="0.2em">档案</text>
              <text x="100" y="142" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="14" fill="var(--color-ink)" fontWeight="700" letterSpacing="0.2em">通过</text>
              <line x1="86" y1="155" x2="114" y2="155" stroke="var(--color-line)" strokeWidth="0.7" />
              <text x="100" y="170" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="var(--color-line)" letterSpacing="0.15em">APPROVED</text>
              <line x1="30" y1="206" x2="170" y2="206" stroke="var(--color-faint)" strokeWidth="0.5" strokeDasharray="3 3" />
              <text x="100" y="218" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="var(--color-line)" letterSpacing="0.1em">NO.005</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}