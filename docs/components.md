# components.md — 组件总目录（v8 风格重构 · 设计阶段真源）

> 项目：Personal Website · 落码面 = `site-react/` 部署线（Astro 线冻结不动）
> 状态：**已落码 · 待用户目测**（2026-10-16）。**D2 已拍板并按调色卡 01 Paper & Ink 对齐**（base `#F7F4EF` / ink `#1A1A1A`）；**D4 已拍板并落码**（砖红三层制；砖红取 `#BC4832`——卡面原值 `#C8553D` 实测 3.97:1 不过 AA，同族降半档到 4.66:1，卡面自己承诺「强可读性」故保读性优先）
> 上游：`docs/视觉方向-v6-技术图鉴.md`（基线，未修订条款全部继续有效）· 用户 v8 简报（禁/允清单）· 实测扫描（2026-10-16，下文引用处标注）
> 用法：落码时**逐区从本册选件**（§6 选配表）。用户简报「从 components.md 选用所有组件」的落实口径 = 本册每件装置在选配表中都有明确归属，无死库存。

---

## 1. 禁/允清单 → 现状实测与本轮动作

### 禁项（7 条）

| # | 约束 | 现状实测（2026-10-16） | 本轮动作 |
|---|---|---|---|
| F1 | 禁蓝紫渐变 / neon / glassmorphism | 全 CSS 扫描：gradient 0 处、backdrop-filter 0 处；色板 26 个 hex 全量审过，无蓝紫系 | 保持；写入验收扫描（§8） |
| F2 | 禁 Inter / Roboto / Arial 等 overused 字体 | 字体栈实测 **0 真命中**（初查 4 处系 `IntersectionObserver` 子串误报）；现用：Noto Serif SC 自托管子集（标题）+ 系统无衬线栈（正文）+ IBM Plex Mono（批注/编号） | 不动 |
| F3 | 禁 section 千篇一律居中 | 整段居中骨架 0 处；移动端局部居中 6 处（导航/页脚/署名印等微元素） | 落码时逐处裁决：微元素可留、整段不居中 |
| F4 | 禁 bounce / elastic 弹跳 | 字样 0；但 `--ease-spring: cubic-bezier(0.34,1.4,0.5,1)` **会过冲**且在 Cases 悬停在用（`Cases.module.css:46`） | 删曲线 + 该处改 expo（§2.2） |
| F5 | 禁渐变文字 / AI 光效 | 无任何渐变；唯一阴影 = 墨 8% 极轻投影 | 保持 |
| F6 | 禁 HTML 默认 blockquote / 列表 / 表格 | 全站无 `blockquote`/`table` 元素；列表全部自绘（`.ledger`/`.list`）；写作 md 管线仅渲染 h4/p/ul 三类块且 ul 有样式 | 保持；写作区样式在目测时重点看 |
| F7 | 禁「AI 感通用模板」 | 结构装置已强（图版四件套/规格表/批注轨/章）；本册即防线 | 以 §5 新层与 §6 差异化继续拉开 |

### 允许项（7 条）

| # | 约束 | 现状 | 本轮动作 |
|---|---|---|---|
| P1 | 暖底、非纯黑白 | 现底 `#F6F6F4` 近中性灰白；**纯黑白残留 3 处**（`--color-surface:#fff`、`.btn-solid:hover` 混 `#000`、`.dossierCta:hover` 混 `#fff`） | 提暖 + 清白黑（§2.1） |
| P2 | 品牌三色 | 米白 `#F7F4EF` / 纯黑 `#1A1A1A` / 砖红 `#BC4832`（卡砖 #C8553D 降半档保 AA）（+灰阶 4 值） | 照调色卡对齐（2026-10-16）；砖红按 D4 三层扩容（印/手/活），退役别名 `--color-accent` 归宿砖红后已删 |
| P3 | 每 section 布局形式不同 | 10 区骨架已各异（§6 表）；附录 Offcat 已整区撤下（2026-10-16 用户裁决，md 真源保留不渲染） | 保持 |
| P4 | expo ease-out 自然减速 | `--ease-out` 现值 (0.22,1,0.36,1)（quint 族，接近但非 expo） | 换 easeOutExpo 并全站统一（§2.2） |
| P5 | 手绘蜡笔感装饰、虚线圆圈 | 无此语言；册内已有基因：v5 砖红批注 + `stampArt` 已在用 `stroke-dasharray` | **新增批注层**（§5） |
| P6 | 从 components.md 选用所有组件 | 本册首次成册（此前零散在 v6 文档与 f 文档 §9） | §6 选配表 + 无死库存自检 |
| P7 | 截图发 X 不被说「又是 AI 做的」 | — | 目测判据（§9） |

