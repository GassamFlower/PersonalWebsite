---
title: 内网私有化开发运维平台
order: 5
status: 内部系统
problem: 一家企业内部要自己管代码、数据和发布流程，却缺一套能自持、可闭环的开发运维基础设施。
whatIDid: 从零搭起一台"私有化开发运维平台"：用一台物理机 + 一套虚拟化 + 容器运行时，把私有 Git 代码仓、数据库、CI/CD、容器面板、业务网关、加密备份与监控全部自建在内网。
challenge: 在没有现成公共云可依赖的内网里，选型、配网、存储隔离都要自己闭环，关键数据还要落到独立块设备。
outcome: P0–P6 各阶段全验收通过：「推代码 → 自动构建 → 备份 → 可恢复」整条链路实测跑通，含一次完整的恢复演练；平台长期自持、可复现、带文档。
stack:
  - Hyper-V + Ubuntu VM + Docker
  - 私有 Git 仓（Gitea）+ GitHub 镜像
  - PostgreSQL / Woodpecker CI / Portainer
  - nginx 网关 / restic 加密备份与监控
evidence: 企业内部系统，细节脱敏
# image: /cases/case-05.png
# imageAlt: 内网私有化开发运维平台的脱敏示意
published: true
titleEn: "Self-hosted Private DevOps Platform (internal)"
problemEn: "The company wanted to own its code, data and release flow, but lacked self-sustaining, closed-loop dev-ops infrastructure."
whatIDidEn: "Built the whole private dev-ops platform from scratch: one physical machine + virtualization + container runtime, self-hosting a private Git forge, database, CI/CD, container dashboard, business gateway, encrypted backups and monitoring entirely on the intranet."
challengeEn: "In an intranet with no public cloud to lean on: tool choices, networking and storage isolation all had to close the loop in-house, with key data landing on its own block device."
outcomeEn: "Stages P0–P6 all passed acceptance: the chain push → build → backup → restorable proven end to end, including one full restore drill; the platform runs self-sustaining, reproducible and documented."
stackEn: ["Hyper-V + Ubuntu VM + Docker", "Private Git forge (Gitea) + GitHub mirror", "PostgreSQL / Woodpecker CI / Portainer", "nginx gateway / restic encrypted backup + monitoring"]
---

把"没有现成基础设施"这件事，从选型到备份可恢复，完整地搭成一套能落地的私有开发运维平台。

内部基础设施项目，地址、账号、密钥与企业背景一律隐去。