---
title: PDM → ERP 数据同步中间件
order: 11
status: 内部系统
tier: minor
problem: 设计端 PDM 里的物料与 BOM 变更，靠人工誊录进 ERP——慢、易错、还查不到痕迹。
whatIDid: 自建同步中间件：PDM 发布对象自动抽取归一写入暂存库，变更经人工审核后推送 ERP，全程审计可查。
challenge: 跨 C#/.NET、Go 与 Web 门户三段技术栈，把「机器搬运 + 人工把关 + 完整审计」拧成一条链路。
titleEn: "PDM → ERP Data Sync Middleware"
problemEn: "Part and BOM changes in the design-side PDM were hand-copied into the ERP — slow, error-prone, with no trail."
whatIDidEn: "Built the sync middleware in-house: PDM released objects are extracted and normalized into a staging store, changes go to the ERP only after human review, fully auditable end to end."
challengeEn: "Spanning C#/.NET, Go and a web portal — twisting 'machines carry, humans gatekeep, everything is audited' into one pipeline."
---
