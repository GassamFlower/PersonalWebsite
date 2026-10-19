# f · 视觉落地设计文档 · Personal Website

> 项目：Personal Website（个人网站 · 接单交付凭证）
> 门禁：架构门 · 阶段 3·设计落地（视觉 token → 组件实现规格）
> 上游：`docs/视觉方向-v3-架构门.md`（视觉准绳）+ `docs/e-架构设计文档.md`（技术约束）+ `docs/出图提示词-v3.md`（9 张参考图）
> 状态：`[草稿]`，待用户确认
> 性质：本文档把「视觉准绳（怎么展示）」落成「组件实现规格（怎么写在 CSS/Astro 里）」。**它不是新的视觉方向**，只做翻译与统一。
> 审计方法：以架构门为准绳，用 taste-skill 的「抗 AI 模板味 / 可读性 / 对比度 / 移动端溢出」眼光做对照检查，逐条给出「已合规 / 需整改」。**冲突处一律以架构门为准绳，不改你已锁定的视觉方向。**

---

## 0. 一句话结论

> 现有 9 分区实现**骨架与气质高度贴合架构门卷宗母题**，配色 token 已锁定且用得克制、无渐变无玻璃无卡片墙——整体在正确轨道上。
> 可以调整的是**实现层的「纪律一致性」**，不是方向。核心问题集中在 4 处：
> **① 「档案 NN」分区眉题在各组件实现存在小差异；② 某些组件样式未走 token（硬编码色、未定义变量）；③ 一两处圆角/样式与 0–2px 约束偏离；④ 文档与实现出现「技能树 vs 四梯队能力地图」术语漂移。**

---


## 1. 审计边界与原则（先立规矩，避免过度整改）

| 项目 | 处置 |
|---|---|
| **铁律** | 架构门锁定的配色（骨白/近黑/深橄榄/铜金）、衬线大标题、档案编号眉题、圆角 0–2px、克制 fade-up、prefers-reduced-motion、无 JS 内容全量可见 —— **一律保留，不动** |
| **可动** | 样式未走 token 的硬编码、重复定义、与规范冲突的半径、文档/实现术语漂移 —— 本清单列出的整改项 |
| **不动内容** | 9 分区结构、真实时间线顺序、工程用车助手第 1 位、匿名化、文案、`src/content/` 的 md —— 一律不改 |
| **谁做** | 未过确认不落代码；确认后按 §6 分批改 `src/styles/global.css` 与相关 `.astro` |

> 这条边界对齐宪法 §14「框架优先、原生 CSS + token」与宪法 §27「禁止让用户从 2–3 个方案里选——给唯一推荐」的精神。

---

## 2. 审计对照（现状 vs 架构准绳）· 逐区快照

> 全部结论来自对 `src/styles/global.css` + `src/layouts/Base.astro` + 9 个组件 + 9 张参考图提示词的实测对照。

| 分区 | 当前实现 | 与架构准绳对照 | 评级 |
|---|---|---|---|
| 01 首屏 Hero | 档案 01 眉题 + 巨型衬线 + hero-focus + 底部三入口 | 冷衬线 ✔ 副标 ✔ 目录入口 ✔；右侧 3 张 SVG 示例 UI（架构允许示意）| ✔ 合规 |
| 02 品牌 Story | 档案 02 眉 + 桥架工程制图 SVG + FILE 脚注 | 与参考图 2（单线桥/身世转折）贴合 | ✔ 合规 |
| 03 做过的事 Timeline | 档案 03 眉 + 单列垂直时间轴 + 档案盒/印章 SVG | 时间线真实顺序 ✔；`.tl-flag` 圆角 99px（偏离 0–2px 规则）| ⚠ 待调 1 处 |
| 04 项目 Cases | 档案 04 眉 + 铜金大编号 + 状态徽章 + 占位/真实截图槽 | 状态徽章 ✔；占比 4:3（示意线稿合规）✔ | ✔ 合规 |
| 05 能力 CapabilityMap | 档案 05 · **技能树** | 架构准绳叫「档案 05 · 能力 / 四梯队地图」→ **术语漂移**，且不清落为技能树是否会收四梯队 | ⚠ 需用户判定 |
| 06 成长 Growth | 档案 06 眉 + 黑白柱状/上升 + 月度列表 | 月度索引 ✔ md 驱动 ✔ | ✔ 合规 |
| 07 规矩 Principles | 档案 07 眉 + 四门禁阶段流 + 对勾章/图章 | 体系串成递进线 ✔ | ✔ 合规 |
| 08 联系 Contact | 档案 08 眉 + 居中超大留白 + 铜金 CTA + 详询索取引导 | 布局架构吻合 +「详询索取」手法 ✔ | ✔ 合规 |
| 09 底部 Base footer | 极小灰字匿名声明 + 橄榄定位句 + 存档符号 | 与参考图 9 吻合 | ✔ 合规 |