---

## 2. 基座（token / 动效 / 字体）

### 2.1 色彩（改动 4 项，其余一律不动）

| token | 现值 | v8 值 | 说明 |
|---|---|---|---|
| `--color-base` | `#F6F6F4` | **`#F7F4EF`** | 米白（调色卡值）。落码复测 `--color-ink-soft` 对比度 5.49:1，AA 不降 |
| `--color-surface` | `#FFFFFF` | **`#FCFAF5`** | 卡面/图框底：非纯白。用点：dossier 档案卡 · `shotReal` 真图框 · `btnPaper:hover` · 流程勾圆底 |
| `--color-on-accent` | `#FFFFFF` | **`#F7F4EF`** | 砖红底上的文字统一暖纸白（同 base） |
| hover 混色 | `…88%, #000`（btn-solid）/ `…82%, #fff`（dossierCta） | **同系互混**：墨底钮混 base；砖红钮混 ink（`color-mix(in srgb, var(--color-seal) 85%, var(--color-ink))`） | 全站 0 个黑白字面值 |
| `--color-accent` | → ink 别名（退役过渡） | **归宿 = 砖红**：落码逐处显式化（纸面 `--color-seal` / 深墨场 `--color-seal-on-dark`），清完仍删别名（§7-4）；`global.css:17`「绝不落入砖红」注释同步改写 | D4 推翻 v6「accent 不落砖红」条款 |

砖红三值改定：`seal` `#BC4832`（卡砖降半档）/ `seal-faint` `#F2E3DF`（不动）/ `seal-on-dark` `#E0705A`（不动，新墨上 5.50:1）；深墨场五值（`field` 随墨改 `#1A1A1A`，`field-ink/line/muted/rule` 不动）、灰阶（`line` `#8B8B88` / `ink-soft` `#636360` / `faint` `#C8C8C3`）不动。

**砖红三层制（D4 · 用户裁决「砖红出现太少，扩容」）**——实测根因：真砖红全站仅 3 处装置（章/三色标/署名印），而按钮、链接、焦点环、眉栏、GATE✓、线稿高亮共 12+ 处走 `--color-accent` 且降级为墨。扩容为「印 · 手 · 活」三层，分界一句话：**档以墨立，动以朱记**（结构/正文/状态用墨；验证、批注、交互用朱）：

| 层 | 装置 | 明细 |
|---|---|---|
| 印（已有不动） | A07 章 / 署名印 / `.gate` / `.regmark` 朱格 | 验证语义独占；GATE✓ 随显式化入朱（`global.css:245`） |
| 手（新增 §5） | 批注笔 N1–N3 ≤8 / Cases 线稿红笔（每幅 ≤2 笔） | 线稿 accent 笔画显式化转朱（蓝图红笔=批注语言在图版内的延伸）；红笔只落在**自认边界**上（同阵列备份、错配口径、受阻推送），不用于装饰 |
| 活（本轮新开，不设配额） | 交互面 | ① `.btn-solid` **砖红底+纸白字**（实测对比 4.66:1 ≥ AA），hover 混 ink 加深 ② `.btnPaper` 反转对：纸底+砖红字，hover 砖红底纸白字 ③ `.ink-link` 链接常态砖红、hover 加深（深墨场内用 `seal-on-dark`） ④ `:focus-visible` 焦点环砖红 ⑤ 眉栏编号 `.tag b` 砖红、区名保持墨 ⑥ Writing `summary` 展开符与 hover 砖红 |

