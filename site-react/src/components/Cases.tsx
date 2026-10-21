// Cases — 核心卷（v6：深墨场统一 + 规格表体裁 + 蓝图线稿反白主视觉 + 图版级验收章）
// v7.4 两层化：tier=feature 详案卡；tier=minor 进「还做过这些」简表（题名+一行定位），缺省按 feature 处理
// v8.1 用户裁决：状态词（已上线/开发中/内部系统）不再上页面——真实进度写在正文里，不靠小标签
import { getCases } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick } from '../i18n/enums';
import s from './Cases.module.css';

const ratios = ['portrait', 'landscape', 'landscape', 'landscape'];
// v7.4：线稿按详案卡身份映射（0=车助手流程 1=OPS资产矩阵 3=内网DevOps流水线；原 2=统一入口 随 UUC 进简表退场）
// v8.1 用户裁决：线稿红笔（stroke 走 --color-seal，墨场内由 .shotSlot 重映射为提亮朱砂）——每幅 ≤2 笔
// v8.8 用户裁决（「帮我做样张放进去」）：按真源 order 绑定专属线稿，4=地基拓扑 5=数据口径对账；卡面 0i+1 会变，order 不会
const SCHEM: Record<number, number> = { 1: 0, 2: 1, 5: 4, 11: 5, 19: 3 };
// 真图走 public/，前缀取 BASE_URL：写死 '/PersonalWebsite/' 在自定义域根目录下会全量 404
const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`;

// 线稿内的 text 一律只用拉丁与数字：新增汉字要扩子集字体，且蓝图体裁本就吃技术记号
function Schematic({ i }: { i: number }) {
  const { t } = useUi();
  let body: JSX.Element;
  if (i === 0) {
    body = (
      <g>
        <rect x="30" y="56" width="90" height="34" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
        <line x1="42" y1="73" x2="108" y2="73" stroke="var(--color-line)" strokeWidth="0.8" />
        <rect x="30" y="150" width="90" height="34" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
        <line x1="42" y1="167" x2="108" y2="167" stroke="var(--color-line)" strokeWidth="0.8" />
        <line x1="75" y1="90" x2="75" y2="150" stroke="var(--color-seal)" strokeWidth="1" strokeDasharray="4 3" />
        <rect x="236" y="56" width="104" height="122" rx="4" fill="none" stroke="var(--color-seal)" strokeWidth="1.2" />
        <line x1="248" y1="72" x2="320" y2="72" stroke="var(--color-faint)" strokeWidth="0.8" />
        <line x1="248" y1="140" x2="320" y2="140" stroke="var(--color-faint)" strokeWidth="0.8" />
        <circle cx="248" cy="115" r="3" fill="var(--color-seal)" opacity="0.8" />
      </g>
    );
  } else if (i === 1) {
    body = (
      <g>
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={26 + c * 112} y={54 + r * 58} width="92" height="44" fill="none"
            stroke={r === 0 && c === 0 ? 'var(--color-seal)' : 'var(--color-faint)'} strokeWidth="1" />
        )))}
        <text x="26" y="40" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-line)">{t.cases.artAssets}</text>
      </g>
    );
  } else if (i === 4) {
    body = (
      <g>
        <text x="20" y="58" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-line)">HOST</text>
        <rect x="20" y="64" width="78" height="78" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
        <rect x="30" y="82" width="58" height="42" fill="none" stroke="var(--color-faint)" strokeWidth="1" />
        <text x="36" y="100" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">VM</text>
        <line x1="98" y1="103" x2="136" y2="103" stroke="var(--color-line)" strokeWidth="1.2" />
        <polygon points="132,98 142,103 132,108" fill="var(--color-line)" />
        <rect x="144" y="88" width="56" height="30" rx="3" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
        <text x="150" y="107" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-line)">nginx</text>
        <line x1="200" y1="103" x2="214" y2="103" stroke="var(--color-faint)" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={216 + k * 21} y={92} width="15" height="22" fill="none" stroke="var(--color-faint)" strokeWidth="1" />
        ))}
        <text x="216" y="128" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">6 in use</text>
        <rect x="146" y="146" width="52" height="26" fill="none" stroke="var(--color-faint)" strokeWidth="1" />
        <text x="152" y="162" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">BKP</text>
        <rect x="212" y="146" width="52" height="26" fill="none" stroke="var(--color-faint)" strokeWidth="1" />
        <text x="218" y="162" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">DATA</text>
        <rect x="138" y="138" width="134" height="42" fill="none" stroke="var(--color-seal)" strokeWidth="1" strokeDasharray="5 4" />
        <text x="138" y="194" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-line)">one array</text>
        {[1, 2, 3, 4, 5, 6].map((k) => (
          <line key={k} x1={20 + k * 52} y1="206" x2={20 + k * 52} y2="216" stroke="var(--color-faint)" strokeWidth="1" />
        ))}
        <line x1="20" y1="216" x2="336" y2="216" stroke="var(--color-faint)" strokeWidth="1" />
        <text x="20" y="232" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-line)">runbook gates P1-P6</text>
      </g>
    );
  } else if (i === 5) {
    body = (
      <g>
        <text x="20" y="46" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-line)">BOM</text>
        <rect x="20" y="52" width="94" height="88" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1="32" y1={72 + k * 20} x2="102" y2={72 + k * 20} stroke="var(--color-faint)" strokeWidth="0.8" />
        ))}
        <text x="244" y="46" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-line)">ERP</text>
        <rect x="246" y="52" width="94" height="88" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1="258" y1={72 + k * 20} x2="328" y2={72 + k * 20} stroke="var(--color-faint)" strokeWidth="0.8" />
        ))}
        {[0, 1, 2].map((k) => (
          <line key={k} x1="114" y1={72 + k * 20} x2="246" y2={72 + k * 20} stroke="var(--color-line)" strokeWidth="0.8" />
        ))}
        <line x1="114" y1="132" x2="246" y2="112" stroke="var(--color-line)" strokeWidth="0.8" />
        <circle cx="180" cy="122" r="7" fill="none" stroke="var(--color-seal)" strokeWidth="1.2" />
        <text x="166" y="62" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">map</text>
        <line x1="66" y1="172" x2="286" y2="172" stroke="var(--color-faint)" strokeWidth="1" strokeDasharray="5 4" />
        <line x1="290" y1="162" x2="290" y2="182" stroke="var(--color-seal)" strokeWidth="1.4" />
        <text x="66" y="196" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-line)">push blocked</text>
        <line x1="20" y1="216" x2="336" y2="216" stroke="var(--color-faint)" strokeWidth="1" />
        <text x="20" y="232" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">declared rows / written rows</text>
      </g>
    );
  } else {
    body = (
      <g>
        <rect x="26" y="70" width="70" height="44" rx="3" fill="none" stroke="var(--color-faint)" strokeWidth="1.2" />
        <line x1="36" y1="92" x2="86" y2="92" stroke="var(--color-line)" strokeWidth="0.8" />
        <rect x="250" y="70" width="84" height="44" rx="3" fill="none" stroke="var(--color-ink)" strokeWidth="1.2" />
        <line x1="260" y1="92" x2="324" y2="92" stroke="var(--color-line)" strokeWidth="0.8" />
        <line x1="96" y1="92" x2="250" y2="92" stroke="var(--color-seal)" strokeWidth="1.2" />
        <polygon points="246,86 258,92 246,98" fill="var(--color-seal)" />
        <rect x="150" y="120" width="110" height="26" rx="2" fill="none" stroke="var(--color-seal)" strokeWidth="1" />
        <line x1="164" y1="132" x2="250" y2="132" stroke="var(--color-faint)" strokeWidth="0.8" />
      </g>
    );
  }
  return (
    <svg className={s.slotSchematic} viewBox="0 0 360 240" aria-hidden="true">
      <rect x="18" y="16" width="324" height="22" rx="3" fill="none" stroke="var(--color-faint)" strokeWidth="1" />
      <line x1="30" y1="27" x2="140" y2="27" stroke="var(--color-line)" strokeWidth="1.4" />
      <circle cx="322" cy="27" r="3" fill="var(--color-seal)" opacity="0.7" />
      {body}
    </svg>
  );
}

export default function Cases() {
  const { t, locale } = useUi();
  const all = getCases();
  const cases = all.filter((c) => c.tier !== 'minor');
  const series = all.filter((c) => c.tier === 'minor' && c.series);
  const minor = all.filter((c) => c.tier === 'minor' && !c.series);
  return (
    <section id="cases" className={`section field ${s.cases}`}>
      <span className="plate-rail">{t.cases.plateRail}</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>{t.cases.tagNo}</b> · {t.cases.tagZh}</span>
        </div>
        <div className="rule"></div>
        <h2 className={`section-title ${s.casesTitle}`}>{t.cases.title}</h2>

        <div className={s.caseList}>
          {cases.map((c, i) => {
            // 诚实分级绑定（v5 §2.2 继承）：仅「已上线」级事实带 GATE✓ 章；内部/开发中不盖（卡内「已验证」朱砂章 2026-10-17 目测裁决撤下）
            const verified = c.status === '已上线';
            const shotRatio = s[`shot_${ratios[i] ?? 'landscape'}`];
            const shots = ([] as string[]).concat(c.image ?? []);
            const alts = ([] as string[]).concat(locale === 'en' ? (c.imageAltEn ?? c.imageAlt) ?? [] : c.imageAlt ?? []);
            const variant = SCHEM[c.order] ?? 3;
            const slotLabel = variant === 0 ? t.cases.slotFlow
              : variant === 4 ? t.cases.slotFoundation
                : variant === 5 ? t.cases.slotData
                  : t.cases.slotUi;
            // id 用真源 order 而非卡面编号：卡面 0i+1 是详案子集内的位置，order 才是稳定标识（封面档案卡按 #case-<order> 跳进来）
            return (
            <article key={i} id={`case-${c.order}`} className={s.caseCard}>
              <div className={s.caseInfo}>                {/* Claim：图版级大编号 + 衬线题名 */}
                <div className={s.caseHead}>
                  <span className={s.caseNo}>0{i + 1}</span>
                  <h3 className={s.caseTitle}>{pick(locale, c.title, c.titleEn)}</h3>
                </div>
                <div className={`rail ${s.caseRail}`}>
                  {verified && <><span className="gate">GATE✓</span> · </>}CASE/0{i + 1}
                  {c.series && <> · {t.cases.seriesRail} · {pick(locale, c.part, c.partEn)}</>}
                </div>

                {/* 两栏体裁（v8.1 用户裁决：四个小标题并成两个）：问题＝problem+challenge，解法与结果＝whatIDid+outcome。真源仍四字段，配对只在渲染面 */}
                <dl className={s.spec}>
                  <div className={s.specRow}><dt>{t.cases.labelProblem}</dt><dd>{pick(locale, c.problem, c.problemEn)}{pick(locale, c.challenge, c.challengeEn)}</dd></div>
                  <div className={`${s.specRow} ${s.specResult}`}>
                    <dt>{t.cases.labelSolution}</dt>
                    <dd>{pick(locale, c.whatIDid, c.whatIDidEn)}{pick(locale, c.outcome, c.outcomeEn)}</dd>
                  </div>
                </dl>
              </div>

              <div className={s.caseVisual}>
                {shots.length > 0 ? (
                  <div className={s.shotStack}>
                    {shots.map((src, k) => (
                      <figure key={k} className={`${s.shot} ${s.shotReal}${ratios[i] === 'portrait' ? ` ${s.shotRealPortrait}` : ''}`}>
                        <img className={s.frameImg} src={asset(src)} alt={alts[k] || `${pick(locale, c.title, c.titleEn)}${t.cases.altSuffix}`} />
                      </figure>
                    ))}
                  </div>
                ) : (
                  <div className={`${s.shot} ${s.shotSlot} ${shotRatio}`}>
                    <span className={s.slotType}>{slotLabel}</span>
                    <Schematic i={SCHEM[c.order] ?? 3} />
                    <span className={s.slotHint}>{t.cases.slotHint}</span>
                  </div>
                )}
              </div>
            </article>
            );
          })}
        </div>

        {series.length > 0 && (
          <div className={`${s.moreBlock} ${s.seriesBlock}`}>
            <div className={s.moreHead}>
              <span className={s.moreLabel}>{t.cases.seriesLabel}</span>
              <p className={s.seriesIntro}>{t.cases.seriesIntro}</p>
            </div>
            <ul className={s.moreList}>
              {series.map((c, i) => (
                <li key={i} className={s.moreRow}>
                  <div className={s.moreIdent}>
                    <h3 className={s.moreTitle}>{pick(locale, c.title, c.titleEn)}</h3>
                    <span className={`rail ${s.moreStatus}`}>{t.cases.seriesRail} · {pick(locale, c.part, c.partEn)}</span>
                  </div>
                  <p className={s.moreLine}>{pick(locale, c.challenge ?? c.whatIDid, c.challengeEn ?? c.whatIDidEn)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {minor.length > 0 && (
          <div className={s.moreBlock}>
            <div className={s.moreHead}>
              <span className={s.moreLabel}>{t.cases.labelMore}</span>
            </div>
            <ul className={s.moreList}>
              {minor.map((c, i) => (
                <li key={i} className={s.moreRow}>
                  <div className={s.moreIdent}>
                    <h3 className={s.moreTitle}>{pick(locale, c.title, c.titleEn)}</h3>
                  </div>
                  <p className={s.moreLine}>{pick(locale, c.challenge ?? c.whatIDid, c.challengeEn ?? c.whatIDidEn)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}