---

## 3. 需要整改的硬问题（按严重度排序，不会放大的）

> 下面每一行都**可独立判定、可验证**，改动统一进 `src/styles/global.css` 或对应 `.astro`。

### P0 · 1 个真实 bug
| # | 位置 | 问题 | 整改建议 |
|---|---|---|---|
| 1 | `global.css` L122 / L120 | 使用了 `var(--ease-out)`，但 `:root` 从未定义该 token | 在 `:root` 补 `--ease-out: cubic-bezier(0.22, 1, 0.36, 1);`（或直接内联）。当前后缀会在浏览器静默 fallback 到 ease，仍是可见的 bug |

### P1 · 不使用 token 的硬编码（5 处）
| # | 位置 | 当前 | 建议改为 |
|---|---|---|---|
| 2 | `global.css` `.btn-solid` 文字色 | `#fdfbf5` | 补 `--color-on-accent: #fdfbf5;` 进 token，引用变量 |
| 3 | `Contact.astro` `.btn-solid` 文字色 | `#fbf8f1` | 同一 `--color-on-accent`，消除两处不一致（`#fdfbf5` vs `#fbf8f1`）|
| 4 | `Hero/Cases/Contact` 卡片/背景底 | `#fdfbf5` | 应复用 base，或定义为 `--color-surface`，避免多处分散 |
| 5 | `Growth.astro` hover 色 | `#7a8f6d`（不在配色表里）| 改回 `var(--color-accent)`（深绿套系）|
| 6 | `Hero.astro` `.ui-card` `box-shadow` | `rgba(43,41,36,.08)` | 阴影应走 token `--shadow`，或直接去掉（架构偏向克制、超轻阴影）|

### P2 · 与架构「圆角 0–2px」冲突（2 处）
| # | 位置 | 现状 | 建议 |
|---|---|---|---|
| 7 | `Timeline.astro` `.tl-flag` | `border-radius: 99px`（环形）| 改 `2px`，与全局一致（或跟随状态徽章既有处理）|
| 8 | `Hero.astro` `.ui-card` | `border-radius: 4px` | 收敛到 `2px`（架构锁 0–2px）|

> 注：`CapabilityMap` 的 level 徽章与 Cases 状态徽章用 `2px`，已合规，不动。

### P3 · 文档 ↔ 实现术语漂移（1 处，需你的裁决）
| # | 位置 | 现状 | 建议 |
|---|---|---|---|
| 9 | `视觉方向-v3` 写「档案 05 · 能力 / 四梯队能力地图」；实现却是 `CapabilityMap` 已重构为「档案 05 · 技能树」 | 文档落后于实现 | **二选一**（见 §7 待确认）：A) 更新视觉方向文档为「技能树」；B) 组件回退为「四梯队」结构。**建议 A**，技能树更贴「边界诚实」的分级表达 |

---

## 4. 已合规、刻意保留的项（防被误删）