**不入朱（刻意）**：正文/标题/状态徽章 A12/事实行/规格表文字——诚实分级排面保持墨灰，避免「用红色表进度」的语义歧义。交互面功能性使用不设配额（由组件数量天然封顶），章语义不稀释。

> 防撞说明：暖底 + 衬线 + 砖红是当下 AI 生成式站点的常见组合；本册的区隔靠**总量**——图版系统、mono 批注轨、验收章纪律、规格表体裁、批注层（§5），且暖底取值克制（相对现值仅微提暖）。样张阶段以此自查。

### 2.2 动效（一曲线制）

- **`--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`（easeOutExpo）＝ 全站唯一曲线**。实测现值 (0.22,1,0.36,1) 属 quint 族、`--ease-spring` 会过冲（违 F4）、`--ease-ink` 为 in-out——后两者删除，用法并入 expo。
- 时长分档：盖章 120ms（不动）/ 悬停微交互 0.25s / 下划线生长 0.35s / 卡面 lift 0.35s（原 spring 0.4s 处）/ 批注描画 0.6s / 进场 reveal 0.7s / heroRise 0.9s。
- **死代码删除**：`riseIn / ruleIn / scanX / stampIn / lineRise / inkFill` 六条 keyframes 实测全站零引用（仅声明）。
- 纪律不变：`prefers-reduced-motion` 全部直显；无 JS 关键内容完整可见（宪法 §17/§31）。

### 2.3 字体（不动）

三角色维持：**Noto Serif SC 子集**（标题，自托管 810 码位/字重级）· 系统无衬线栈（正文，不引 Google Fonts）· **IBM Plex Mono**（批注轨/编号）。`scripts/fonts.mjs --check` 覆盖率守卫继续生效（新增文案缺字会让 build 失败）。
注意：批注层（§5）**不引入手写字体**——手绘感由 SVG 笔触承担，避免再添字体文件。

---

## 3. 原子装置（跨区公用，14 件）

| 编号 | 装置 | 形态与规格 | 使用规则 | 现用区 |
|---|---|---|---|---|
| A01 | 容器 `.container` | max 1280px + gutter clamp(1.5–4rem) | 全部分区 | 全站 |
| A02 | 竖排区名 `.plate-rail` | mono、vertical-rl、字距 0.35em、≥1200px 显形 | 每图版一枚 | 全站（9 处实测） |
| A03 | 眉栏 `.section-head` | `编号 · 区名`（mono）+ 右侧 meta 页码；GATE✓ 仅绑真实门禁事实 | 每图版一枚 | 全站 |
| A04 | 大标题 `.section-title` / `.prMega` | 衬线 mega clamp(1.6–2.5rem)；Hero 单用 `--text-hero` clamp(3.2–5.2rem) | 每区一枚主标题 | 全站 |
| A05 | 发线族 | 1px 墨线 opacity .85 + 分区变体（navRule/ctRule/prRule/storyRule/growthRule/ledgerRule/moreLine） | 分隔即信息，不铺装饰线 | 全站 |
| A06 | 批注轨 `.rail` | mono xs 字距 0.08em、ink-soft；`.gate` 砖红（D4） | 标注型元信息（编号/日期/计数） | Hero / Cases / Capability / Contact |
| A07 | 验收章 `.seal`（+`.dark` +`sealBig`） | 砖红方框 mono、rotate −2°、120ms 落章 | **仅已验证事实；每屏≤1、全页≤6**（v5 纪律原样不动） | Hero / Cases |
| A08 | 深墨场 `.field` | 墨底纸白字、色带与纸白区硬切 | 黑头/黑腰/黑尾 | Hero / Cases / Contact / Footer |
| A09 | 裁切线 `.crop` | 四角 L 形 14px、随 currentColor 自适应 | 深墨层专用 | Hero（Contact 可选） |
| A10 | 三色标 `.regmark` | 墨·朱·纸三格 + ⊕ 套准圈 | 签名装置，全页 2 处 | Hero 右上 / Contact |
| A11 | 按钮族 | `.btn-solid` **砖红底纸白字**（D4）/ `.btnPaper` 纸底砖红字 / `.ink-link` 砖红字+下划线生长 | 每屏主行动 ≤1 | Hero / Contact / 导航 |
| A12 | 状态徽章族 `.badge` | 四档：墨实底（已验证）/墨描边（进行中）/灰描边（计划中）/纯字（参考） | 诚实分级排面化；不用砖红 | 随 Offcat 区撤下（2026-10-16），装置留册备复用 |
| A13 | 图框族 | `.shotSlot` 线稿槽 + `.shotReal`/`.shotStack` 真图框（无条件加载 + BASE_URL 拼接） | 截图=证据；先过脱敏禁词表 | Cases |
| A14 | 跳链 `.skip-link` | 平时隐藏、聚焦显形 | 无障碍 | Shell |

