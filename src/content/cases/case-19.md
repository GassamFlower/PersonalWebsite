---
title: 企业内网门户（统一入口与工作台）
order: 19
status: 内部系统
tier: feature
series: 底座
part: 入口
partEn: Front door
problem: 内部系统各自为政：三个系统三个地址，员工记几套入口和口令，同一个人这边进得去、那边被挡在门外；AI 在跑哪些、多快也没一处看得清。
whatIDid: 从零做统一门户：登录收成一处，各子系统经它分发免登、侧栏按授权显隐；工作台聚以待办与快捷入口，右侧常驻 AI 面板直连自研主 Agent。
challenge: 难在三处判定必须一致：门户藏菜单、用户中心判权、子系统再校验，慢一步就是「看得见点不进」或「看不见却撞进来」；也不拿占位 KPI 冒充能力。
outcome: 内网已部署在用：运维中心与智能网关从门户单点进入，Agent 状态页每分钟刷新各智能体与延迟；ERP 入口仍在选型，智能体中心升级开发中。
stack:
  - Vue 3
  - Element Plus
  - FastAPI
  - PostgreSQL
evidence: 内部系统，真实界面截图，第三方产品名已遮蔽
image:
  - /case-19-a.webp
  - /case-19-b.webp
imageAlt:
  - 门户工作台的 PDF 工具页，右侧是常驻 AI 面板
  - Agent 状态页：四个 Agent 与网关服务的状态与延迟，每分钟刷新
imageAltEn:
  - "The portal workbench on a PDF tool page, with the AI panel docked at right"
  - "Agent status: four agents and the gateway service, refreshed every minute"
published: true
titleEn: "Company Intranet Portal (Single Entry, One Workbench)"
problemEn: "The internal systems had drifted apart — operations platform, agent gateway and user centre behind three separate addresses, several doors and passwords to memorise, permissions judged system by system, so one person was through one door and refused at the next. Nowhere showed which agents were running or how fast."
whatIDidEn: "Built the portal from scratch: sign-in in one place, which hands single sign-on to the subsystems and shows the sidebar by grant; the workbench gathers todos and quick entries, with an AI panel docked at right on the in-house planner agent."
challengeEn: "The hard part was three verdicts agreeing — the portal hides the menu, the user centre grants, the subsystem re-checks — lag one step and an entry is visible but won't open, or hidden yet still reachable. The other was not passing off placeholder KPIs as capability."
outcomeEn: "Deployed and in daily use on the intranet: the operations platform and agent gateway are reached through the portal by single sign-on, and the agent status page refreshes latencies every minute. The ERP entry is still being chosen; the agent-centre upgrade is in progress."
---

把几套入口收成一处，登录一次就能走到后面所有系统。
