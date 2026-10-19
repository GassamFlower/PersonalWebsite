---
title: 统一用户中心 UUC
order: 3
status: 内部系统
tier: minor
series: 底座
part: 身份
partEn: Identity
problem: 企业内部多个系统的账号、身份、权限各自为政：一个人入职要在几套系统各开一份账号，谁有什么权限靠人记。
whatIDid: 搭起企业统一身份与权限体系（SSO 中台）：单点登录、双因素口令、敏感字段加密，把散在各系统的账号权限收拢一处，配审计与接入规范。
challenge: 身份是所有系统的地基，出错代价最高：权限判定一律 fail-closed——查不到就绝不放行。
outcome: 多系统登录与授权统一为一个入口、一套规则；新人入职不再要在几套系统里各开一遍账号。
stack:
  - Go
  - Vue
  - PostgreSQL
evidence: 企业内部 SSO 中台，脱敏处理
# image: /case-03.png
# imageAlt: UUC 平台的脱敏示意
published: true
titleEn: "Unified User Center UUC"
problemEn: "Accounts, identities and permissions across several internal systems each went their own way: one new hire needed an account in every system, and who had which permission lived in someone's memory."
whatIDidEn: "Built a unified identity-and-permission layer (an SSO hub) for the company: single sign-on, two-factor one-time codes, encryption for sensitive fields — accounts and permissions dispersed across systems gathered into one place, with audit trails and an integration spec."
challengeEn: "Identity is the ground every other system builds on, where mistakes cost the most: every permission check is fail-closed — no lookup, no access."
outcomeEn: "Logins and authorisation across systems now share one entry and one set of rules; onboarding a new hire is no longer an account in every system."
---

把"一人一套账号各自为政"，理成一套统一可管的身份体系。
