---
title: PDM → ERP 数据同步中间件
order: 11
status: 内部系统
tier: minor
series: 底座
part: 搬运
partEn: Data carrier
problem: 设计端 PDM 里的物料与 BOM 变更，靠人工誊录进 ERP——慢、易错，还没了痕迹；更麻烦的是没定型的产物有可能被顺手抄进生产。
whatIDid: 自建同步中间件，三段技术栈：.NET 采集端挂在 PDM 侧、Go 服务与适配器对接 ERP OpenAPI、Next.js 审核门户。数据走"发布 → 抽取 → 归一 → 暂存 → 人工审核 → 推送 → 回写"七个环节，落五张表，全程审计可查。
challenge: 已经部署在内网生产环境：门户单点免登实测闭环，ERP 侧真实组织数据拉通并核对；跨系统字段口径靠实测对齐，而不是照着文档猜。首批物料 BOM 的实推仍在闭环中。
titleEn: "PDM → ERP Data Sync Middleware"
problemEn: "Part and BOM changes in the design-side PDM were hand-copied into the ERP — slow, error-prone, and leaving no trail; worse, an unfinished artifact could get transcribed into production by mistake."
whatIDidEn: "Built the sync middleware in-house across three stacks: a .NET collector hooked to the PDM side, a Go service and adapter talking to the ERP's OpenAPI, and a Next.js review portal. Data runs through seven stages — release → extract → normalize → staging → human review → push → write-back — over five tables, auditable end to end."
challengeEn: "Already deployed to the internal production environment: single-sign-on into the portal is closed-loop verified, and real organizational data from the ERP has been pulled through and reconciled. Cross-system field semantics were aligned by measurement, not by guessing from documentation. The first material/BOM push is still being closed out."
---

机器搬运、人工把关、完整审计，一条链路拧通。
