// Offcat — 附录 · 工作台之外（OFF-CATALOGUE）
// v6 §11 台账条：编号 │ 条目 │ 日期+状态 │ 标签，右侧一张拓扑示意线稿（无真实尺寸/网络细节）
import { getOffcat, type OffcatData } from '../lib/content';
import s from './Offcat.module.css';

const statusClass: Record<OffcatData['status'], string> = {
  已验证: s.stVerified,
  进行中: s.stDoing,
  计划中: s.stPlanned,
  参考: s.stRef,
};

const subNav = [
  { href: '#cases', label: '作品' },
  { href: '#capability', label: '能力' },
  { href: '#growth', label: '记录' },
  { href: '#contact', label: '联系' },
];

export default function Offcat() {
  const items = getOffcat();
  return (
    <section id="offcat" className="section">
      <span className="plate-rail">附录 · APPENDIX</span>
      <div className="container">
        <div className="section-head">
          <span className="tag"><b>附录 A</b> · 工作台之外</span>
          <div className="right-nav">
            {subNav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <a className={s.rightArrow} href="#contact" aria-label="下一页">→</a>
          </div>
        </div>
        <div className={s.ledgerRule}></div>

        <div className={s.offGrid}>
          <div className={s.ledger}>
            <h2 className={`section-title ${s.offTitle}`}>
              工作台之外<span className={s.offTitleEn}> / OFF-CATALOGUE</span>
            </h2>
            <p className={s.offSub}>正卷之外的几件事：用什么做、正在拆什么、审美从哪来</p>
            <div className={`rail ${s.ledgerHead}`}>
              <span>编号</span>
              <span>条目</span>
              <span>状态</span>
              <span>标签</span>
            </div>
            {items.map((it) => (
              <article key={it.no} className={s.row}>
                <span className={s.rowNo}>{it.no}</span>
                <h3 className={s.rowTitle}>{it.title}</h3>
                <div className={s.rowState}>
                  {!!it.date && <span className={s.rowDate}>{it.date}</span>}
                  <span className={`${s.badge} ${statusClass[it.status]}`}>{it.status}</span>
                </div>
                {!!it.tags?.length && <span className={s.rowTags}>{it.tags.join(' / ')}</span>}
              </article>
            ))}
            <div className={`rail ${s.ledgerFoot}`}>
              APPENDIX · OFF-CATALOGUE / {items.length} ITEMS / REV v6 / BY 一个故事
            </div>
          </div>

          <figure className={s.diagram}>
            <svg viewBox="0 0 440 300" role="img" aria-label="工作台拓扑示意：一台物理机内跑 Hyper-V 与 Ubuntu 虚拟机，容器里承载代码仓、CI、面板与备份，数据库落在独立块设备，备份一份出网到异地">
              <rect className={s.dStroke} x="6" y="6" width="374" height="262" />
              <text className={s.dLabel} x="14" y="24">PHYSICAL HOST</text>
              <rect className={s.dStroke} x="20" y="36" width="346" height="222" />
              <text className={s.dLabel} x="28" y="52">Hyper-V</text>
              <rect className={s.dStroke} x="36" y="64" width="210" height="180" />
              <text className={s.dLabel} x="44" y="80">Ubuntu VM</text>
              <rect className={s.dStroke} x="52" y="92" width="178" height="140" />
              <text className={s.dLabel} x="60" y="108">Docker</text>
              <rect className={s.dBox} x="60" y="120" width="78" height="44" />
              <text className={s.dText} x="99" y="146">Gitea</text>
              <rect className={s.dBox} x="146" y="120" width="78" height="44" />
              <text className={s.dText} x="185" y="146">CI</text>
              <rect className={s.dBox} x="60" y="176" width="78" height="44" />
              <text className={s.dText} x="99" y="202">Panel</text>
              <rect className={s.dBox} x="146" y="176" width="78" height="44" />
              <text className={s.dText} x="185" y="202">Backup</text>
              <rect className={s.dStroke} x="262" y="64" width="104" height="80" />
              <text className={s.dText} x="314" y="100">PostgreSQL</text>
              <text className={s.dNote} x="314" y="118">独立块设备</text>
              <rect className={s.dStroke} x="262" y="156" width="104" height="88" />
              <text className={s.dText} x="314" y="196">restic</text>
              <text className={s.dNote} x="314" y="214">加密备份</text>
              <line className={s.dDash} x1="366" y1="200" x2="432" y2="200" />
              <polyline className={s.dDash} points="424,194 432,200 424,206" />
              <text className={s.dNote} x="399" y="188">异地</text>
            </svg>
            <figcaption className={`rail ${s.diagramCap}`}>
              工作台拓扑 · 示意（不含真实网段与主机名）
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
