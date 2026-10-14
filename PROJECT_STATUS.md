# 项目状态追踪

> 依据知识库 `Vibe_Coding/templates/PROJECT_STATUS.md`
> 本项目：Personal Website（个人网站，接单交付凭证）

---

## 项目信息

- **项目名称**：Personal Website（个人网站 · 接单交付凭证）
- **开始日期**：2026-08
- **当前状态**：**Astro 版已接 GitHub 上线**（workflow build+deploy success，URL `https://gassamflower.github.io/PersonalWebsite/`）；React 并行工作区已提交（site-react/）；**v6「技术图鉴·墨与朱」已全站铺开**（9 区 + 附录「工作台之外」+ SiteNav + Footer，`docs/视觉方向-v6-技术图鉴.md` §9/§11 已逐条实测勾选；3D 粒子与 three 系依赖移除）；**上线门前整改已完成**（衬线子集自托管 + 分享卡片 + 无障碍三件，见 v6 §12 与 `docs/f-视觉落地设计.md` §10；JS 278.80 kB / gzip 84.92 kB、CSS 38.09 kB / gzip 7.47 kB、prerender 50.0 kB、字体 5 face 全本地 0 外部请求）
- **当前门禁**：架构门 · v6 视觉与门前整改完成，待用户浏览器目测全站（含真机微信里的分享卡片）→ 上线门（React 线尚未部署，Astro 已上线版为视觉冻结的 v4/v5 前身；**注意**：`assets/fonts/*.woff2`、`public/og.png`、`site-react/public/og.png`、`scripts/{fonts.mjs,og_image.py}`、`src/content/offcat/` 是新增文件，CI 从 git 检出构建，不入库=线上没有字体与卡片——**已随 51beed3 提交（本地，未 push）**；`vibe_images/` 样张延续既有做法保持本地不入库）

---

## 当前门禁

**当前门禁**：架构门
**进入时间**：2026-08

> 架构门包含：实施真源文档拆解 / 前端骨架 / 视觉参考图锁定
> 过门禁标准：真源文档有、参考图锁死、CI/CD 跑通

---

## 架构门验收清单

### 视觉参考图锁定（personal-site-builder 架构门）
- [x] 各分区参考图集合已生成/收集（`images/`，0-9 共 10 张）
- [ ] 一致性审查结论已记录（导航/配色/母题/间距/移动端）
- [ ] 单调性审查结论已记录（分区骨架不重复）
- [ ] 参考图已被用户接受为视觉准绳（用户已反馈"整体风格对了"，排版本详调）

### 前端骨架与实施文档
- [x] Astro 项目初始化（Astro 4 · 纯静态）
- [x] 设计系统 token（配色/字体/间距）建立（src/styles/global.css）
- [x] 9 分区骨架组件（src/components/，档案卷宗眉题母题）
- [x] 实施真源结构落盘（src/content/：案例 4 + 成长 3，schema 校验）
- [x] 部署流水线（.github/workflows/deploy.yml · GitHub Pages）

### 上线门（Astro 已部署，待浏览器确认）
- [x] 接 GitHub 远端 + 推送 main → Pages 自动部署（`gh` 已登录、origin 已设、workflow `success`）
- [ ] 上线门：可访问 URL + 匿名化复核（URL 在浏览器打开确认，本环境无外网浏览）

---

## 立项门验收清单

### 立项文档（docs/a-立项文档.md）
- [x] 项目是什么 / 面向谁 / 解决什么问题
- [x] 第一版做什么、不做什么（MVP 边界）
- [x] 产品流程和用户路径
- [x] 数据和业务对象清单
- [x] 技术路线初步判断
- [x] 验收规则（可检查标准）

### 功能清单（docs/b-功能清单.md）
- [x] 按角色拆解
- [x] 按业务流程拆解
- [x] 按模块拆解
- [x] 每个功能写清：给谁用/输入/输出/权限/正常流程/异常边界
- [x] 复杂功能单独拆文档 + 留索引

### 阶段计划（docs/c-阶段计划.md）
- [x] 第一阶段是 MVP
- [x] 每阶段包含哪些功能已说明
- [x] 为什么这么排已说明
- [x] 只给大阶段，不细化到技术实现

### 技术选型（docs/d-技术选型.md）
- [x] 产品形态已确定
- [x] 前端/后端/数据库/SDK 已确定
- [x] 为什么选、为什么不选其他方案（≥3 淘汰）
- [x] 换栈触发条件已写

