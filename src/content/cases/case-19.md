---
title: 企业内网门户（统一入口与工作台）
order: 19
status: 内部系统
tier: feature
series: 底座
part: 入口
partEn: Front door
problem: 内部系统各自为政：运维中心一个地址，智能网关一个地址，用户中心又一个。员工要记几套入口和口令，权限由各个系统自己判一次，同一个人在这边进得去、那边被挡在门外；AI 能力散在各处，也没有一处能看清哪些在跑、响应多快。
whatIDid: 从零做统一门户。登录入口收成一处：门户后端代调用户中心的 OIDC 授权码换会话，再 302 落到子系统回调页，运维中心与智能网关都从这一处分发免登；侧栏按用户中心的模块授权显隐，未授权即隐藏；工作台聚接待办、最近活动与快捷磁贴，右侧常驻一个 AI 面板直连自研主 Agent。已交付 11 个模块：认证、SSO 免登、门户布局、工作台、AI 广场、Agent 状态、品牌系统化、PDF 工具集、管理台仪表盘、CI/CD、子系统内嵌。
challenge: 难的是让三处判定保持一致——门户隐藏菜单、用户中心判授权、子系统服务端再校验一次，哪一处慢一步就会出现「看得见点不进」，或者反过来「看不见却能撞进来」。另一处难的是把假数据挡在结果之外：工作台 KPI 至今还是占位数字，没接上真实数据之前不算能力。
outcome: 内网已部署在用，运维中心与智能网关经门户单点进入；Agent 状态页把快答、自研主、深度、ERP 查数与网关服务拉成一张实时表，延迟逐分钟刷新。ERP 入口仍在选型（SSO 跳转与前端直连二选一），智能体中心升级开发中。
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
  - Agent 状态页：五个 Agent 与网关服务的实时状态与延迟
imageAltEn:
  - "The portal workbench on a PDF tool page, with the AI panel docked at right"
  - "Agent status: five agents and the gateway service with live latency"
published: true
titleEn: "Company Intranet Portal (Single Entry, One Workbench)"
problemEn: "The internal systems had drifted apart: the operations platform at one address, the agent gateway at another, the user centre at a third. Employees memorised several doors and passwords, each system judged permissions for itself, so the same person could be through one door and refused at the next; AI capability was scattered too, with nowhere that showed which agents were running or how fast they answered."
whatIDidEn: "Built the portal from scratch. The login entry collapsed into one place: the portal back end exchanges an OIDC authorisation code with the user centre, opens its own session, then 302s into the subsystem callback — so the operations platform and the agent gateway are both dispatched from here. The sidebar shows or hides modules according to the user centre's grants; unauthorised means hidden. The workbench gathers todos, recent activity and quick tiles, with an AI panel docked on the right that talks straight to the in-house planner agent. Eleven modules shipped: authentication, SSO dispatch, portal layout, workbench, AI plaza, agent status, brand system, PDF toolset, admin dashboard, CI/CD and embedded subsystems."
challengeEn: "The hard part was keeping three verdicts in agreement — the portal hides the menu, the user centre grants, the subsystem re-checks on its own server. If any one of them lags a step you get an entry that is visible but refuses to open, or the reverse: hidden yet still reachable. The other hard part was keeping invented numbers out of the result: the workbench KPIs are still placeholder digits, so until real data feeds them they do not count as capability."
outcomeEn: "Deployed and in daily use on the intranet; the operations platform and the agent gateway are entered through the portal by single sign-on. The agent status page flattens the quick-answer, planner, deep-reasoning, ERP-query agents and the gateway service into one live table, latency refreshed every minute. The ERP entry is still undecided between an SSO hand-off and a direct front-end link, and the agent-centre upgrade is in progress."
---

把几套入口收成一处，登录一次就能走到后面所有系统。
