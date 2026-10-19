---
title: 智能网关（统一 LLM 出口）
order: 12
status: 内部系统
tier: minor
series: 底座
part: 出口
partEn: AI exit
problem: 内部多个系统各自直连大模型与业务接口——密钥散落、配置各写各的、调用无留痕，想管也管不住。
whatIDid: 从零搭建智能网关：企业 IM 消息按意图路由到业务接口，鉴权统一走用户中心；上层再做统一 LLM 出口与配置中心，各系统主备模型与密钥集中管理，调用一律留痕。
challenge: 内部已部署。让 AI 进生产先过三关：动作前二次确认、事后全量审计、密钥与模型集中管住；真实权限判定仍在待办。
titleEn: "Smart Gateway (Unified LLM Exit)"
problemEn: "Several internal systems each wired straight into LLMs and business APIs — scattered keys, hand-rolled config per system, no call trail to govern."
whatIDidEn: "Built the smart gateway from zero: enterprise-messenger messages route by intent to business interfaces, with authentication deferring to the unified user centre; above it, a unified LLM exit and configuration centre keeps every system's models and keys in one place, with all calls recorded."
challengeEn: "Deployed internally. Making AI production-safe means three gates first — a second confirmation before actions, a full audit trail after, keys and models governed in one place; live permission checks stay on the backlog."
---

让 AI 进生产系统时，权限、留痕与兜底先到位。