### 架构设计（docs/e-架构设计文档.md）
- [x] 目录结构规则
- [x] 接口响应规则
- [x] 错误处理规则
- [x] 日志规则
- [x] 数据库连接规则（本站纯静态，可简化）
- [x] 权限入口（本站无登录，可简化）
- [x] 框架复用边界

### Agent 宪法（AGENT_CONSTITUTION.md + IDE 入口）
- [x] ≤200 行
- [x] 禁止事项 ≥5 条
- [x] 含验收标准
- [x] 含框架优先原则
- [x] 各 IDE 入口文件已创建（只写引用）
- [x] 含成本/上下文约束 / 模型分层 / 会话熔断

### Git 提交
- [x] 至少 4 次提交（立项 / 选型 / 架构设计 / 宪法）
- [x] 项目建了 .gitignore（node_modules/dist/.env/*.log）

---

## 下一步

> 当前要做的具体任务（≤3 项 · 架构门 + 第二版立项，待用户确认后启动）

1. **第二版立项决议（已固化，待用户最终确认）**：售后/客服（第三方表单→邮箱、客服微信悬浮、不建后台）+ 扩展（合作流程/项目过程/成长资产化/客户见证）+ 克制滚动动效 —— 详见 `docs/a-立项文档.md` §9、宪法 v0.2
2. 用户确认决议 → 更新 IDE 入口引用（若有）→ 开始第二版开发（P5，见 `docs/c-阶段计划.md`）
3. V1 收尾：接 GitHub 远端 + 推送 main → Pages 自动部署 → 上线门

---

## 工作日志

| 日期 | 做了什么 | 问题 / 备注 |
|---|---|---|
| 2026-08 | 立项方向多轮讨论 + 决议固化进 station-plan-v1.md（V1.2） | 接单定位/匿名脱敏/名字策略已定 |
| 2026-08 | 建立本项目 PROJECT_STATUS + docs/ 目录 | 状态 0，立项门 |
| 2026-08 | 起草 docs/a-立项文档.md（8 项）[草稿待确认] | 核心卖点修饰、案例匿名模糊化、工程用车助手改名与排序 |
| 2026-08 | 能力地图重构：三层→四梯队（独立交付/业务落地/工具提效/边界诚实）+ 量级锚点 | 结论：精选主角4项目，OPS/UUC截图脱敏，智能网关进"在开发" |
| 2026-08 | 梯度④修正：不熟不做→会用但不称精通（数据库/网络运维/Linux） | 更准确体现诚实+实用 |
| 2026-08 | 起草 d-技术选型 / e-架构设计 / AGENT_CONSTITUTION / AGENTS / CLAUDE | 立项门 7 项硬指标全部通过 |
| 2026-08 | Git 5 次提交 + .gitignore；更新 PROJECT_STATUS → 架构门 | 立项门闭环完成 |
| 2026-08 | 第二版立项决议：售后(第三方表单→邮箱)+客服微信悬浮+不建后台；扩展合作流程/项目过程/成长资产化/客户见证；克制滚动动效 | 固化进宪法 v0.2 + 立项 §9 + 功能清单 + 阶段 P5；待用户确认后开发 |
| 2026-08 | CapabilityMap「四梯队」→「技能树」：前端/后端/数据库/数据采集/AI智能体/运维/工程化 7 领域 × 诚实三档(已交付/会用/在学) + 证据锚点；内容迁入 src/content/skills/ | 回应"内容太空、无重点、缺说服力"；内容即真源（改内容只改 md 不再动组件）；全站字号收敛一档 + 移动端排布修正（用户指令）|
| 2026-08 | **第三版换栈授权**：Astro → Vite + React + r3f + CSS Modules；宪法更新 v0.3(§35-40)，docs(g/d/e/c) 更新 | 用户确认四决策：改宪法+docs / CSS Modules+token / brandkit 文档化规范+组件 / 3D 限 Hero 1 处；上线策略采纳「Astro 先上线→React 并行重建→就绪切换」 |
| 2026-08 | **React 版重建（site-react/）**：9 区全部迁移（Hero/Story/Timeline/Cases/CapabilityMap/Growth/Principles/Contact/Footer+SiteNav）；内容仍读根 src/content/（真源），r3f 粒子仅 Hero；CSS Modules + 全局 token | `tsc` + `vite build` 通过；内容 md 已进 bundle（工程用车助手 / 2026-08 验证在） |
| 2026-08 | **用构建期预渲染(SSR·prerender)守住宪法 §17**：`entry-server.tsx` + `vite.config.ssr.ts` + `scripts/prerender.mjs`，把 9 区全部渲染进 dist/index.html#root，客户端 hydrateRoot 水合 | 纯 CSR 产物 #root 为空壳违背「无 JS 关键内容可见」；预渲染后 45.3kB 内容写入初始 HTML 验证通过 |
| 2026-08 | **Astro 版接 GitHub 上线**：提交 `1dbd3a3`（docs 决策定稿 + .gitignore 增补）+ `0a40001`（site-react 并行工作区）；`git push -u origin main` 生效 | 远端 `GassamFlower/PersonalWebsite`；workflow `33720143174` build+deploy 均 `success`，Pages 部署成功；上线 URL 需用户浏览器确认（本环境无外网浏览能力） |
| 2026-10-14 | **UI 重构讨论定稿 → 起草 `docs/视觉方向-v5-朱砂批注.md`**：诊断 v4 三缺口（个性化=风格借来的、视觉感=张力全押氛围粒子、说服力=陈列非论证）；方案=「盖过章的档案」：批注轨（GATE✓/验证日期/证据指向）+ 朱砂验收章（--color-seal #C43C2B，每屏≤1、全页≤6、仅已验证内容可盖）+ Hero 档案卡立论（粒子降背景）+ 卡片 Claim/Evidence/Result 三段化 + 盖章微动效（唯一新增动效） | 用户三前提确认：受众=混合都要 / 基调=迭代重构（不推翻 v4）/ 技术线=site-react（依既有换栈授权）；Astro 线视觉冻结；**状态 [草稿待确认]，Q1–Q4 过门前不落码**；实施顺序=Hero+Cases 样板截图验收→铺全站→更新 f 文档 |
| 2026-10-14 | **Q1–Q4 全部确认 → v5 样板区落地（site-react）**：global.css 注入 seal 三 token + 批注轨 `.rail`/验收章 `.seal` 全局装置类 + 120ms 落章动效；新增 `Seal.tsx`（入视口落章，reduced-motion/无 JS 静态可见）；Hero 重做为「前景档案卡立论」（mono 事实行取内容真源、已上线行盖朱砂章、粒子层透明度降约 30%、移除三张示意 uiCard）；Cases 卡片三段化（Claim 衬线/Evidence 无衬线/Result mono+批注轨 `GATE✓·CASE/0n`+深墨面板提亮章 #e0705a） | `npm run build` 完整链路（tsc+vite+SSR prerender 45.5kB）通过；浏览器结构验收：5 案卡/5 批注轨/朱砂章全站仅 2 枚（≤6 纪律达成）；Hero 截图目测成立；**Cases 完整视觉截图因 in-app 浏览器表面丢失未竟，待用户本地 `vite preview`(4173) 目测后铺全站** |
| 2026-10-14 | **v6「技术图鉴·墨与朱」定稿 `docs/视觉方向-v6-技术图鉴.md`**：用户反馈 v5 样板"还是差点"→ 诊断三因（`--text-hero` 定义未用致首屏仅 2.5rem、无主导色域、档案缺印刷物理语言）→ 出 A/B/C/D 四方向样张（`vibe_images/`）+ 真实参考（Das Programm/The Pudding）→ 用户选 C 骨架+A 封面+D 脊柱、要求色彩收敛 → 定案：**三色制（纸白/墨黑/朱砂，墨蓝退役+别名降级为黑防漏改）**、图版系统（眉栏/竖排区名/规格表体裁/字阶放开）、封面深墨场+**移除 3D 粒子与 three 系依赖**（Q3=b，868kB chunk 归零）、封底墨场+署名章（与验收章分立）、Cases 线稿反白升主视觉 | Q1–Q4 全部确认；v5 文档标记 `[已并入 v6]`（装置全继承、色彩条款被修订）；实施顺序=token→封面→核心卷→样板验收→铺开→f 文档；Astro 线视觉冻结不变 |
| 2026-10-14 | **v6 样板两点用户目测过门（「过」）→ 其余六区 + SiteNav/Footer 全站铺开**：Story（编号发线行 + 页脚轨 `PLATE 02/08 · CAT.2026-10 · REV v6 · BY 一个故事`，桥线稿去蓝）/ Timeline（编年表：年份列 8.5em │ 内容列 │ 发线，mono `--text-2xl` 年份实测 20.8px，节点墨黑）/ CapabilityMap（能力名│实证│发线规格表 + 诚实三档**墨色**徽章：已交付=墨实底纸白字、会用=墨描边、在学=灰描边，本区零朱砂）/ Growth（月度索引表 `月份│本月的交代│标签`，tags 缺则不渲染）/ Principles（门禁流程图去蓝，无章）/ Contact+Footer（黑尾墨场 + 微信/邮箱/索取规格表 + 纸白底墨黑字按钮 + **署名章「一个故事」**2×2 印面全页仅 1 枚）/ SiteNav（图鉴索引 01·04·05·06·07·08 + mono） | `npm run build` 全链路通过：CSS 33.39 kB / gzip 6.65 kB，JS 270.83 kB / gzip 82.84 kB（粒子 chunk 归零），prerender 注入 45.7 kB；渲染后核对：`.plate-rail` 8 处、验收章 2 枚 + 署名章 1 枚、规格表 65 行、无 `undefined` 失效类名、computed style 无墨蓝残留、**全站文字对比度自动扫描 0 处低于 AA**；过程中修掉 4 个真缺陷：① 墨场上 `.field .regmark>i.k` 墨块不可见→改描边空框 ② 全局 `.rail/.plate-rail` 弱文字用 `--color-line`（3.16:1）→新增 `--color-ink-soft:#636360`（5.57:1）并把"线"与"弱文字"分职 ③ Hero `.heroRail` 与 `:global(.gate)` 特异度被全局 `.rail` 压过致墨场批注轨发灰、`DOSSIER` 变墨黑不可见→双类选择器提特异度 ④ `.field a{color:inherit}`(0,1,1) 压过组件按钮反白配色，使封面「精选作品」按钮墨字墨底完全隐形→删除该冗余规则（全局 `a` 本已继承）；截图表面仍不可用（`NATIVE_BROWSER_VIEWPORT_UNAVAILABLE`），像素级验收待用户浏览器 |
| 2026-10-14 | **新增附录窄带区「工作台之外 / OFF-CATALOGUE」**：用户问"只放工作经历会不会太单调"→ 建议只做一区不做四区（参考 nownownow / /now page / Uses This）→ 出 A 三栏索引卡 / B 台账条两张 v6 样张 → 用户「确认走 B，表格内容照此执行」→ 文档先行写入 `docs/视觉方向-v6-技术图鉴.md` §11（位置=Principles 后 Contact 前、`A-0n` 编号不占图版页码、≤6 行、诚实四档全墨系零朱砂、线稿禁标真实尺寸）→ 内容真源 `src/content/offcat/*.md` 4 条 + `src/content.config.ts` 声明 `offcat` 集合 → 落地 `Offcat.tsx/.module.css`（`编号│条目│日期+状态│标签` 台账 + Hyper-V→Ubuntu VM→Docker 拓扑示意线稿）+ `App.tsx` 插入 + SiteNav 增 `A 附录` | 弃用 A 样张理由：三栏卡片是模板默认解、引入第三种版式、额外线稿与 Cases 线稿反白主视觉抢戏；`npm run build` 与 `npx astro build` 双通过，CSS 36.49 kB / gzip 7.15 kB、JS 278.09 kB / gzip 84.70 kB、prerender 49.7 kB；实测：4 行台账进静态 HTML、A-04 无 date 故该行不渲染日期（缺字段不渲染）、附录区 0 处低于 AA、无朱砂、无横向溢出、`.plate-rail` 9 处；**待用户浏览器目测本区（拓扑线稿与台账比例需人眼定）**；追加：按 AI 建议把 A-01 由「内网私有化开发运维平台」改名「本机工作台（Home Lab）」（与核心卷 case-05 同名不同职，违反 §11 分工条款），仅改 md 不动组件；另修一处旧缺陷 `.footSep` 用 `--color-faint`（纸白 1.55:1）近乎隐形 → `--color-line`，全站复扫 423 个文本节点 0 处不达标 |
| 2026-10-14 | **上线门前整改（用户「目测来看，问题不大；你还有什么建议，以及我看不到的盲区」→「开始推进」，只做 1/3/4 三件小改，不引入新视觉决策）**：① **衬线自托管**——`fonts.googleapis.com` 本机 curl 12s 超时（大陆不可达，访客一直看的是系统回退字，"目测通过"迁移不到人家机器），全量分片方案要 806 kB/字重不可用 → 新增 `scripts/fonts.mjs`（`fontTools.varLib.instancer` 固化字重 + `fontTools.subset` 按实际渲染字符裁字；4.60 的 subset 无 `--instancer` 故分两步），产物入 `assets/fonts/`（5 woff2 + `serif-coverage.json` 810 码位 + `fonts.css`），两条线 `global.css` 各 `@import` 一次、head 删除 Google Fonts 链接，`build` 末尾挂 `--check` 守卫 ② **分享卡片**——`scripts/og_image.py`（`npm run og`）用 Pillow 按 v6 语言画 1200×630（纸白/墨线/裁切线/三色标/一枚朱砂署名章），**不用 AI 生图**（生图会产出假汉字，踩诚实红线），一次写 `public/og.png` + `site-react/public/og.png`，两条线 head 各补 `og:*`（绝对 URL）+ `twitter:card` ③ **无障碍**——`Offcat` 补区标题 `h2`（条目为 h3）、两条线加 `a.skip-link` + `main#main[tabindex="-1"]` + `#main:focus{outline:none}`、`.footSep` 的 `|` 一律 `aria-hidden`（纯装饰分隔，纸白 3.16:1 不该按正文判） | 实测：字体 5 face 全 loaded、网络面板 **0 条外部请求**、5 个 woff2 全 200；两线 `GET /PersonalWebsite/og.png` 均 200、`og:` 标签各 11 条；真实 Tab 聚焦后链接落 16/16（77×34）、Enter 后 `hash=#main`；**422 个文本节点 AA 扫描 0 处不达标**、横向溢出 0、无 `undefined` 类名；bundle：CSS 38.09 kB/gzip 7.47、JS 278.80 kB/gzip 84.92（粒子仍归零）、prerender 50.0 kB；两条线 `npm run build` 全绿。**守卫当场抓到 2 次缺字**（新增的「跳」「哪」）——证明内容改动后忘记重跑字体这一步会被 build 拦住。**遗留（用户已授权"按建议推进"）**：**已本地提交 `51beed3`**（54 files：v6 铺开 + 附录 + 门前整改三轮，工作区自 v6 起从未入库故合为一个提交；`assets/fonts/*.woff2` 与两枚 `og.png` 必须入库，CI 从 git 检出构建，不入库=线上既没衬线也没卡片），**未 push**——推 main 会直接触发 GitHub Pages 部署，留待用户目测后决定；`vibe_images/` 样张延续既有做法保持本地不入库；第 5 项（去 React hydration、约 278 kB JS 静态页）按约定留到上线门后；像素级观感与真机微信卡片裁感待用户浏览器/手机目测 |

| 日期 | 改了什么 | 为什么改 |
|---|---|---|
|  |  |  |

---

## 踩坑记录

| 日期 | 踩了什么坑 | 根因 | 是否反哺 Skill |
|---|---|---|---|
| 2026-10-14 | 分享卡片写进 `public/images/og.png` 后本地一切正常，但 CI 检出的站点根本不会有这张图 | `.gitignore` 的 `images/` 没有前导斜杠，连带挡住了部署资产目录 `public/images/`（本意只是挡生图草稿） | 是：**新增静态资源后必须 `git check-ignore -v <路径>` 验一次**，"本地能访问"不等于"部署里有"；产物落 `public/og.png` |
| 2026-10-14 | v6 全站目测"衬线字阶成立"，而访客看到的是系统回退字 | 判断依据来自开发机：本机装了源字体、且 localhost 永远可达；`fonts.googleapis.com` 在大陆网络 12s 超时这一条从未被验证过 | 是：**视觉验收要区分"我的机器"与"访客的机器"**——外链字体/CDN 先测可达性，再谈目测通过 |
| 2026-10-14 | `link.focus()` 后 `.skip-link:focus` 不生效，误判成 CSS 特异度问题 | in-app 自动化浏览器 `document.hasFocus()===false`，文档没焦点时 `:focus` 不应用；改用真实 `Tab` 按键才复现（链接落到 16/16） | 是：**自动化里验"聚焦态"要用真实按键事件，不能用 `element.focus()`**；同类还有截图表面不可用时的 computed style 审计 |
| 2026-10-14 | `scripts/fonts.mjs` 首版 `SyntaxError: missing ) after argument list`；另一次产物写进 `scripts/public/…` 且只裁出 228 字符 | ① 编辑链路把 JS 字符串里的全角引号 `“”‘’` 规范化成 ASCII，直接截断字面量 ② `ROOT` 用 `import.meta.url` 推导时少退一级 | 是：需要余量字符时用**码位数组**表达而非字面量；脚本落盘前先打印一次绝对路径 |