- 配色 token（骨白/暖白/深橄榄/铜金）已锁定，`:root` 注释对齐架构 ✔
- `--text-mega` 统一分区大标题档位，组件已基本踩线（Story/Capability/Principles 各自 `1.15/1.12` 微差，属可接受浮差，不强制统一）✔
- 圆角总体在 0–4px，无大圆角卡片 ✔
- 动效仅保留 `fade-up`（Base.js）+ prefers-reduced-motion 全量降级 / 无 JS 内容全显 ✔
- 字体：衬线标题 / 无衬线正文 / 等宽编号；档案编号 / 眉题贯穿 ✔
- 无渐变 / 玻璃 / 霓虹 / 技能条 / 卡片墙 / 假仪表盘 / 头像 / 真实 logo / 未脱敏截图 ✔
- 内容真源：所有文字来自 `content/*` 的 md，组件只展示不改 ✔

---

## 5. 实现层「设计 token」补充建议（可选，不做亦可）

> 仅当你要把 §3 的整改落得更彻底时，才加下列 token；否则可用字面量 + `var()` 收敛即可。

```
在 :root 增加：
--radius:     2px;              /* 统一圆角（架构锁 0–2）*/
--radius-pill: 999px;            /* 仅状态徽章使用（架构明确允许）*/
--shadow: 0 4px 14px color-mix(in srgb, var(--color-ink) 8%, transparent); /* 如需轻影 */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);  // 修复 P0-1
--color-on-accent: #fdfbf5;      // 铜金按钮上的文字色
--color-surface: #fdfbf5;        // 卡片/槽位底色（统一 #fdfbf5 vs #fbf8f1）
```

---

## 6. 执行状态（已执行 B 档）

> 已按用户确认执行：**B 档（P0+P1+P2）+ P3 文档对齐（技能树）**，于本会话落地代码，未改任何 `src/content` 内容，也未引入依赖。

| # | 整改 | 文件 / 落点 | 状态 |
|---|---|---|---|
| 1 (P0) | 补 `--ease-out` token | `global.css` :root | ✅ 已加 |
| 2,3 (P1) | 按钮文字色统一 `--color-on-accent` | `global.css` `.btn-solid` 与 `Contact.astro` | ✅ 已改 |
| 4 (P1) | 卡片/占位底统一 `--color-surface` | `Hero.ui-card`、`Cases.shot` + token 新增 | ✅ 已改 |
| 5 (P1) | Growth hover 收回 `--color-accent` | `Growth.astro` | ✅ 已改 |
| 6 (P1) | Hero 阴影改用 `--shadow` | `Hero.astro` | ✅ 已改 |
| 7 (P2) | Timeline `.tl-flag` 圆角 → `--radius`(2px) | `Timeline.astro` | ✅ 已改 |
| 8 (P2) | Hero `.ui-card` 圆角 → `--radius`(2px) | `Hero.astro` | ✅ 已改 |
| — (P3) | 文档对齐为「技能树」 | `docs/视觉方向-v3-架构门.md` §5 | ✅ 已同步 |

> 新增 token 全部落在 `global.css :root`：`--color-surface`、`--color-on-accent`、`--shadow`、`--radius`、`--radius-pill`、`--ease-out`。

> 验证方式：按用户选择「只改代码不校验」——未在沙箱跑 dev/build（受限）。请在本地 `npm run dev` 确认视觉效果。

---

## 7. 决策记录与待确认

| 项 | 决策 | 状态 |
|---|---|---|
| Q1 技能树 vs 四梯队 | **对齐为技能树** | ✅ 已定，文档已同步 |
| Q2 整改档位 | **B 档**（P0+P1+P2） | ✅ 已定 |
| Q3 按钮文字色统一 `--color-on-accent` | **统一**（`#fdfbf5` 作为 token 值）| ✅ 已定 |
| Q4 是否本轮执行 | **本轮执行** | ✅ 已完成 |
| Q5 Hero 三张示意轻影 | 保留（沿用轻影，token 化 `--shadow`）| ⚠ 未单独立项（已随 B 档 token 化，未移除）|

