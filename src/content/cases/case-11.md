---
title: 数据标准统一与同步治理（设计端 → 企业 ERP）
order: 11
status: 内部系统
tier: feature
series: 底座
part: 数据
partEn: Data
problem: 设计端与业务系统两套编号、两套口径：物料与 BOM 靠人工誊录，出错不留痕，未定型的产物还可能被抄进生产。卡住的不是接口，是「同一个东西以谁为准」没人定过。
whatIDid: 先把口径落成映射表——来源与冲突留痕，非法变更直接拒绝；采集到回写全程可审计，反向镜像定时拉对端数据、条数不符即告警。
challenge: 难点是承认口径只能实测：字段含义靠真机数据比对，不照文档猜；「看起来成功了」这种坑，用声明数与实际写入数的差值告警兜住。
outcome: 已部署内网，对端上千条真实主数据拉通核对。诚实边界：首批实推受阻于对端账号，没跑通——这条停到「标准与链路就位、推送待闭环」。
stack:
  - .NET 采集端
  - Go 服务与适配器
  - Next.js 审核门户
  - PostgreSQL
evidence: 企业内部系统，两端品牌与真实编号一律隐去
published: true
titleEn: "Data Standards Reconciliation and Sync Governance (design side to ERP)"
problemEn: "Two numbering schemes and two sets of definitions: parts and BOMs were hand-copied from the design system into the ERP — error-prone, leaving no trail, with an unfinished artifact free to reach production. The blocker was never the API but a question nobody had answered: which system's version wins."
whatIDidEn: "Turned that question into mapping tables first — provenance and conflicts recorded, illegal changes refused, the pipeline from collection to write-back kept auditable, and a reverse mirror that pulls the far side's data on a schedule and alerts when counts disagree."
challengeEn: "The hard part was admitting that definitions can only be measured: field meanings were aligned by comparing real data, never by trusting documentation, and the 'it looked like it worked' trap is caught by alerting on the gap between declared and actually-written rows."
outcomeEn: "Deployed on the intranet, with over a thousand real master-data records from the far side pulled through and reconciled. Honest edge: the first real push is still blocked by the counterparty's account, so this case stops at 'standards and pipeline in place, push still to close'."
stackEn: [".NET collector", "Go service and adapter", "Next.js review portal", "PostgreSQL"]
---

机器搬运、人把关、口径先定、账对得平。

两端的企业名、系统品牌与真实编号一律不出现。
