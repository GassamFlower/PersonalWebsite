// Capability — 图版 04 · 能力档位（docs/k §1.2）
// 读 src/content/skills/ 真源（v7 下线能力图谱后它一直是孤儿数据，此处回接渲染面）。
// 体裁=台账条，沿用附录 A-0n 的胜出语言；**不复活雷达图/技术栈 rail/星级**。
// 档位只有真源里存在的两档：真源没有「在学」，页面就不写「在学」。
import { getSkills } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick, enumLabel, LEVEL_EN } from '../i18n/enums';
import s from './Capability.module.css';

const LEVEL_CLASS: Record<string, string> = {
  已交付: s.stDone,
  会用: s.stKnow,
};

export default function Capability() {
  const { t, locale } = useUi();
  const items = getSkills();
  const delivered = items.filter((i) => i.level === '已交付').length;

  return (
    <section id="capability" className="section">
      <span className="plate-rail">{t.capability.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.capability.tagNo}</b> · {t.capability.tagZh}</span>
          <span className="meta">04</span>
        </div>

        <h2 className="section-title">{t.capability.headline1}<br />{t.capability.headline2}</h2>
        <p className={s.sub}>{t.capability.sub}</p>

        <div className={`rail ${s.head}`}>
          <span>{t.capability.thDomain}</span>
          <span>{t.capability.thLevel}</span>
          <span>{t.capability.thBound}</span>
        </div>

        <ul className={s.ledger}>
          {items.map((it) => (
            <li key={it.domain} className={s.row}>
              <h3 className={s.domain}>{pick(locale, it.domain, it.domainEn)}</h3>
              <span className={`${s.badge} ${LEVEL_CLASS[it.level] ?? ''}`}>
                {enumLabel(locale, LEVEL_EN, it.level)}
              </span>
              <p className={s.bound}>{pick(locale, it.tagline, it.taglineEn)}</p>
            </li>
          ))}
        </ul>

        {/* 档位计数直接来自真源，不手写数字（改 md 不用改这里） */}
        <div className={`rail ${s.foot}`}>
          CAPABILITY / {delivered} DELIVERED · {items.length - delivered} WORKING KNOWLEDGE
        </div>
      </div>
    </section>
  );
}