> Q5 仅做了「令牌化」未做「移除」——若你希望更干净（去掉阴影），说一声即可。

---

## 8. 后续（未来美术阶段可选项，不属于本轮整改）
- 若上线阶段补真实脱敏截图，替换 `Cases.astro` 占位槽即可（代码已预留 `image` 字段）。
- 若引入交互打磨（P5-6：吸顶导航 / 滚动渐变）——继续守原生轻量 JS + reduced-motion，不引库。

---

## 9 · v6 组件规格增量（site-react 专用 · 2026-10-14）

> 视觉真源已升至 `docs/视觉方向-v6-技术图鉴.md`；本节只记录**组件级落地规格**（Astro 线视觉冻结，以下仅存在于 `site-react/`）。

| 组件 | v6 规格（已落地） |
|---|---|
| `global.css` | 三色 token（纸白/墨黑/朱砂）+ 墨蓝退役别名 `--color-accent: var(--color-ink)`；深墨场 token `--color-field*`；图版装置全局类 `.field` `.plate-rail`（≥1200px）`.crop` `.regmark`；`.field .regmark>i.k` 与 `.field :focus-visible` 在墨场改提亮值（墨色不可见谎报/可达性失效均已处理） |
| `SiteNav` | 图鉴索引：`01 封面 / 04 项目 / 05 能力 / 06 成长 / 07 规矩 / A 附录 / 08 联系`，mono 12px，页码 `--color-line` 着色（附录用 `A` 不占图版页码，避免 08 之后重排） |
| `Hero` | 深墨场 + `--text-hero` 巨衬线（实测 clamp 下限 51.2px，旧值 2.5rem 已解锁）+ v5 档案卡压墨 + 四角裁切线 + 右上三色标；3D 粒子与 three 系依赖移除 |
| `Story` | 图版 02：竖排区名；正文改**编号发线行**（01–05）；页脚轨 `PLATE 02/08 · CAT.2026-10 · REV v6 · BY 一个故事`；桥线稿全部墨黑 |
| `Timeline` | 图版 03 编年表：`年份列(8.5em) │ 内容列 │ 发线行`；年份 mono `--text-2xl`（20.8px 实测），节点圆点墨黑内联于题名；存档线稿去蓝 |
| `Cases` | 核心卷深墨场统一 `--color-field`；规格表 `问题/解决/关键/结果/技术栈`（缺字段不渲染）；线稿在 `.shotSlot` 内重定义 token 实现反白；图版级验收章 `--color-seal-on-dark` |
| `CapabilityMap` | 图版 05：大编号 + `能力名 │ 实证说明 │ 发线` 规格表，末行「证据」；诚实三档徽章**墨色化**——已交付=墨实底纸白字（实测 `rgb(26,26,23)/(246,246,244)`）、会用=墨描边、在学=灰描边；**本区不出现朱砂** |
| `Growth` | 图版 06 月度索引表：表头 `月份│本月的交代│标签` 三列 + 一行一月发线；tags 缺失则不渲染该格；折线去蓝 |
| `Principles` | 图版 07 门禁流程图：编号/节点/完成勾全部墨黑，**无章**（章只绑案例级事实） |
| `Offcat` | **附录 · 工作台之外（v6 §11 新增区）**：台账条 `编号(4.5em) │ 条目(衬线 text-lg) │ 日期+状态(6.5em) │ 标签(12em)`，表头 + 一行一条发线，行间 `--color-faint`、表头下 `--color-ink`；诚实四档徽章全墨系——已验证=墨实底、进行中=墨描边、计划中=灰描边、参考=无边纯字，**本区零朱砂零章**；右栏一张 Hyper-V→Ubuntu VM→Docker 拓扑示意线稿（`aria-label` 说明、**不标真实尺寸/网段/主机名**、≤980px 隐藏）；数据来自 `src/content/offcat/*.md`，`date` 缺失则该行不渲染日期（A-04 实测无日期）；区标题为 `h2 工作台之外 / OFF-CATALOGUE`（衬线 xl + mono 英文小注 + 一行副标），四条条目为 `h3`（v6 §12.3：此前只有 `section-head` 小标签，读 outline 会整区跳过） |
| `Contact` | 封底黑尾：`微信/邮箱/索取` 规格表；主按钮改**纸白底墨黑字**（实测 `rgb(246,246,244)/(26,26,23)`）；右栏信封信稿反白 + **署名章**（2×2 印面「一个故事」，`--color-seal-on-dark`，rotate -3°，全页仅 1 枚、不计入 ≤6 验收章）+ 三色标 |
| `Footer` | 并入 `field`（实测底色 `rgb(26,26,23)`），与封底同为黑尾，标记线稿提亮值 |
| `Seal.tsx` | v5 装置原样继承（120ms 落章、reduced-motion/无 JS 静态可见、`.dark` 提亮变体） |

