// Writing — 图版 05 · 写作（docs/j 管线 + docs/k §1.1 承载）
// 真源为空时渲染诚实空态，绝不为填充区块编造文章。
// v8.5（docs/j §4 · 宪法 §1.2）：由页内 <details> 展开改为卡片列表 + 每篇一个静态子页。
// 整卡是一个原生 <a>：键盘可达、无 JS 也点得进子页；卡内只放 date/title/summary 三个真源字段，不加配图不加标签。
// v8.6（docs/k §11）：列表改多列卡片网格（暖白纸面 + 顶部发线，无圆角无阴影），卡底 mono READ 行只走交互态入朱。
import { getWriting, getWritingPlan } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick } from '../i18n/enums';
import { postPath } from '../lib/routes';
import { MkCircle } from './annotations/Annotations';
import s from './Writing.module.css';

export default function Writing() {
  const { t, locale } = useUi();
  const pieces = getWriting();
  const plan = getWritingPlan();
  return (
    <section id="writing" className="section">
      <span className="plate-rail">{t.writing.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.writing.tagNo}</b> · {t.writing.tagZh}</span>
        </div>
        <div className="rule"></div>

        <h2 className="section-title">{t.writing.headline1}<br />{t.writing.headline2}</h2>

        {/* v8 手层③：诚实空态套圈注——「在写」这件事本身是唯一可标的内容 */}
        {pieces.length === 0 ? (
          <p className={s.empty}><MkCircle>{t.writing.empty}</MkCircle></p>
        ) : (
          <ol className={s.list}>
            {pieces.map((p, i) => {
              const title = pick(locale, p.title, p.titleEn);
              return (
                <li key={p.slug} className={s.item}>
                  <a className={s.card} href={postPath(p.slug, locale)}>
                    <span className={s.date}>{p.date}</span>
                    {/* v8 手层：最新一篇标题套虚线圈注（全站 ≤8 处，与下方空态圈注互斥分支） */}
                    <h3 className={s.title}>{i === 0 ? <MkCircle>{title}</MkCircle> : title}</h3>
                    <p className={s.summary} data-font="sans">{pick(locale, p.summary, p.summaryEn)}</p>
                    <span className={s.read}>{t.writing.read} {'→'}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        )}

        {/* 空态实质内容（docs/j §4）：真源 src/content/writing-plan.md。
            全块 data-font="sans" 走系统 sans，不进衬线子集——加选题不撑破字体产物。 */}
        {pieces.length === 0 && plan && (
          <div className={s.queue} data-font="sans">
            <p className={s.why}>{pick(locale, plan.why, plan.whyEn)}</p>
            <p className={s.planLabel}>{pick(locale, plan.planLabel, plan.planLabelEn)}</p>
            <ul className={s.topics}>
              {plan.topics.map((x, i) => (
                <li key={i} className={s.topic}>
                  {pick(locale, x, plan.topicsEn?.[i] ?? x)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
