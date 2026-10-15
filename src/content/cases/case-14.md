---
title: 数据标注平台（工作台 + 运营后台）
order: 14
status: 开发中
tier: minor
problem: AI 训练数据的生产缺一条完整流水线——任务分发、在线标注、质量审核、数据导出各散一处。
whatIDid: 先立架构再写代码：标注工作台、API 服务与运营管理后台三端的结构、角色分工与数据流按 Node.js/TypeScript 一条线设计清楚，目前落到了可运行的骨架版本。
challenge: 三端由一条 Node.js/TypeScript 线贯穿，架构、角色分工与数据流先画清；任务分发、质检与导出仍在补，目前是能跑的骨架。
titleEn: "Data Labeling Platform (Workbench + Ops Console)"
problemEn: "Producing AI training data lacked one continuous pipeline — task dispatch, labeling, quality review and export all scattered."
whatIDidEn: "Architecture first, code second: the structure, role split and data flow for three fronts — labeling workbench, API service and operations console — designed along one Node.js/TypeScript line, currently brought down to a runnable skeleton release."
challengeEn: "All three fronts run along one Node.js/TypeScript line, with architecture, role split and data flow drawn out first; task dispatch, QC and export are still being filled in — today it is a runnable skeleton."
---

把标注生产从手工零活做成有流程有质检的工程，从骨架开始。
