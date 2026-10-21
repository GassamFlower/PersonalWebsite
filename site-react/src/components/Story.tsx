// Story — 图版 02 · 一个人的故事（v7.3：曾经=三段编年〔爬虫→保险运维→法院八年〕，正在=三段〔现状+从零搭建+深化段4〕；
// now 真源 doing 不再渲染（now.md/守卫保留）；五级体系句撤出本区，由 Principles 07 流水图承载；行式去编号，层级靠标签行+竖线+发线）
// v9 降噪（docs/视觉方向-v9-降噪.md D2）：内嵌 right-nav 与区尾 meta 群（PLATE/CAT/REV/BY）整组删除，
// 导航职责归顶导，图版号职责归眉栏与 plate-rail。
import { useUi } from '../i18n/LocaleContext';
import { MkUnderline } from './annotations/Annotations';
import s from './Story.module.css';

export default function Story() {
  const { t } = useUi();
  const past = [t.story.past1, t.story.past2, t.story.past3];
  const present = [t.story.present1, t.story.present2, t.story.present3];

  return (
    <section id="story" className="section">
      <span className="plate-rail">{t.story.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.story.tagNo}</b> · {t.story.tagZh}</span>
        </div>
        <div className="rule"></div>

        {/* v8 手层②：headline2 单行拼接防空白节点；「有据可查」套手绘波浪底线 */}
        <h2 className={s.storyHeadline}>{t.story.headline1}<br />{t.story.headline2Pre}<MkUnderline>{t.story.headline2Mark}</MkUnderline>{t.story.headline2Post}</h2>

        <div className={s.storyGrid}>
          <div className={s.storyBodyCol}>
            <div className={s.storyLabelRow}>
              <span className={s.storyLabel}>{t.story.labelPast}</span>
            </div>
            <ul className={s.storyBody}>
              {past.map((p, i) => (
                <li key={i} className={s.storyRow}>
                  <p className={s.storyPara}>{p}</p>
                </li>
              ))}
            </ul>

            <div className={s.storyLabelRow}>
              <span className={s.storyLabel}>{t.story.labelNow}</span>
            </div>
            <ul className={s.storyBody}>
              {present.map((p, i) => (
                <li key={i} className={s.storyRow}>
                  <p className={s.storyPara}>{p}</p>
                </li>
              ))}
            </ul>
          </div>

          <figure className={s.storyArt}>
            <img
              className={s.storyArtImg}
              src={`${import.meta.env.BASE_URL}story.webp`}
              width={1024}
              height={1536}
              alt={t.story.artAlt}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}