// CapabilityMap — 图版 05 · 技能档案（v6：规格表体裁 + 诚实三档墨色徽章，不用朱砂）
import { getSkills } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import s from './CapabilityMap.module.css';

const levelTone: Record<string, string> = { '已交付': 'done', '会用': 'use', '在学': 'learning' };

export default function CapabilityMap() {
  const { t } = useUi();
  const skills = getSkills();
  return (
    <section id="capability" className="section">
      <span className="plate-rail">{t.capability.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.capability.tagNo}</b> · {t.capability.tagZh}</span>
          <span className="meta">05</span>
        </div>
        <div className={s.capRule}></div>

        <h2 className={s.capMega}>{t.capability.headline1}<br />{t.capability.headline2}</h2>

        <p className={s.capIntro}>
          {t.capability.intro}
        </p>

        <div className={s.tree}>
          {skills.map((s2, i) => (
            <article key={i} className={s.branch}>
              <span className={s.branchNo}>{String(i + 1).padStart(2, '0')}</span>
              <div className={s.branchMain}>
                <div className={s.branchHead}>
                  <h3 className={s.branchDomain}>{s2.domain}</h3>
                  <span className={`${s.badge} ${s[`badge_${levelTone[s2.level]}`]}`}>{s2.level}</span>
                </div>

                <p className={s.branchTagline}>{s2.tagline}</p>

                {/* 规格表体裁（v6 §3.3）：能力名 │ 实证说明 │ 发线，缺说明则该行只有名 */}
                <dl className={s.spec}>
                  {s2.skills.map((k, j) => (
                    <div key={j} className={`${s.specRow} ${k.note ? '' : s.specBare}`}>
                      <dt>{k.name}</dt>
                      {k.note && <dd>{k.note}</dd>}
                    </div>
                  ))}
                  {s2.evidence && (
                    <div className={`${s.specRow} ${s.specEvidence}`}>
                      <dt>{t.capability.labelEvidence}</dt>
                      <dd>{s2.evidence}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className={`rail ${s.capFoot}`}>
          <span>{t.capability.footLevel}</span>
          <span className={s.footSep} aria-hidden="true">|</span>
          <span>PLATE 05 / 08</span>
          <span className={s.footSep} aria-hidden="true">|</span>
          <span>CAT.2026-10 · REV v6</span>
        </div>
      </div>
    </section>
  );
}
