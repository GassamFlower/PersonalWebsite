---
title: 4D 数据标注辅助工具
order: 10
status: 开发中
tier: minor
problem: 4D 数据标注是重体力活：一支上百人的标注团队，画一条车道线要三分钟到五分钟，弯道处的反复校准占掉三成以上工时，拓扑关系又要占四成。
whatIDid: 用 Chrome 扩展 + 本地代理层 + AI 推理网关的三层架构做自动化预标：三点贝塞尔曲线补弯道、地面元素标准化、环岛与匝道的拓扑关系自动推导，代理层在后台静默记录操作，人工只做复核。
challenge: 约束很硬：不改动标注平台本身，只在标注员已有的浏览器工作流里把 AI 预标嵌进去。项目按技术服务合同与保密协议推进，部分模块仍在开发。
titleEn: "4D Data Labeling Assistant Tool"
problemEn: "4D data labeling is heavy manual work: a team of over a hundred labelers, three to five minutes per lane line, curve calibration eating more than 30% of the time, and topology relations another 40%."
whatIDidEn: "A three-layer tool — Chrome extension, local proxy layer and AI inference gateway — for automated pre-labeling: three-point Bézier curves for bends, standardized ground elements, auto-derived topology for roundabouts and ramps, with the proxy quietly recording operations so humans only review."
challengeEn: "The constraint is strict: the labeling platform itself is not modified — the AI pre-labeling is only embedded into the labeler's existing browser workflow. The engagement runs under a service contract and an NDA, and some modules are still in development."
---

在不改动平台的前提下给标注加自动化，人只负责复核。