## 4. 复合组件（分区级）

| 区 | 骨架（布局类型） | 关键组成 | 备注 |
|---|---|---|---|
| 封面 Hero | 深墨·左巨衬线＋右档案卡（双栏） | heroTitle/heroSub/heroFoot/heroRule + factRow 事实行 + dossier 档案卡/dossierCta | 招呼式文案已定（v7）；hero 单行字号按列宽反推。**v8.1 裁决扩展到本区**：factRow 撤 `factStatus` 状态芯片（`Hero.tsx` 渲染支路删除、CSS 规则删除、`enums.ts` 的 `STATUS_EN` 表删除），行只剩标题＋已验证章；章仍只在 `status === '已上线'` 时出现，真实性判据不变。实测 dev：`factStatus` 节点 0，三行为「工程用车助手 已验证 / 工业运维平台 OPS / 统一用户中心 UUC」 |
| 故事 Story | 纸白·双块「曾经/正在」＋竖线缩进层级 | storyGrid/storyLabelRow/storyPara/storyRow + bridgeSvg 桥线稿 + footSep | 竖线=层级（v7.3 定式） |
| 案例 Cases | 深墨卷·三层（详案卡×5 / 系列块 / 简表） | caseCard/caseNo/caseTitle/caseRail + spec 两栏表（问题│解法与结果）+ shotSlot 线稿 + shotReal 真图 + sealBig + seriesBlock + moreBlock | 线稿变体 4 支（0=车助手流程 1=OPS 矩阵 3=DevOps 流水线 4=地基拓扑 5=数据口径对账），`SCHEM` 按**真源 order** 绑定而非卡面位置（详案子集会重排，order 不会）；CASE/01 真截图仍欠。**v8.1 用户三轮裁决**：① rail 撤状态词（已上线/开发中/内部系统不再作小标签上页，`status` 真源字段与 GATE✓ 保留），进度事实改写进正文（此裁决为**站点级**，封面 Hero 的 factStatus 芯片同批撤下）；② 四行（问题/解决/关键/结果）按「讲问题与结果、讲业务价值、简洁」重写——实测四行总量 4173 → 2333 字（**−44%**），详案单行最长 85 字、简表与系列行一行最长 55 字；③ 四个小标题并成**两个**：`Cases.tsx` 渲染「问题＝problem+challenge」「解法与结果＝whatIDid+outcome」，`ui.ts` 撤 labelDid/labelKey、labelResult 改名 labelSolution——**真源四字段与 schema/守卫/Astro 线一概不动**，配对只发生在渲染面；并栏处砍重复（outcome 不再复述 problem 已列的字段清单），五卡两栏合计 1363 → 1236 字（−9%），单栏实测 92–142 字。**v8.8 用户裁决「帮我做样张放进去；数据标准统一也是。两个文本内容也都优化下」**：两张无真图的底座卡不再共用流水线稿——case-05 配「地基拓扑」（HOST⊃VM → nginx → 6 容器 → BKP/DATA，红笔虚线框圈出「备份卷与数据卷同在一块阵列」这条自认边界，底部 P1–P6 六道门基线），case-11 配「数据口径对账」（BOM│ERP 双面板 + 三条正映射一条交叉错配用红圈标出，推送箭头末端红杠＝首批实推受阻、图上不画成已跑通）。**体裁约束**：图内 `text` 一律只用拉丁与数字（HOST/nginx/BOM/ERP/P1-P6），避免为装饰扩 CJK 字体子集；每幅红笔 ≤2 笔（D4 手层配额）。`ui.ts` 加 `slotFoundation`/`slotData` 两键（zh「示意 · 地底线稿」「示意 · 数据线稿」），槽位标签改由线稿变体决定而非卡的数组位置。文案同批再压：case-05 145/169 → **130/135**、case-11 142/132 → **138/122**（zh 两栏，砍的是「先写过门标准再回填结论」这类复述与括号内细节，事实不减；恢复演练的具体步骤仍留在 `skills/ops.md` 台账）。实测：`npm run build` 全绿（4 页预渲染、check-content 通过、字体子集 957/953 未增字）；dev 断言两槽 `getBBox` 324×218 落在 360×240 内无裁切、红笔数 1 与 2、墨场内 `--color-seal` 计算值提亮为 `rgb(224,112,90)`、SVG 文字走 IBM Plex Mono（已加载） |
| 能力 Capability | 纸白·2 列台账（域│边界）＋首尾 rail | ledger/row/domain/bound/sub | v1.1 定式：行内无档位徽章，两档只留导语与页脚计数 |
| 写作 Writing | 纸白·折叠页列表（原生 details）＋诚实空态 | doc/head（date/title/chev）/summary/body（h4/p/ul）/empty | 真源 0 篇=空态；开合交互须用户目测（本环境 press_key 不可信） |
| 成长 Growth | 纸白·月度格＋折线 | growthItem/growthMonth/growthTakeaway/growthTags + growthChart | 一行一月发线 |
| 规矩 Principles | 纸白·四段门禁流程（节点线+勾圆）＋五级流水＋印章线稿 | stage/stageNo/flowLine/node/finishSvg + tierFlow/tierDir/tierName/tierRole/tierAct + stampArt | NO.005 印面为装饰线稿（aria-hidden），非真章 |
| ~~附录 Offcat~~ | 已撤下（2026-10-16 用户裁决） | — | md 真源 `src/content/offcat/` 保留，不渲染 |
| 联系 Contact | 深墨·双栏（规格表＋信封线稿＋署名章） | specRow + btnPaper + envelopeArt + signSeal（署名印面·非验收章）/signRail | 封底黑尾 |
| 页脚 Footer | 单行标记 | footerMark/footerTag | 与深墨场连续 |
| 导航 SiteNav | 吸顶索引＋语言切换 | navNo/navLinks/navRule/langSwitch/statusDot | 切换必须是原生 `<a>`（宪法 §1.1） |

