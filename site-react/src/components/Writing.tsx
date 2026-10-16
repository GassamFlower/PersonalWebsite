// Writing — 图版 05 · 写作（docs/j 管线 + docs/k §1.1 承载）
// 真源为空时渲染诚实空态，绝不为填充区块编造文章。
// 展开用原生 <details>/<summary>：正文在初始 HTML 里，无 JS 也读得到全文（宪法 §17），
// 不引第三方折叠库，也不做独立文章页（多页=修宪，触发线见 docs/k §1.1）。
import { getWriting } from '../lib/content';
import { parseBlocks } from '../lib/markdown';
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
          <span className="meta">05</span>
        </div>

        <h2 className="section-title">{t.writing.headline1}<br />{t.writing.headline2}</h2>

        {pieces.length === 0 ? (
          <p className={s.empty}>{t.writing.empty}</p>
        ) : (
          <ol className={s.list}>
            {pieces.map((p, i) => {
              // 英文页只读 bodyEn；两者由守卫保证同时存在，这里仍显式选一侧，避免英文页混排中文正文
              const src = locale === 'en' ? p.bodyEn ?? '' : p.body;
              return (
                <li key={i} className={s.item}>
                  <details className={s.doc} id={`writing-${i + 1}`}>
                    <summary className={s.head}>
                      <span className={s.date}>{p.date}</span>
                      <h3 className={s.title}>{pick(locale, p.title, p.titleEn)}</h3>
                      <span className={s.chev} aria-hidden="true">
                        <span className={s.onlyClosed}>{t.writing.expand}</span>
                        <span className={s.onlyOpen}>{t.writing.collapse}</span>
                      </span>
                    </summary>
                    <p className={s.summary}>{pick(locale, p.summary, p.summaryEn)}</p>
                    <div className={s.body}>
                      {parseBlocks(src).map((b, j) =>
                        b.kind === 'h' ? <h4 key={j} className={s.h}>{b.text}</h4>
                          : b.kind === 'p' ? <p key={j}>{b.text}</p>
                            : <ul key={j}>{b.items.map((x, k) => <li key={k}>{x}</li>)}</ul>
                      )}
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
