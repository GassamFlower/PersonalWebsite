---
intro:
  - 我手上的活儿偏底座那一侧：既能从一台空机器做到有基线可查的内网环境，也能从一份需求做到能上线、能维护、能交接的系统。
  - 基础设施这条线走得最实。一台物理机上开 Hyper-V 虚机跑 Ubuntu 和 Docker；虚拟化与容器宿主按阶段手册逐段过门，每份手册先写过门标准，再记验收结论。一个网关收拢全部入口，6 个在用容器装下代码仓、数据库、CI 与容器面板。推主分支经 webhook 触发构建已实测，测试与部署两段留待真实项目补上。关系库按项目分库、各配最小权限角色；备份是每日脚本加去重加密快照，恢复演练实跑过一次；一个只读巡检脚本每小时查磁盘水位、容器存活和备份日志。边界写在这儿：备份卷与数据卷在同一块阵列上，是逻辑隔离，不是物理隔离。
  - 应用这一侧能独立做完一套：后台写接口、连库、对齐口径，前端从页面做到交互交付（内部系统走 Vue 3，本站走 Vite + React），数据侧建表、写 SQL、出报表。最细的一段是跨系统统一物料与 BOM 的口径：清洗规则、唯一键、要人工认领的分歧项，全写进规格。
  - AI 会用：智能体编排、检索问答、表格与 OCR 识别接进具体业务流程，能上线，不称精通。工程化有我自己的一套规矩：分阶段立项、每阶段留验收、文档当真源。
introEn:
  - "My work sits on the foundation side: I can take an empty machine to an intranet environment with a queryable written baseline, and take a requirement to a system that ships, is maintainable and can be handed over."
  - "The infrastructure line runs deepest. One physical host runs an Ubuntu VM under Hyper-V with Docker inside; the virtualisation layer and the container host were stood up through staged runbooks, each written with pass criteria before its acceptance result was recorded. One gateway gathers every entry point, six containers in service: code forge, database, CI and dashboard. A push to main triggering a build through a webhook is proven; the test and deploy stages still wait on a real project. Databases are split per project, each with its own least-privilege role; backups are a daily script producing deduplicated encrypted snapshots, and one restore drill has actually been run; a read-only inspection script checks disk headroom, container health and backup logs once an hour. The edge stated plainly: backup volume and data volume sit on one array — logical separation, not physical."
  - "On the application side I finish a system end to end: back-end interfaces, database wiring and agreed semantics, front end carried from pages through to delivered interaction (Vue 3 for internal systems, Vite + React for this site), and on data: tables, SQL and reports. The finest stretch was aligning material and BOM conventions across systems, where cleaning rules, unique keys and rows needing manual adjudication are all written into the spec."
  - "Working knowledge of AI: agent orchestration, retrieval Q&A, table and OCR recognition wired into real business flows — shippable, not claimed as mastery. My own engineering discipline: staged charters, an acceptance record per stage, documentation as the source of truth."
---

能力档位区的整体自述真源（docs/k §1.2 改版）。四小段一一对应 `introEn`，条数由 `scripts/check-content.mjs` 守卫。

`src/content/skills/*.md` 七份继续充当明细真源与档位计数源，页面不再逐域铺行。