---

## 5. 本轮新增：手绘批注层（ANNOTATION · 需裁决）

> 定性：给「图鉴」添一个**批注者的手**——像一本被人翻阅、圈点过的册子。是 v5「砖红批注」基因的回归与强化，但**不是章**。

### 5.1 三件装置

| 编号 | 装置 | 形态与规格 | 用场 |
|---|---|---|---|
| N1 | 圈注 `.mk-circle` | 手绘不规则椭圆（双笔叠合路径）、**虚线** `stroke-dasharray 6 5`、圆头、rotate −2°~−4°、视觉线宽 1.6–2；纸白场=砖红 / 深墨场=`seal-on-dark` | 环住**语言层元素**（标题词/标签/空态句） |
| N2 | 波浪下划 `.mk-underline` | 手绘波浪短线（单笔）、圆头、线宽 2.5–3、砖红，压住基线下方 0.12em | 点住一句短语 |
| N3 | 手绘箭头 `.mk-arrow` | 小弧线+箭头、线宽 1.8；ink-soft 或砖红 | 从旁白指向标的 |

### 5.2 纪律（新条款草案）

1. **批注 ≠ 验证**：批注只环语言层元素，**绝不上数据/成果断言**；验收章语义不被稀释（章=盖过的事实，批注=翻过的手）。砖红三层制见 §2.1 附表（D4）：印（章≤6 / 署名印 1）与手（批注笔≤8）各守配额，活（交互面）功能性使用不设配额。
2. 密度：每图版 ≤2 处、全页 ≤8 处；不与验收章叠同一元素。
3. 技术：手绘路径 = **人工撰写 SVG 路径**（不引 Rough.js 等任何库，宪法 §14/§31）；`aria-hidden="true"`；描画入场 = **纯 CSS clip-path 关键帧**（0.6s expo，无 JS 也照常播完并停在完整笔迹——文字本体永不参与裁切）；reduced-motion 静态直显完整笔迹。
4. 册内先例：`stampArt` 已用 `stroke-dasharray`（"6 1 1 1"/"3 3"）、规格表已有虚线分隔——虚线语言在图鉴体裁内有根。

