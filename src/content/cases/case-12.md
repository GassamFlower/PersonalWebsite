---
title: 智能网关（统一 LLM 出口）
order: 12
status: 内部系统
tier: minor
problem: 内部多个系统各自直连大模型与业务接口——密钥散落、配置各写各的、调用无留痕，想管也管不住。
whatIDid: 从零搭建智能网关（Go + Gin + PostgreSQL + Redis）：企业 IM 的消息进来后按意图路由到业务系统接口，鉴权统一走用户中心，动作前二次确认、事后全量审计；再加一层统一 LLM 出口与配置中心，各系统的主备模型和密钥集中管理，调用一律入监控与审计。
challenge: 它不是孤立工具，而是与统一用户中心、运维平台互相咬合的一套底座：10/10 业务模块完成、18 个以上包单测全过、一次性批量注册 286 个运维接口，IM 端到端真链路（回调 → 意图 → 只读工具 → 回执，含兜底与反向校验）实测通过并部署内网。真实权限判定与函数调用编排仍在待办清单上，没有写成已完成。
titleEn: "Smart Gateway (Unified LLM Exit)"
problemEn: "Several internal systems each wired straight into LLMs and business APIs — scattered keys, hand-rolled config per system, no call trail to govern."
whatIDidEn: "Built the smart gateway from zero (Go + Gin + PostgreSQL + Redis): messages arriving from the enterprise messenger are routed by intent to business-system interfaces, authentication defers to the unified user center, actions require a second confirmation and everything lands in the audit log. On top of it sits a unified LLM exit with a configuration center — each system's primary and fallback models and their keys managed in one place, every call recorded into monitoring and audit."
challengeEn: "Not a standalone tool but a piece of foundation that interlocks with the unified user center and the operations platform: 10 of 10 business modules done, unit tests green across 18+ packages, 286 operations interfaces registered in one batch, and a real end-to-end messenger chain (callback → intent → read-only tool → receipt, with fallback and reverse verification) verified and deployed on the intranet. Live permission checks and function-calling orchestration are still on the backlog, not claimed as done."
---

让 AI 进生产系统时，权限、留痕与兜底先到位。
