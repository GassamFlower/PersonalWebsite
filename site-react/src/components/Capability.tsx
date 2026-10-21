// Capability — 图版 04 · 能力档位（docs/k §1.2 改版）
// 用户裁决「没必要分类这么多域，改为整体，描述更多细节」→ 逐域台账撤下，改渲染 `capability.md` 的四小段自述。
// 段落走系统 sans（打 `data-font="sans"` 标记，沿用 v8.0-b 取字口径：长文不倍增衬线子集字节）。
// 档位计数仍从 skills 真源算出，不手写；**不复活雷达图/技术栈 rail/星级**，真源没有「在学」页面就不写「在学」。
import { getCapability, getSkills } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick } from '../i18n/enums';
import s from './Capability.module.css';

export default function Capability() {
  const { t, locale } = useUi();
  const items = getSkills();
  const { intro, introEn } = getCapability();
  const delivered = items.filter((i) => i.level === '已交付').length;

  return (
    <section id="capability" className="section">
      <span className="plate-rail">{t.capability.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.capability.tagNo}</b> · {t.capability.tagZh}</span>
        </div>
        <div className="rule"></div>

        <h2 className="section-title">{t.capability.headline1}<br />{t.capability.headline2}</h2>
        <p className={s.sub}>{t.capability.sub}</p>

        <div className={s.intro}>
          {intro.map((p, i) => (
            <p key={i} data-font="sans">{pick(locale, p, introEn?.[i] ?? p)}</p>
          ))}
        </div>

        {/* 档位计数直接来自真源，不手写数字（改 md 不用改这里） */}
        <div className={`rail ${s.foot}`}>
          CAPABILITY / {delivered} DELIVERED · {items.length - delivered} WORKING KNOWLEDGE
        </div>
      </div>
    </section>
  );
}
