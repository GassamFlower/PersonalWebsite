// Now — 插页 · 当下（docs/i §5.3：体裁复用 v6 细线+编号+mono 眉栏，不新增装置；长文本 ≤75 字符行宽）
import { getNow } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import s from './Now.module.css';

export default function Now() {
  const { t, locale } = useUi();
  const now = getNow();
  const pick = (item: { text: string; textEn?: string }) =>
    locale === 'en' && item.textEn ? item.textEn : item.text;

  const rows = [
    { label: t.now.labelDoing, items: now.doing },
    { label: t.now.labelLearning, items: now.learning },
  ]
    .map((r) => ({ label: r.label, items: r.items.map(pick).filter((x) => x.length > 0) }))
    .filter((r) => r.items.length > 0);

  const noteText = locale === 'en' && now.noteEn ? now.noteEn : now.note;

  return (
    <section id="now" className={`section ${s.now}`}>
      <span className="plate-rail">{t.now.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.now.tagNo}</b> · {t.now.tagZh}</span>
          <span className="meta">{t.now.updatedLabel} {now.updated}</span>
        </div>
        <div className={s.nowRule}></div>

        <h2 className={s.nowTitle}>{t.now.headline}</h2>

        <dl className={s.nowList}>
          {rows.map((r) => (
            <div key={r.label} className={s.nowRow}>
              <dt className={s.nowLabel}>{r.label}</dt>
              <dd className={s.nowItems}>
                {r.items.map((x, i) => (
                  <p key={i} className={s.nowItem}>
                    <span className={s.nowBullet} aria-hidden="true">{`0${i + 1}`}</span>
                    {x}
                  </p>
                ))}
              </dd>
            </div>
          ))}
          {noteText && (
            <div className={s.nowRow}>
              <dt className={s.nowLabel}>{t.now.labelNote}</dt>
              <dd className={s.nowItems}><p className={s.nowItem}>{noteText}</p></dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
