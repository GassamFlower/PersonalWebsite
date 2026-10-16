---
title: 数据标准统一与同步治理（设计端 → 企业 ERP）
order: 11
status: 内部系统
tier: feature
series: 底座
part: 数据
partEn: Data
problem: 设计端与业务系统两套编号、两套口径：物料与 BOM 靠人工誊录，慢、易错、不留痕迹，还没定型的产物可能被顺手抄进生产。真正卡住的不是接口，而是"同一个东西在两边叫什么、算什么状态、以谁为准"从来没人定过。
whatIDid: 先把"标准"落成表：两类映射（字段对字段、对象对编号）带唯一键、来源（人工定的还是机器辅助生成的）、生效与冲突状态；单位和分类走只读字典反查归一，采集侧的中性枚举（自制 / 委外 / 外购）再映射到对端编码。变更走 8 态状态机加迁移矩阵，非法迁移直接拒绝并告警。链路七个环节——发布、抽取、归一、暂存、人工审核、推送、回写——落五张表，全程可审计。推送设三道幂等防线：状态前置校验、请求指纹唯一、对端按编号判重；失败指数退避、断点续推。反向再补一条镜像：三个定时任务分页把物料、分类树、BOM 拉进本地库做 UPSERT，声明条数与实际写入条数不符就告警。最后出一张对账报告：一致、孤儿、缺失三类加一个一致率。
challenge: 难点是承认口径只能实测出来——跨系统字段含义靠真机数据比对对齐，不照文档猜；"看起来成功了"这种坑用 declared 与 upserted 的差值告警兜住；以及把人工审核留在链路里：机器搬运、人把关，宁可慢一步，也不让未定型的产物进生产。
outcome: 已部署内网：五张表建在统一库里，经门户单点免登闭环，对端真实组织数据已拉通核对（产品主数据上千条量级，本侧取极小样本做真机校验）。诚实边界：写链路仍受阻于对端账号会话，首批物料与 BOM 的实推没有真机跑通，目前只有只读镜像经过真机验证——所以这条案例记到"标准与链路已就位、推送待闭环"为止。
stack:
  - .NET 采集端
  - Go 服务与适配器
  - Next.js 审核门户
  - PostgreSQL
evidence: 企业内部系统，两端品牌与真实编号一律隐去
published: true
titleEn: "Data Standards Reconciliation and Sync Governance (design side to ERP)"
problemEn: "Two numbering schemes and two sets of definitions on either side: parts and BOMs were hand-copied from the design system into the ERP — slow, error-prone, leaving no trail, with an unfinished artifact free to be transcribed into production. The real blocker was never the API but the question nobody had answered: what is the same thing called on each side, which state does it count as, and which system wins."
whatIDidEn: "Turned the standard into tables first: two kinds of mapping (field to field, object to number), each with a unique key, its provenance — decided by hand or drafted by a machine — and an active/conflict status. Units and categories normalise through read-only dictionary lookups; neutral enums from the collector (in-house / outsourced / purchased) then map onto the other side's codes. Changes run through an eight-state machine with a transition matrix; an illegal transition is refused and raises an alert. The pipeline has seven stages — release, extract, normalise, stage, human review, push, write-back — over five tables, auditable end to end. Pushing is guarded three times over: a state pre-check, a unique request fingerprint, and de-duplication by number on the far side; failures back off exponentially and resume where they stopped. A reverse mirror completes it: three scheduled jobs page parts, the category tree and BOMs into a local database with upserts, and an alert fires whenever the declared row count disagrees with the rows actually written. It closes with a reconciliation report: matched, orphaned, missing, plus one agreement rate."
challengeEn: "The hard part was admitting that definitions can only be measured — cross-system field meanings were aligned by comparing real machine data, not by trusting the documentation. The 'it looked like it worked' trap is caught by alerting on the gap between declared and upserted. And human review stays inside the loop on purpose: machines carry, people decide, one step slower, so that nothing unfinished reaches production."
outcomeEn: "Deployed on the intranet: the five tables live in the shared database, single sign-on through the portal is closed-loop verified, and real organisational data from the far side has been pulled through and reconciled (product master data in the low thousands, checked here against a deliberately tiny sample). Honest edge: the write path is still blocked by the counterparty's account session, so the first part and BOM push has not been proven on real hardware — only the read-only mirror has. This case therefore stops at 'standards and pipeline in place, push still to close'."
stackEn: [".NET collector", "Go service and adapter", "Next.js review portal", "PostgreSQL"]
---

机器搬运、人把关、口径先定、账对得平。

两端的企业名、系统品牌与真实编号一律不出现。
