---
title: 团队工作管理平台 WorkMate
order: 20
status: 内部系统
tier: feature
problem: 团队的工作记录、任务、排期与周报散在聊天和表格里：这周谁做了什么、任务卡在谁那儿、周报要手抄一遍，没有一处看得全。
whatIDid: 从零搭前后端：Go + PostgreSQL 做 33 条接口与项目成员权限底座，Vue 3 做 17 条路由、14 个 P0 页面全部落地；周报从日志与任务聚合，不再手抄。
challenge: 难在三处口径必须一致：任务状态怎么流转、项目成员怎么判权、周报怎么聚合；认证既保留自有登录，也为统一用户中心预留了账密代校验链路。
outcome: 内网已部署并经统一网关校验：流水线构建与部署跑绿，子路径访问、SPA 深链与 API 健康检查都通。业务门人工验收与真实后端 E2E 尚未完成，门控未签收。
stack:
  - Go 1.26 / Gin / GORM
  - PostgreSQL 16
  - Vue 3 / Element Plus
  - Woodpecker CI
stackEn: ["Go 1.26 / Gin / GORM", "PostgreSQL 16", "Vue 3 / Element Plus", "Woodpecker CI"]
published: true
titleEn: "Team Work Management Platform (WorkMate)"
problemEn: "Team records, tasks, schedules and weekly reports were scattered across chats and spreadsheets: nobody could see in one place who did what this week, which task was stuck on whom, and every report had to be copied out by hand."
whatIDidEn: "Built both sides from scratch: Go with PostgreSQL for 33 API routes and the project-member permission base, Vue 3 for 17 routes with all 14 P0 pages landed; weekly reports aggregate from work logs and tasks instead of being copied out."
challengeEn: "Three definitions had to agree — how task states move, how project membership is checked, how reports aggregate. Authentication keeps its own login and also leaves a credential-verification path for the unified user centre."
outcomeEn: "Deployed on the intranet and checked through the shared gateway: the pipeline builds and deploys green, and sub-path access, SPA deep links and the API health check all pass. Manual business-gate acceptance and real-backend E2E are still open, so the gates are not signed off."
---
把记录、任务与周报收进一套系统：谁在做什么、卡在哪一步，打开就能看见。
