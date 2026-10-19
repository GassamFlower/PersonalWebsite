---
order: 6
domain: 运维与部署
level: 已交付
tagline: 从零搭起自建内网底座，按阶段手册逐段过门；备份与恢复演练都实跑过。
skills:
  - name: 私有化基础设施搭建
    note: 从零搭起内网底座（一台物理机上开 Hyper-V 虚机跑 Ubuntu + Docker），按阶段手册逐段验收交付
  - name: 容器化部署与运行
    note: docker run 起 6 个在用容器：私有代码仓 / 数据库 / CI 服务端与 agent / 容器面板 / 网关（本环境 compose 装不上，编排这层刻意不做）
  - name: 持续交付
    note: 推主分支经 webhook 触发流水线构建已实测；测试与部署段留待真实项目补上，没写成已完成
  - name: 备份与异地副本
    note: 每日定时脚本跑逻辑备份 + 去重加密快照（保留 日 7 / 周 4 / 月 6）；代码另设外部镜像当异地副本，数据暂无第二份
  - name: 基线与恢复演练
    note: 跨项目基线约定表与接入表，端口与路由先定稿再写代码；恢复演练实跑过一次（从快照取回文件、把备份恢复进一座空库数出表数）
  - name: 巡检与告警
    note: 自建巡检脚本只判三条线：磁盘水位、容器不在 Up、备份超过 30 小时无日志
  - name: 静态站点与后端服务部署
    note: 本项目用 GitHub Pages 自动部署；内部系统与云服务均部署运行
  - name: Linux / 网络基础
    note: 在 Linux 环境部署 VM、配网、挂存储、起服务的完整实操
evidence: 一台物理机与其虚机上的内网基础设施在用，流水线与基线约定表可查（内部环境）
domainEn: "Ops & deployment"
taglineEn: "Self-hosted intranet foundation built from scratch, gated stage by stage against written runbooks; backup and restore drills have both actually been run."
skillsEn:
  - name: "Private infrastructure build-out"
    note: "Intranet foundation built from scratch on one physical host running an Ubuntu VM under Hyper-V with Docker, delivered stage by stage against written runbook pass criteria"
  - name: "Container deployment & operation"
    note: "Six containers in service via docker run — code forge / database / CI server and agent / dashboard / gateway; compose wouldn't install here, so the orchestration layer is deliberately absent"
  - name: "Continuous delivery"
    note: "Push to main triggering a build through a webhook is proven; the test and deploy stages still wait on a real project and are not claimed as done"
  - name: "Backup & off-site copy"
    note: "A daily scheduled script runs logical dumps plus deduplicated encrypted snapshots (keep 7 daily / 4 weekly / 6 monthly); the code mirrors out as an off-site copy, the data has no second copy yet"
  - name: "Baseline & restore drill"
    note: "A cross-project baseline table and an onboarding table — ports and routes settled before code is written; one restore drill has actually been run, a file pulled back from a snapshot and a dump restored into a scratch database and its table count read off"
  - name: "Inspection & alerting"
    note: "A home-grown check script that judges exactly three lines: disk headroom, containers not reporting Up, and no backup log within 30 hours"
  - name: "Static sites & service deployment"
    note: "This site deploys automatically via GitHub Pages; internal systems and cloud services also deployed and running"
  - name: "Linux / networking basics"
    note: "Complete hands-on: VMs, networking, storage mounts and services on Linux"
evidenceEn: "Intranet infrastructure in daily use on one physical host and its VM, with pipelines and the baseline table queryable (internal environment)"
---
