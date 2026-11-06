// Gates — 图版 02 · 四道门（品牌策划 1.2/1.3）
// 门名、问法、判据全部走真源 src/content/gates.md；组件不写死任何一条。
// 账本没有真实记录时只渲染空表与投递入口，不写拦截数量——数字必须来自真实过门记录。
import { getGates } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick, pickList } from '../i18n/enums';
import { email } from '../lib/site';
import s from './Gates.module.css';

export default function Gates() {
  const { t, locale } = useUi();
  const data = getGates();
  if (!data) return null;

  const gates = pickList(locale, data.gates, data.gatesEn);
  const questions = pickList(locale, data.gateQuestions, data.gateQuestionsEn);
  const criteria = pickList(locale, data.gateCriteria, data.gateCriteriaEn);
  const mailto = `mailto:${email}?subject=${encodeURIComponent(t.gates.mailSubject)}`;
  const blankCells = Array.from({ length: gates.length + 2 }, () => t.gates.emptyValue);
  const blockedBlankCells = Array.from({ length: 3 }, () => t.gates.emptyValue);

  return (
    <section id="gates" className="section">
      <span className="plate-rail">{t.gates.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.gates.tagNo}</b> · {t.gates.tagZh}</span>
        </div>
        <div className="rule"></div>

        <h2 className="section-title">{t.gates.headline1}<br />{t.gates.headline2}</h2>
        <p className={s.intro} data-font="sans">{pick(locale, data.intro, data.introEn)}</p>

        <ol className={s.grid}>
          {gates.map((name, i) => (
            <li key={name} className={s.card}>
              <span className={s.no}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={s.name}>{name}</h3>
              <dl className={s.pair} data-font="sans">
                <dt>{t.gates.questionLabel}</dt>
                <dd>{questions[i]}</dd>
                <dt>{t.gates.criterionLabel}</dt>
                <dd>{criteria[i]}</dd>
              </dl>
            </li>
          ))}
        </ol>

        <div className={s.ledger} data-font="sans">
          <div className={s.ledgerHead}>
            <span className="rail">{t.gates.ledgerLabel}</span>
            <span className={s.legend}>{t.gates.passLabel} / {t.gates.failLabel}</span>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">{t.gates.colItem}</th>
                  {gates.map((name) => <th key={name} scope="col">{name}</th>)}
                  <th scope="col">{t.gates.colVerdict}</th>
                </tr>
              </thead>
              <tbody>
                <tr className={s.blankRow}>
                  {blankCells.map((v, i) => (
                    <td key={i}><span aria-hidden="true">{v}</span></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* 第二张表：拦下的不删。理由分类来自真源，页面只给空态——不写任何拦截数量 */}
          <div className={s.subHead}>
            <span className={s.subLabel}>{t.gates.blockedLabel}</span>
            <span className={s.legend}>
              {t.gates.reasonsLabel} · {pickList(locale, data.blockedReasons, data.blockedReasonsEn).join(' / ')}
            </span>
          </div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">{t.gates.colItem}</th>
                  <th scope="col">{t.gates.colReason}</th>
                  <th scope="col">{t.gates.colRetest}</th>
                </tr>
              </thead>
              <tbody>
                <tr className={s.blankRow}>
                  {blockedBlankCells.map((v, i) => (
                    <td key={i}><span aria-hidden="true">{v}</span></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className={s.note}>{pick(locale, data.ledgerNote, data.ledgerNoteEn)}</p>
        </div>

        <div className={s.intake}>
          <div>
            <h3 className={s.intakeTitle}>{t.gates.intakeTitle}</h3>
            <p className={s.intakeBody} data-font="sans">{t.gates.intakeBody}</p>
          </div>
          <a className={s.intakeCta} href={mailto} data-font="sans">{t.gates.intakeCta}</a>
        </div>
      </div>
    </section>
  );
}
