---
title: 内网基础设施与交付基线
order: 5
status: 内部系统
tier: feature
featured: true
series: 底座
part: 地基
partEn: Foundation
problem: 没有公共云可依赖：代码、发布、数据库、备份全要自己闭环，从配网到维护都是同一个人。更要紧的是环境只靠「我记得」，别人接不住。
whatIDid: 一台物理机起步：Hyper-V 虚机跑 Ubuntu 与 Docker，6 个在用容器，nginx 网关收拢入口，推代码即触发构建；六份阶段手册逐段落门。
challenge: 难点不在装软件，在把取舍写成结论——内网不加密、不开公网是裁决不是遗漏，写进表里才没人再补一遍；数据目录必须独占块设备，这条踩过才知道。
outcome: 多个在用系统跑在这套流水线上。诚实边界：恢复演练实测过一次，但备份卷与数据卷同在一块阵列，第二份只有代码出了外部仓。
stack:
  - Hyper-V + Ubuntu + Docker
  - nginx 子路径网关
  - Gitea + Woodpecker CI
  - PostgreSQL 独立库与专属角色
  - Portainer
  - restic 去重加密快照
evidence: 企业内部环境，主机、地址、账号与密钥一律隐去；阶段手册与逐项验收结论留档
published: true
titleEn: "Intranet Infrastructure and Delivery Baseline"
problemEn: "No public cloud to lean on: code, releases, the database and backups all had to close in-house, from wiring the network to maintaining it — one person doing both. Sharper still, an environment that lives only in one head can't be handed over."
whatIDidEn: "Started from a single physical machine: an Ubuntu VM on Hyper-V running Docker with six containers in use, one nginx gateway gathering every entry, a push that triggers the build, and six staged runbooks gated one after another."
challengeEn: "Installing software wasn't the hard part; writing trade-offs down as conclusions was. No transport encryption and no public entry is a ruling, not an oversight, recorded so nobody quietly re-does it — and a data directory has to own a block device, a lesson learned by stepping on it."
outcomeEn: "Several systems in daily use run on these pipelines. Honest edge: one restore drill has actually been run, but backup and data sit on one array, and only the code has a second copy outside."
stackEn: ["Hyper-V + Ubuntu + Docker", "nginx sub-path gateway", "Gitea + Woodpecker CI", "PostgreSQL per-project database and role", "Portainer", "restic deduplicated encrypted snapshots"]
evidenceEn: "Internal corporate environment: hosts, addresses, accounts and secrets all withheld; the staged runbooks and their per-item acceptance results are kept on file"
---

把"没有现成基础设施"这件事，从选型、配网一直做到有基线可查、恢复演练实测过一次。

内部环境，主机、地址、账号、密钥与企业背景一律隐去。
