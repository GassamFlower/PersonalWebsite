---
title: 内网基础设施与交付基线
order: 5
status: 内部系统
tier: feature
series: 底座
part: 地基
partEn: Foundation
problem: 企业内网没有公共云可依赖：代码、数据库、发布、备份、跨系统接入全要自己闭环，而且从选型、配网、装机到上线和事后维护都是同一个人。更要紧的是——环境如果只靠"我记得"，别人接不住，下一个项目就会各写各的。
whatIDid: 两台宿主机起步：一台跑容器与业务面，一台做网络出口，按网段分工，远程维护只留一条受控通道。对内用一个网关按子路径把各系统挂到同一入口（门户、运维中心、用户中心、智能网关、数据同步各占一段），5 份生产编排起 14 个服务；私有代码仓加 5 条流水线（合计约 690 行配置）把「推主分支 → 构建 → 静态检查 → 测试 → 部署」固定下来；数据库统一一套不出网，每个项目独立库、独立最小权限角色，另设一条到外部托管仓的镜像同步当异地备份。治理另写三份东西：跨项目的基线约定表（命名 6 条、端口唯一登记 8 项加分区段口径、服务默认值 9 条、偏离记录 8 条）、接入十步且每步留证据的清单（含陌生组件先答四问、完成判定 7 项）、一个 9 段只读审计脚本——扫容器、端口、网络、卷、健康检查、重启策略与内存限制、浮动标签镜像、挂载，输出直接回填基线表。
challenge: 难点不在装软件，在两件事。一是取舍要写成结论：内网当前不做传输加密、不开公网入口，这是裁决不是遗漏，写进表里后来的人才不会又去补一遍。二是基线错了要能推翻自己：8 条偏离里有 3 条的结论是「基线定错了，改约定」，实测扫出两个未登记端口就补登两个，而不是让现实去迁就旧表。
outcome: 多个在用的内网系统跑在这套环境与流水线上；端口与命名有唯一真源可查，新系统按清单接入并逐步留证据。诚实边界：备份目前是文档级规程（每日定时、保留 30 天），恢复演练没有留下可查产出；监控与告警是运维中心这个产品自带的功能，不是另起的一套观测栈。
stack:
  - Ubuntu + Docker
  - nginx 子路径网关
  - Gitea + Woodpecker CI
  - PostgreSQL 独立库与专属角色
  - Portainer
evidence: 企业内部环境，主机、地址、账号与密钥一律隐去
published: true
titleEn: "Intranet Infrastructure and Delivery Baseline"
problemEn: "No public cloud to lean on inside the intranet: code, databases, releases, backups and cross-system onboarding all had to close the loop in-house, with the same person choosing tools, wiring the network, installing, shipping and then maintaining it afterwards. The sharper problem was memory — an environment that only lives in one head can't be handed over, and the next project invents its own rules."
whatIDidEn: "Started from two hosts: one runs containers and the business surface, one is the network egress, split by segment with a single controlled channel for remote maintenance. Inside, one gateway mounts every system under a sub-path of the same entry (portal, operations centre, user centre, agent gateway and the data-sync middleware each get a segment); five production manifests bring up 14 services. A private Git forge plus five pipelines (about 690 lines of configuration) fix the path push → build → static check → test → deploy. One database service stays inside the network while every project gets its own database and its own least-privilege role, with a mirror to an external forge as off-site backup. Governance came as three artefacts: a cross-project baseline table (6 naming rules, 8 uniquely registered ports plus four reserved ranges, 9 service defaults, 8 recorded deviations), a ten-step onboarding checklist that demands evidence at every step (including four questions before touching an unfamiliar component and seven completion criteria), and a nine-section read-only audit script that scans containers, ports, networks, volumes, health checks, restart policies and memory limits, floating-tag images and mounts — and writes its findings straight back into the baseline table."
challengeEn: "Installing the software was never the hard part. Two things were. First, trade-offs had to be written down as decisions: no transport-layer encryption and no public entry point on this network is a ruling, not an oversight — recorded, so nobody quietly re-does it later. Second, the baseline has to be able to overrule itself: three of the eight recorded deviations conclude that the baseline itself was wrong and the convention must be amended, and two unregistered ports found by scanning were registered rather than excused — reality does not get bent to fit the old table."
outcomeEn: "Several internal systems in daily use run on this environment and these pipelines; ports and naming have one queryable source of truth, and new systems onboard against the checklist with evidence per step. Honest edges: backups are a documented routine (daily schedule, thirty-day retention) rather than a scripted one, and the restore drill left no verifiable artefact; monitoring and alerting are features of the operations platform itself, not a separate observability stack."
stackEn: ["Ubuntu + Docker", "nginx sub-path gateway", "Gitea + Woodpecker CI", "PostgreSQL per-project database and role", "Portainer"]
---

把"没有现成基础设施"这件事，从选型、配网一直做到有基线可查、有审计可跑。

内部环境，主机、地址、账号、密钥与企业背景一律隐去。
