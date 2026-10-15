---
title: 统一用户中心 UUC（内部系统）
order: 3
status: 内部系统
tier: minor
problem: 企业内部多个系统的账号、身份、权限各自为政：一个人入职要在几套系统各开一份账号，谁有什么权限靠人记。
whatIDid: 搭起企业内部的统一身份与权限体系（SSO 中台）：单点登录协议对接、双因素动态口令、敏感字段 AES-256-GCM 加密，把分散在各系统的账号、身份、权限收拢到一处，配审计与接入规范。
challenge: 身份是别的服务都要依赖的地基，出错的代价最高。分三期推进、逐期验收（功能、性能与回归用例全部通过），权限对接一律 fail-closed——查不到就绝不放行。
outcome: 多系统登录与授权统一为一个入口、一套规则。
stack:
  - Go
  - Vue
  - PostgreSQL
evidence: 企业内部 SSO 中台，脱敏处理
# image: /case-03.png
# imageAlt: UUC 平台的脱敏示意
published: true
titleEn: "Unified User Center UUC (internal system)"
problemEn: "Accounts, identities and permissions across several internal systems each went their own way: one new hire needed an account in every system, and who had which permission lived in someone's memory."
whatIDidEn: "Built a unified identity-and-permission layer (an SSO hub) for the company: single sign-on protocol integration, two-factor one-time codes, AES-256-GCM encryption for sensitive fields, gathering accounts, identities and permissions dispersed across systems into one place, with audit trails and an integration spec."
challengeEn: "Identity is the ground other services build on — the cost of getting it wrong is the highest of all. Delivered in three phases, each one signed off (functional, performance and regression cases all passing), and every permission check is fail-closed: no lookup, no access."
outcomeEn: "Logins and authorization across systems now share one entry and one set of rules."
---

把"一人一套账号各自为政"，理成一套统一可管的身份体系。