### 5.3 首版投放位（6 处草案，过目可增删）

| # | 位置 | 装置 | 标的 | 场 |
|---|---|---|---|---|
| 1 | 封面 Hero | N1 圈注（暗场值） | 「一个故事」 | 墨 |
| 2 | 故事 Story | N2 下划 | 标题句「有据可查」 | 纸 |
| 3 | 写作 Writing | N1 圈注 | 空态句「第一篇在写。」 | 纸 |
| 4 | 成长 Growth | N1 圈注 | 当前月格（2026-10） | 纸 |
| 5 | ~~附录 Offcat~~ | ~~N1 圈注~~ | 随区撤下 | — |
| 6 | 规矩 Principles | N3 箭头 | 指向五级流水首级 `Inbox/` | 纸 |

---

## 6. 每区选配表（「选用所有组件」的落实 · 落码施工图）

| 区 | 骨架 | 原子件 | 复合/线稿 | 新层 | 本轮动作 |
|---|---|---|---|---|---|
| 封面 Hero | 墨场双栏 | A01 A02 A03 A04 A06 A07 A08 A09 A10 A11 | heroTitle/factRow/dossier | N1① | dossierCta 入朱（D4 砖红底）+ hover 混 ink；圈注入 Hero |
| 故事 Story | 纸白双块竖线 | A01 A02 A03 A04 A05 A06 | storyGrid/storyPara/bridgeSvg/footSep | N2② | 加波浪下划 |
| 案例 Cases | 墨卷三层 | A01 A02 A03 A04 A05 A06 A07 A08 A13 | caseCard/spec/shotSlot/shotReal/seriesBlock/moreBlock | — | 删死支路线稿变体；spring→expo；v8.8 补两支专属线稿（地基拓扑 / 数据口径对账，按 order 绑定） |
| 能力 Capability | 纸白 2 列台账 | A01 A02 A03 A04 A06 | ledger/row/domain/bound | — | 无（见注） |
| 写作 Writing | 纸白折叠列 | A01 A02 A03 A04 A05 | doc/details/empty | N1③ | 空态圈注 |
| 成长 Growth | 纸白月格 | A01 A02 A03 A04 A05 | growthItem/growthChart | N1④ | 当月圈注 |
| 规矩 Principles | 纸白流程+流水 | A01 A02 A03 A04 A05 A06 | stage/flowLine/finishSvg/tierFlow/stampArt | N3⑥ | 箭头入流水图 |
| ~~附录 Offcat~~ | 已撤下（2026-10-16） | — | — | — |
| 联系 Contact | 墨场双栏 | A01 A02 A03 A08 A10 A11 | specRow/btnPaper/envelopeArt/signSeal/signRail | — | btnPaper 入朱（D4 纸底砖红字，hover 砖红底纸白字） |
| 页脚 Footer | 单行 | A08 | footerMark/footerTag | — | 无 |
| 导航 SiteNav | 吸顶索引 | A03 A05 A11 | navNo/langSwitch/statusDot | — | 链接与 langSwitch 活动态入朱（D4；深墨场内的用 `seal-on-dark`）；移动端居中逐处裁决 |

