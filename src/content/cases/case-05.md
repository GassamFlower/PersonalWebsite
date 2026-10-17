---
title: 内网基础设施与交付基线
order: 5
status: 内部系统
tier: feature
series: 底座
part: 地基
partEn: Foundation
problem: 没有公共云可依赖：代码、发布、备份、跨系统接入全要自己闭环，从选型配网到上线维护都是同一个人；更要紧的是环境只靠「我记得」，别人接不住。
whatIDid: 两台宿主机起步（一台跑容器与业务面，一台做网络出口）：虚拟化层与容器宿主按六份阶段手册（P1–P6）逐段落门，每份先写过门标准再落验收结论；一个网关收拢全部入口，5 份编排拉起 14 个服务，推代码即走构建—测试—部署；真正的交付是三份治理件——基线表、接入清单、审计脚本。
challenge: 难点不在装软件，在把取舍写成结论：不加密、不开公网是裁决不是遗漏，写进表里才没人再补一遍；关系库的数据目录得独占块设备——放到网络盘上，锁语义会出问题，这条是踩过才知道的。基线也要能推翻自己：8 条偏离里 3 条改的是约定。
outcome: 多个在用系统跑在这套流水线上，端口与命名有唯一真源可查。诚实边界：备份已成脚本（每日定时 + 去重加密快照 + 保留策略），恢复演练做过一次——从快照取回文件、把逻辑备份恢复进一座空库数出全量表数；备份卷与数据卷同在一块阵列上，是逻辑隔离不是物理隔离，第二份仍靠镜像到外部仓。
stack:
  - Ubuntu + Docker
  - nginx 子路径网关
  - Gitea + Woodpecker CI
  - PostgreSQL 独立库与专属角色
  - Portainer
  - restic 去重加密快照
evidence: 企业内部环境，主机、地址、账号与密钥一律隐去；阶段手册与逐项验收结论留档
published: true
titleEn: "Intranet Infrastructure and Delivery Baseline"
problemEn: "No public cloud to lean on: code, databases, releases, backups and cross-system onboarding all had to close in-house, with one person choosing tools, wiring the network, shipping and maintaining. Sharper still, an environment that lives only in one head can't be handed over."
whatIDidEn: "Started from two hosts — one carrying containers and the business surface, one acting as the network egress. The virtualisation layer and the container host were stood up through six staged runbooks (P1 to P6), each one written with its own pass criteria before the acceptance result was recorded against it. One gateway gathers every system entry, five manifests bring up 14 services, and a push runs build → test → deploy. The real deliverable is three governance artefacts — a baseline table, an onboarding checklist, a runnable audit script."
challengeEn: "Installing software wasn't the hard part; writing trade-offs down as conclusions was. No transport encryption and no public entry is a ruling, not an oversight — recorded so nobody quietly re-does it. A relational data directory has to own a block device: put it on a shared network filesystem and the locking semantics quietly corrupt it, a lesson learned by stepping on it. And the baseline must be able to overrule itself: three of the eight recorded deviations change the baseline."
outcomeEn: "Several internal systems in daily use run on these pipelines, with ports and naming held to one queryable source of truth. Honest edge: backups are now scripted — a daily schedule, deduplicated encrypted snapshots, a retention policy — and one restore drill has actually been run, pulling a file back from a snapshot and restoring the logical dump into a scratch database to read the table count off it. The backup volume and the data volume still sit on one array though, which is logical rather than physical separation, so the second copy depends on mirroring out to an external forge."
stackEn: ["Ubuntu + Docker", "nginx sub-path gateway", "Gitea + Woodpecker CI", "PostgreSQL per-project database and role", "Portainer", "restic deduplicated encrypted snapshots"]
evidenceEn: "Internal corporate environment: hosts, addresses, accounts and secrets all withheld; the staged runbooks and their per-item acceptance results are kept on file"
---

把"没有现成基础设施"这件事，从选型、配网一直做到有基线可查、有审计可跑。

内部环境，主机、地址、账号、密钥与企业背景一律隐去。
