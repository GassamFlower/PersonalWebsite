---
intro:
  - 我手上的活儿偏底座那一侧：既能从一台空机器做到有基线可查的内网环境，也能从一份需求做到能上线、能维护、能交接的系统。
  - 基础设施这条线走得最实：Ubuntu + Docker 起步，虚拟化与容器宿主按阶段手册逐段过门，每份手册先写过门标准、再落验收结论；一个网关收拢全部入口，5 份编排拉起 14 个服务，私有代码仓加流水线把「推代码 → 构建 → 测试 → 部署」固定成规矩；关系库每个项目独立库、独立最小权限角色，备份有每日脚本与去重加密快照，恢复演练实跑过一次，另有一个只读审计脚本把偏离逐条回填基线表。边界也写清楚：备份卷与数据卷在同一块阵列上，是逻辑隔离不是物理隔离。
  - 应用这一侧能独立做完一套：后台写接口、连库、对齐口径；前端从页面做到交互交付（内部系统一条线是 Vue 3，本站这条线是 Vite + React）；数据侧建表、写 SQL、出报表，做过最细的一段是跨系统把物料与 BOM 的口径统一——清洗规则、唯一键、要人工认领的分歧项都写进规格里。
  - AI 会用：把智能体编排、检索问答、表格与 OCR 识别接进具体业务流程，能上线但不称精通。工程化我有一套自己的做事规矩——分阶段立项、每阶段留验收、文档当真源，这让复杂的事越做越轻。
introEn:
  - "My work sits on the foundation side: I can take an empty machine to an intranet environment with a queryable written baseline, and take a requirement to a system that ships, is maintainable and can be handed over."
  - "The infrastructure line runs deepest. Starting from Ubuntu + Docker, the virtualisation layer and the container host were stood up through staged runbooks, each one written with pass criteria before its acceptance result was recorded against it. One gateway gathers every system entry, five manifests bring up 14 services, and a private code forge plus pipelines turned push → build → test → deploy into a standing rule. Every project gets its own database and its own least-privilege role; backups run as a daily script producing deduplicated encrypted snapshots, one restore drill has actually been run, and a read-only audit script writes each deviation straight back into the baseline table. The edge stated plainly: the backup volume and the data volume sit on one array — logical separation, not physical."
  - "On the application side I finish a system end to end: back-end interfaces, database wiring and agreed semantics; front end carried from pages through to delivered interaction (Vue 3 for internal systems, Vite + React for this site); on data, tables, SQL and reports — the finest stretch being cross-system alignment of material and BOM conventions, where cleaning rules, unique keys and rows needing manual adjudication are all written into the spec."
  - "Working knowledge of AI: agent orchestration, retrieval Q&A, table and OCR recognition wired into real business flows — shippable, not claimed as mastery. I also run my own engineering discipline: staged project charters, an acceptance record per stage, documentation as the single source of truth. That is what makes complex work get lighter over time instead of heavier."
---

能力档位区的整体自述真源（docs/k §1.2 改版）。四小段一一对应 `introEn`，条数由 `scripts/check-content.mjs` 守卫。

`src/content/skills/*.md` 七份继续充当明细真源与档位计数源，页面不再逐域铺行。