**全站实测数值（2026-10-14 · 含附录区 · 铺开轮快照，上线门前整改后的数值见 §10）**：`npm run build` 通过（Astro 线 `npx astro build` 同步通过，`src/content.config.ts` 已声明 `offcat` 集合）；CSS 36.49 kB / gzip 7.15 kB；JS 278.09 kB / gzip 84.70 kB（粒子 868 kB chunk 仍归零）；prerender 注入 49.7 kB（无 JS 内容可见，附录 4 行台账与拓扑线稿均在静态 HTML 中）；渲染后 DOM：`.plate-rail` 9 处、验收章 `.seal` 2 枚 + 署名章 1 枚、规格表行 65 行 + 附录台账 4 行、computed style 全站点无 `#2e4a8c`、无失效 `undefined` 类名、附录区 computed style 扫描：0 处低于 AA、无朱砂、无横向溢出；**全站复扫 423 个文本节点 0 处不达标**（同轮修掉一处旧缺陷：`Story`/`CapabilityMap` 页脚分隔符 `.footSep` 用 `--color-faint`（纸白上 1.55:1）近乎隐形 → 改 `--color-line`，分隔符归"线"任职，按非文本 ≥3:1 判定）。

---

## 10 · 上线门前整改落点（v6 §12 · 2026-10-14）

三条都不引入新视觉决策，但决定"本机目测通过"能否迁移到访客机器。真源条款在 `docs/视觉方向-v6-技术图鉴.md` §12，这里只记落点与实测。

| 落点 | 文件 | 实测 |
|---|---|---|
| 衬线子集自托管 | `scripts/fonts.mjs`（生成/守卫）· `assets/fonts/fonts.css` + 5 个 woff2 + `serif-coverage.json` · 两条线 `global.css` 各 `@import` 一次 · 两条线 head 删除 Google Fonts 链接 | 810 码位 / 字重约 122 kB（分片方案要 806 kB/字重）；渲染后 5 face 全 loaded，网络面板 0 条外部请求；`build` 末尾 `--check` 抓到过 2 次缺字（「跳」「哪」） |
| 分享卡片 | `scripts/og_image.py`（`npm run og`）→ `public/og.png` + `site-react/public/og.png`；两条线 head 各 11 条 `og:*` / `twitter:card` | 1200×630 / 75.7 kB，两线 `GET /PersonalWebsite/og.png` 均 200。**注意坑**：`.gitignore` 的 `images/` 会连带挡住 `public/images/`，卡片放那里等于没部署 |
| 无障碍三件 | `App.tsx` / `Base.astro`：`a.skip-link` + `main#main[tabindex="-1"]`；两条线 `global.css`：`.skip-link{/-focus}` + `#main:focus{outline:none}`；`Offcat.tsx` 补 h2；`Story/CapabilityMap` 的 `.footSep` 加 `aria-hidden` | 真实 Tab 聚焦后链接落在 16/16（77×34，墨底纸白字），Enter 后 `location.hash=#main`；422 个文本节点 AA 扫描 **0 处不达标**；横向溢出 0 |