**无死库存自检**：A01–A14、N1–N3 全部在表中出现 ≥1 次。✅
**差异注**：原与 Capability 同族的 Offcat 台账区已整区撤下（2026-10-16 用户裁决），同族不同相的声明随之失效。
**移动端居中审计**（F3）：6 处局部居中（SiteNav 折叠态/Footer 窄口/Hero 窄口/署名印文字等）落码时逐处过一遍，原则=微元素可留、整段排版不居中。

---

## 7. 清理与整改清单（落码时一次做完）

**token 层**：
1. 暖底四项替换（§2.1）；复测 `ink-soft`/`line` 对比度与深墨场比值不降。
2. 删 `--ease-spring`、`--ease-ink`；`--ease-out` 换 easeOutExpo；逐处替换用法（Cases lift、Hero heroRise、ink-link）。
3. 删六条死 keyframes（§2.2）。
4. `--color-accent` 别名归宿砖红（D4）：逐处显式化——`.btn-solid`/`.ink-link`/焦点环/眉栏编号 `.tag b`/GATE✓/线稿笔画 → 纸面 `--color-seal`、深墨场 `--color-seal-on-dark`；**例外**：`.section-head .tag` 区名显式回墨（不随别名翻朱）。全清后删别名 + 改写 `global.css:17` 注释。
5. 删无引用的 `--radius-pill`（实测 0 使用）。
6. `global.css` 内 `.rule` 重复定义（127–133 与 442–448 两段）合并为一处。

**组件层**：
7. `Cases.tsx` 死支路：Schematic `i===2`（统一入口）删除；连带 `ui.ts` 中仅它使用的 `artUnifiedEntry` 键（确认无他引后删，字体子集随重跑回收）。
8. Writing 样式审计：确认折叠正文内 ul/h4 无浏览器默认观感（`.body ul` 已有样式，落码时过一遍嵌套场景）。
9. 全站 focus-visible / reduced-motion / 无 JS 三项回归（宪法 §17/§31 纪律不动）。

**新增层**：
10. `src/components/annotations/`（N1–N3 组件 + 手绘路径常量）；接 §5.3 六处投放位。

---

## 8. 验收扫描清单（落码后逐条实测，对用户只报数据）

1. `npm run build` 全链路绿（tsc → vite → prerender → check-content → fonts --check）。
2. 禁项 grep 扫描全为 0：`gradient` / `backdrop-filter` / `bounce|elastic` / 真字体名（Inter|Roboto|Arial 排除 IntersectionObserver）。
3. computed-style 扫描：渲染后全页无 `rgb(0,0,0)` / `rgb(255,255,255)`（黑白残留清零验证）。
4. 色相扫描：全站色值无蓝紫系（对 v6 的 `#2e4a8c` 扫描口径扩展为色相区间）。
5. 对比度：渲染后全文字节点 ≥AA（沿用 422 节点扫描法）；深墨场四值 ≥4.5:1。
6. 溢出矩阵：zh ≥10 档 + en ≥8 档（1440→516），0 横向溢出；hero 恒 1 行。
7. reduced-motion：动画全关、批注/章静态完整可见；无 JS：prerender 注入内容完整。
8. 结构命中：详案卡 5 / 系列行 2 / 简表 4 / 批注 5 处（附录 Offcat 撤下后口径，2026-10-16 实测）。
9. 脱敏禁词表复扫 = 0（沿用现有禁词清单）。
10. 砖红排面扫描（D4）：非交互砖红（章+印+批注+眉栏编号）与交互砖红（链接/按钮/焦点环）分列报数；`seal` 于暖纸 ≥4.5:1（实测 4.66）、`seal-on-dark` 于墨 ≥4.5:1 复测。
11. **首屏样式内联断言**（2026-10-22 · `docs/o-国内可达性实测-托管迁移建议.md` §10）：四张发射页均 `<style>`=1、`link[rel=stylesheet]`=0、资源计时里 `.css` 请求=0；子页 `/writing/four-gates/` 上 woff2 取回 3 个（证明绝对 `/assets/` 路径在非根路径页成立）；负样本：向 dist CSS 注入 `</style` 后 `node scripts/prerender.mjs` 当场 exit 1（实测报「找不到样式表 link」——注入态下壳已无 link，另一条断言先命中；**`</style` 分支本身未被独立验证**，不写成已验）。

