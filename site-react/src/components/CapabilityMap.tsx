// CapabilityMap — 档案 05 · 技能树（React 版 · 诚实三档徽章 · md 驱动 getSkills）
import { getSkills } from '../lib/content';
import s from './CapabilityMap.module.css';

const levelTone: Record<string, string> = { '已交付': 'done', '会用': 'use', '在学': 'learning' };
const levelLabel: Record<string, string> = { '已交付': '已交付', '会用': '会用', '在学': '在学' };

export default function CapabilityMap() {
  const skills = getSkills();
  return (
    <section id="capability" className="section capability">
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>档案 05</b> · 技能树</span>
          <span className="meta">05</span>
        </div>
        <div className={s.capRule}></div>

        <h2 className={s.capMega}>技能档案：<br />会什么，到什么程度</h2>

        <p className={s.capIntro}>
          按技术栈分领域，标出熟练程度与真实证据——不报菜名，边界诚实。
        </p>

        <div className={s.tree}>
          {skills.map((s2, i) => (
            <article key={i} className={s.branch}>
              <span className={s.branchNo}>{String(i + 1).padStart(2, '0')}</span>
              <div className={s.branchHead}>
                <h3 className={s.branchDomain}>{s2.domain}</h3>
                <span className={`${s.badge} ${s[`badge_${levelTone[s2.level]}`]}`}>{levelLabel[s2.level]}</span>
              </div>

              <p className={s.branchTagline}>{s2.tagline}</p>

              <ul className={s.branchSkills}>
                {s2.skills.map((k, j) => (
                  <li key={j} className={s.branchSkill}>
                    <span className={s.skillName}>{k.name}</span>
                    {k.note ? <span className={s.skillNote}>{k.note}</span> : null}
                  </li>
                ))}
              </ul>

              {s2.evidence ? (
                <p className={s.branchEvidence}><b>证据</b>&nbsp;&nbsp;{s2.evidence}</p>
              ) : null}
            </article>
          ))}
        </div>

        <div className={s.capFoot}>
          <span>LEVEL 分级诚实标注</span>
          <span className={s.footSep}>|</span>
          <span>ARCHIVE 0005</span>
          <span className={s.footSep}>|</span>
          <span>PERSONAL DOSSIER</span>
        </div>
      </div>
    </section>
  );
}