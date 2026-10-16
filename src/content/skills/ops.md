---
order: 6
domain: 运维与部署
level: 已交付
tagline: 从零搭过一整套自建的内网基础设施，部署、备份、审计、排障能闭环。
skills:
  - name: 私有化基础设施搭建
    note: 从零搭起内网底座（Ubuntu VM + Docker，两台宿主机按网段分工）
  - name: 容器编排与部署
    note: 5 份生产编排起 14 个服务：私有代码仓 / 数据库 / CI / 容器面板 / 网关
  - name: 持续交付
    note: 5 条流水线固定「推主分支 → 构建 → 静态检查 → 测试 → 部署」
  - name: 备份与异地副本
    note: 数据库逻辑备份按每日规程执行（保留 30 天），私有仓另设外部镜像当异地副本
  - name: 基线与审计
    note: 跨项目基线约定表 + 9 段只读审计脚本，偏离逐条回填；恢复演练尚待补可查产出
  - name: 静态站点与后端服务部署
    note: 本项目用 GitHub Pages 自动部署；内部系统与云服务均部署运行
  - name: Linux / 网络基础
    note: 在 Linux 环境部署 VM、配网、挂存储、起服务的完整实操
evidence: 两台宿主机上的内网基础设施在用，流水线与基线约定表可查（内部环境）
domainEn: "Ops & deployment"
taglineEn: "Built a whole self-hosted intranet infrastructure from scratch; deployment, backup, auditing and troubleshooting as a closed loop."
skillsEn:
  - name: "Private infrastructure build-out"
    note: "Intranet foundation built from scratch (Ubuntu VM + Docker, two hosts split by network segment)"
  - name: "Container orchestration & deployment"
    note: "14 services across 5 production manifests — code forge / database / CI / dashboard / gateway"
  - name: "Continuous delivery"
    note: "Five pipelines fixing push-to-main as build → static check → test → deploy"
  - name: "Backup & off-site copy"
    note: "Daily logical DB backups on a documented 30-day routine; the private forge mirrors out as an off-site copy"
  - name: "Baseline & audit"
    note: "Cross-project baseline table plus a nine-section read-only audit script, deviations written back; a restore drill with verifiable output is still to come"
  - name: "Static sites & service deployment"
    note: "This site deploys automatically via GitHub Pages; internal systems and cloud services also deployed and running"
  - name: "Linux / networking basics"
    note: "Complete hands-on: VMs, networking, storage mounts and services on Linux"
evidenceEn: "Intranet infrastructure on two hosts in daily use, with its pipelines and baseline table queryable (internal environment)"
---
