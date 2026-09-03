// Cases — 档案 04 · 项目案例（React 版 · 深墨面板 + 截图槽/示意线稿）
import { getCases } from '../lib/content';
import s from './Cases.module.css';

const statusLabel: Record<string, string> = { 已上线: '已上线 · 第 1 位', 内部系统: '内部系统', 开发中: '开发中' };
const ratios = ['portrait', 'landscape', 'landscape', 'landscape'];

function Schematic({ i }: { i: number }) {
  return (
    <svg className={s.slotSchematic} viewBox="0 0 360 240" aria-hidden="true">
      <rect x="18" y="16" width="324" height="22" rx="3" fill="none" stroke="var(--color-faint)" strokeWidth="1" />
      <line x1="30" y1="27" x2="140" y2="27" stroke="var(--color-line)" strokeWidth="1.4" />
      <circle cx="322" cy="27" r="3" fill="var(--color-accent)" opacity="0.7" />
      {i === 0 ? (
        <g>
          <rect x="30" y="56" width="90" height="34" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
          <line x1="42" y1="73" x2="108" y2="73" stroke="var(--color-line)" strokeWidth="0.8" />
          <rect x="30" y="150" width="90" height="34" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
          <line x1="42" y1="167" x2="108" y2="167" stroke="var(--color-line)" strokeWidth="0.8" />
          <line x1="75" y1="90" x2="75" y2="150" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4 3" />
          <rect x="236" y="56" width="104" height="122" rx="4" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" />
          <line x1="248" y1="72" x2="320" y2="72" stroke="var(--color-faint)" strokeWidth="0.8" />
          <line x1="248" y1="140" x2="320" y2="140" stroke="var(--color-faint)" strokeWidth="0.8" />
          <circle cx="248" cy="115" r="3" fill="var(--color-accent)" opacity="0.8" />
        </g>
      ) : i === 1 ? (
        <g>
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
            <rect key={`${r}-${c}`} x={26 + c * 112} y={54 + r * 58} width="92" height="44" fill="none"
              stroke={r === 0 && c === 0 ? 'var(--color-accent)' : 'var(--color-faint)'} strokeWidth="1" />
          )))}
          <text x="26" y="40" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-line)">资产 · 监控 · 巡检 · 工单</text>
        </g>
      ) : i === 2 ? (
        <g>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={26 + k * 64} y="56" width="48" height="26" rx="2" fill="none" stroke="var(--color-faint)" strokeWidth="1" />
          ))}
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1={44 + k * 90} y1={136} x2={150} y2={196} stroke="var(--color-line)" strokeWidth="0.8" />
          ))}
          <circle cx="150" cy="196" r="22" fill="none" stroke="var(--color-accent)" strokeWidth="1.4" />
          <text x="150" y="201" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="13" fill="var(--color-ink)">统一入口</text>
        </g>
      ) : (
        <g>
          <rect x="26" y="70" width="70" height="44" rx="3" fill="none" stroke="var(--color-faint)" strokeWidth="1.2" />
          <line x1="36" y1="92" x2="86" y2="92" stroke="var(--color-line)" strokeWidth="0.8" />
          <rect x="250" y="70" width="84" height="44" rx="3" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
          <line x1="260" y1="92" x2="324" y2="92" stroke="var(--color-line)" strokeWidth="0.8" />
          <line x1="96" y1="92" x2="250" y2="92" stroke="var(--color-accent)" strokeWidth="1.2" />
          <polygon points="246,86 258,92 246,98" fill="var(--color-accent)" />
          <rect x="150" y="120" width="110" height="26" rx="2" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <line x1="164" y1="132" x2="250" y2="132" stroke="var(--color-faint)" strokeWidth="0.8" />
        </g>
      )}
    </svg>
  );
}

export default function Cases() {
  const cases = getCases();
  return (
    <section id="cases" className={`section ${s.cases}`}>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>档案 04</b> · 项目案例（卷宗）</span>
          <span className="meta">04</span>
        </div>
        <h2 className={`section-title ${s.casesTitle}`}>做的项目，能看能查</h2>

        <div className={s.caseList}>
          {cases.map((c, i) => (
            <article key={i} className={s.caseCard}>
              <div className={s.caseInfo}>
                <div className={s.caseHead}>
                  <span className={s.caseNo}>0{i + 1}</span>
                  <div>
                    <h3 className={s.caseTitle}>{c.title}</h3>
                    <span className={s.badge}>{statusLabel[c.status]}</span>
                  </div>
                </div>
                <p className={s.caseLine}><b>问题</b>&nbsp;&nbsp;{c.problem}</p>
                <p className={s.caseLine}><b>解决</b>&nbsp;&nbsp;{c.whatIDid}</p>
                {c.challenge && <p className={s.caseLine}><b>关键</b>&nbsp;&nbsp;{c.challenge}</p>}
                {c.outcome && <p className={`${s.caseLine} ${s.caseOutcome}`}><b>结果</b>&nbsp;&nbsp;{c.outcome}</p>}
                <p className={s.caseStack}>{c.stack.join('　/　')}</p>
                <p className={s.caseStatus}>
                  <span className={s.statusDot}></span>{c.status}
                </p>
              </div>

              <div className={s.caseVisual}>
                {c.image ? (
                  <figure className={`${s.shot} ${s.shotReal} ${s[`shot_${ratios[i]}`]}`}>
                    <img className={s.frameImg} src={c.image} alt={c.imageAlt || `${c.title}截图`} loading="lazy" />
                  </figure>
                ) : (
                  <div className={`${s.shot} ${s.shotSlot} ${s[`shot_${ratios[i]}`]}`}>
                    <span className={s.slotType}>
                      {i === 0 ? '示意 · 手机端流程' : '示意 · 界面功能线稿'}
                    </span>
                    <Schematic i={i} />
                    <span className={s.slotHint}>示意线稿 · 非真实截图</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}