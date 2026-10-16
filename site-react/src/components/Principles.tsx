// Principles — 档案 07 · 做事的规矩（React 版 · 保真 Astro Principles）
import { useUi } from '../i18n/LocaleContext';
import s from './Principles.module.css';

export default function Principles() {
  const { t } = useUi();
  const gates = [
    { no: '01', title: t.principles.gate1Title, desc: t.principles.gate1Desc },
    { no: '02', title: t.principles.gate2Title, desc: t.principles.gate2Desc },
    { no: '03', title: t.principles.gate3Title, desc: t.principles.gate3Desc },
    { no: '04', title: t.principles.gate4Title, desc: t.principles.gate4Desc },
  ];
  // v7.2：用户自报「五级项目体系」目录流水图（Inbox→Archive），ASCII 稿转图版体裁
  const tiers = [
    { dir: 'Inbox/', name: t.principles.tier1Name, role: t.principles.tier1Role, act: t.principles.tier1Act },
    { dir: 'Incubating/', name: t.principles.tier2Name, role: t.principles.tier2Role, act: t.principles.tier2Act },
    { dir: 'Active/', name: t.principles.tier3Name, role: t.principles.tier3Role, act: t.principles.tier3Act },
    { dir: 'Assets/', name: t.principles.tier4Name, role: t.principles.tier4Role, act: t.principles.tier4Act },
    { dir: 'Archive/', name: t.principles.tier5Name, role: t.principles.tier5Role, act: t.principles.tier5Act },
  ];

  return (
    <section id="principles" className="section">
      <span className="plate-rail">{t.principles.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.principles.tagNo}</b> · {t.principles.tagZh}</span>
          <span className="meta">08</span>
        </div>
        <div className={s.prRule}></div>

        <h2 className={s.prMega}>{t.principles.headline1}<br />{t.principles.headline2} <span className={s.ai}>AI</span> {t.principles.headline3}</h2>

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
                <circle cx="12" cy="12" r="11" fill="var(--color-base)" stroke="var(--color-ink)" strokeWidth="1.4" />
                <polyline points="6,12 10.5,16.5 18,8" fill="none" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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

        <div className={s.tiers}>
          <p className={s.tierLead}>{t.principles.tierLead}</p>
          <ol className={s.tierFlow}>
            {tiers.map((x) => (
              <li key={x.dir} className={s.tier}>
                <span className={s.tierDir}>{x.dir}</span>
                <h3 className={s.tierName}>{x.name}</h3>
                <p className={s.tierRole}>{x.role}</p>
                <p className={s.tierAct}><span aria-hidden="true">→</span> {x.act}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={s.prFoot}>
          <p className={s.prNote}>{t.principles.note}</p>
          <div className={s.stampArt} aria-hidden="true">
            <svg viewBox="0 0 200 220" className={s.stampSvg}>
              <line x1="100" y1="10" x2="100" y2="210" stroke="var(--color-faint)" strokeWidth="0.5" strokeDasharray="6 1 1 1" />
              <rect x="80" y="14" width="40" height="22" rx="4" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
              <line x1="80" y1="22" x2="120" y2="22" stroke="var(--color-ink)" strokeWidth="0.8" />
              <rect x="86" y="36" width="28" height="6" fill="none" stroke="var(--color-ink)" strokeWidth="1" />
              <polygon points="76,46 124,46 130,180 70,180" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
              <rect x="74" y="178" width="52" height="14" rx="1" fill="none" stroke="var(--color-ink)" strokeWidth="1.4" />
              <text x="100" y="120" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="14" fill="var(--color-ink)" fontWeight="700" letterSpacing="0.2em">{t.principles.stampArchive}</text>
              <text x="100" y="142" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="14" fill="var(--color-ink)" fontWeight="700" letterSpacing="0.2em">{t.principles.stampApproved}</text>
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