**整改后 bundle**：CSS 38.09 kB / gzip 7.47 kB；JS 278.80 kB / gzip 84.92 kB（粒子 chunk 仍归零）；prerender 注入 50.0 kB；`.plate-rail` 9、`.seal` 2。两条线 `npm run build` 全绿。

---

## 11 · 封面档案卡改「可点索引」（v8.7 · 2026-10-17）

用户裁决路径：先要求「这个优化需要讨论下，我现在还没有一个大概方向」→ 诊断 + 唯一推荐 + 样张 → 批准并追加两条（卡内不盖「已验证」、按钮文案「进入详情介绍」）。这里记视觉口径，内容口径在 `PROJECT_STATUS.md` v8.7 行。

| 决策 | 理由 | 落点 |
|---|---|---|
| 三行由「名单」改「索引」 | 原卡把三件事同时摆在墨场上：卡眉 GATE✓、行尾朱砂章、rail 验收句——同一张卡三重验收是噪声不是证据；且名单不可点，读者要自己滚到案例区找 | 每行一个原生 `<a href="#case-<order>">`，整行是热区；卡内朱砂章撤，验收只剩卡眉一处 GATE✓ |
| 行面 = 衬线题名 / sans 说明 / mono 箭头 | 档案卡是「纸面」而不是「台账」：题名要立得住，说明只是路标；三层用三种字体分职，比同一种 mono 三行更像人写的档案 | `.factLink` 双列 grid（`minmax(0,1fr) auto`）· `.factTitle` 衬线 600 · `.factNote` sans 13.6/1.6 `--color-ink-soft` · `.factArrow` mono `--color-line` `aria-hidden` |
| 分行用 1px 发线，不用卡中卡 | 白卡里再套白卡是 v8 册禁的 AI 感模板；发线沿用全站 `--color-faint` 分行语言 | `.factRow + .factRow{border-top:1px solid var(--color-faint)}` |
| 砖红只进交互层 | 常态零朱砂（D4：交互无配额，印层要留给章与署名印） | hover/focus 时题名与箭头入 `--color-seal`、箭头 `translateX(3px)`；说明行不变朱 |
| 版本事实挪到卡脚 | 「上线 2026-08 · REV 2026-10」压在案例名单头上会被读成「这三个案子的上线时间」，而它说的是本站 | `.dossierSite` mono 细字左对齐，与 CTA 同栏竖排 |
| 说明行取真源派生，不新写文案 | 内容真源纪律：封面不造第二套事实 | `getHeroFacts()` 把 `whatIDid` 截到第一个句读；案面选择改由 md `featured: true` 声明，`check-content.mjs` 规则⑦ 兜死「恰好 3 张、必须 `tier: feature`」 |

**待回写**：`docs/components.md` §4 封面 Hero 行仍写着 v8.1 口径（「行只剩标题＋已验证章」，三案含 UUC），已被本批推翻——该文档另一路会话在途，此处只记债不代改。

---

## 附：本文档的产出依据（证据路径）
- 审读了 `src/styles/global.css`、`src/layouts/Base.astro`、`src/pages/index.astro`、`src/components/{Hero,Story,Timeline,Cases,CapabilityMap,Growth,Principles,Contact,SiteNav}.astro` 全部组件。
- 对照了 `docs/视觉方向-v3-架构门.md` 的锁定 token / 母题 / 反套路清单、`docs/e-架构设计文档.md` 的三分离约束、`docs/出图提示词-v3.md` 的 9 张参考图。
- 结论在 §0–§5 已列，所有「✔ 合规」「⚠ 待修」均有文件级证据。