## 9. 目测判据（第 6 条）：截图发 X 不会被说「又是 AI 做的」

过门时会出 3 张可看样张（ImageGen，按本册 §2/§5 规格）：① 封面（暖底 + 墨场 + 圈注 + 砖红 CTA/链接）② 纸白图版（眉栏编号砖红/规格表/发线/下划线）③ 深墨卷（案例卡 + 章 + 红笔线稿 + 真图框）。样张与线上真实站对照看，按「换到别人机器上、截一张发出去，像不像手工做的册子」为判。

---

## 10. 决策点（过目时需你点头的三件事）

| # | 事项 | 建议 |
|---|---|---|
| D1 | **砖红批注纪律修订**：砖红从「唯一彩色·只出现在章」扩为「三用途配额制」（章≤6 / 署名印 1 / 批注笔≤8，§5.2） | 采纳——v5 批注血脉回归，且各用途守配额不稀释章语义 |
| D2 | 暖底取值 + 调色卡对齐：`base #F7F4EF` / `ink #1A1A1A` / `seal #BC4832`（§2.1） | ✅ **已拍板（2026-10-16）**：先拍暖底方向，后按用户调色卡 01 Paper & Ink 校值；surface `#FCFAF5` 为衍生值保持 |
| D3 | 批注首版投放 6 处点位（§5.3） | 采纳；增删名单你直接点名 |
| D4 | **砖红三层扩容**（§2.1 附表）：印（章/印/GATE✓，不动）+ 手（批注≤8 / 线稿红笔）+ 活（交互面：按钮砖红底 / 链接砖红字 / 焦点环 / 眉栏编号；正文与状态徽章**不入朱**） | 采纳——砖红实测仅印 3 处（grep `--color-seal`），扩容后每图版都有砖红落点；章语义不稀释 |
| D5 | **案例文案体裁**（§4 案例行）：状态小标签不上页（事实进正文）+ 讲问题与结果、讲业务价值、砍篇幅 + 四个小标题并成两个 | ✅ **已拍板并落码（2026-10-16 四轮）**：① `Cases.tsx` 三处 rail 撤 `status` 渲染（真源字段与 GATE✓ 保留），11 张卡 zh+En 成对重写，四行总量 4173 → 2333 字（−44%），零新增事实、诚实边界全保留；② 裁决扩到封面：`Hero.tsx` 撤 factStatus 芯片 + `Hero.module.css` 删规则 + `i18n/enums.ts` 删 `STATUS_EN` 表；③ 撤标签后每张卡进度仍可读（case-03/06/09/12 等把状态写进正文），实测「已上线」5 处 /「内部系统」1 处 /「开发中」1 处**全部位于正文文本节点**，无小标签位残留；④ 四标题并两栏——「问题＝problem+challenge」「解法与结果＝whatIDid+outcome」，真源四字段与 schema/守卫/Astro 线不动，五卡 1363 → 1236 字（−9%），单栏 92–142 字。实测 10 个 spec `dd` 零溢出，双语预渲染各 5 枚新标签、旧「解决／关键／结果」零命中 |
