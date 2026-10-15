// Writing — 图版 04 · 写作（v7 §13.5 / docs/j）：读 src/content/writing/ 真源；
// 真源为空时渲染诚实空态，绝不为填充区块编造文章。
import { getWriting } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick } from '../i18n/enums';
import s from './Writing.module.css';

export default function Writing() {
  const { t, locale } = useUi();
  const pieces = getWriting();
  return (
    <section id="writing" className="section">
      <span className="plate-rail">{t.writing.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.writing.tagNo}</b> · {t.writing.tagZh}</span>
          <span className="meta">04</span>
        </div>

        <h2 className="section-title">{t.writing.headline1}<br />{t.writing.headline2}</h2>

        {pieces.length === 0 ? (
          <p className={s.empty}>{t.writing.empty}</p>
        ) : (
          <ol className={s.list}>
            {pieces.map((p, i) => (
              <li key={i} className={s.item}>
                <span className={s.date}>{p.date}</span>
                <h3 className={s.title}>{pick(locale, p.title, p.titleEn)}</h3>
                <p className={s.summary}>{pick(locale, p.summary, p.summaryEn)}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
