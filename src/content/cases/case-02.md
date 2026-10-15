---
title: 工业运维平台 OPS（内部系统）
order: 2
status: 内部系统
tier: feature
series: 底座
part: 生产
partEn: Shop floor
problem: 一家工业企业的痛点，立项时是被三句话说清的：服务器挂了，是用户打电话进来才知道；设备报错，靠老师傅的经验去猜；设计端下了 100 份的单，硬件端只收到 90 份，没人说得清少在哪一环。设备与运维信息散落各处，查不到、追不了、也没法诊断。
whatIDid: 从零搭建设备与运维信息平台。一期上线仪表盘、资产中心、网络与产线拓扑、监控告警、巡检、工单、安全、AI 副驾驶与知识库；二期补上物料交接、企业 IM 机器人通知、智能体平台对接与 H5 端。后端 36 张表、15 个服务模块，前端 22 个功能模块；向量检索直接用数据库自带的 pgvector，不为它再引一套独立向量库。
challenge: 难的不是把页面做出来，而是让告警在没人盯屏的时候找到对的人，让工单与消息两边的数据始终对得上，让"老师傅的经验"变成资产中心里一条可查、可复用的记录。
outcome: 内部已上线使用，覆盖资产 / 监控 / 巡检 / 工单 / 安全 / 知识库 / 用户中心；工单与消息通知双写经实测核对一致；AI 副驾驶一期能力已在生产环境验证。
stack:
  - Go
  - Next.js
  - PostgreSQL
  - MinIO
evidence: 企业内部系统，截图脱敏 / 自绘示意
# image: /case-02.png
# imageAlt: OPS 平台的脱敏示意
published: true
titleEn: "Industrial Operations Platform OPS (internal system)"
problemEn: "In one industrial company the pain was stated in three sentences at kickoff: a server only revealed itself as down when users phoned in; equipment faults were guessed by a veteran's experience; design issued 100 orders and hardware received 90, with no one able to say which step dropped them. Equipment and operations information sat scattered — unfindable, untraceable, undiagnosable."
whatIDidEn: "Built the equipment-and-operations platform from scratch. Phase one shipped dashboard, asset center, network and production-line topology, monitoring and alerting, inspection, tickets, safety, AI copilot and knowledge base; phase two added material handover, enterprise-messenger bot notifications, agent-platform integration and an H5 client. Back end: 36 tables across 15 service modules; front end: 22 feature modules. Vector search runs on the database's own pgvector instead of bolting on a separate vector store."
challengeEn: "The hard part was never the pages. It was making an alert reach the right person when nobody is watching a screen, keeping ticket and message data in exact agreement, and turning a veteran's tacit know-how into a queryable, reusable record in the asset center."
outcomeEn: "Live for internal use, covering assets / monitoring / inspection / tickets / safety / knowledge base / user center. The ticket-and-messenger double write was verified consistent in real checks, and the AI copilot's first-phase capability is proven in production."
---

看到长期被忽视的数字化空白，从零把它搭成能运行的系统。
