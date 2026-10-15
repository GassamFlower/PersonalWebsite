---
title: 视频批量混剪 Web 平台
order: 4
status: 开发中
tier: minor
problem: 需要批量处理视频（加字幕、贴片、转码）时，逐条手工操作极其耗时。
whatIDid: 独立做了一个视频批量处理 Web 平台：FastAPI 后端按 auth / tasks / workspaces / ws 分路由，接 ASR 引擎做字幕，前端模块化构建，并支持一键打包分发。
challenge: 一期把注册登录、任务与错误提示这条最短链路做完并通过自测；二期仍停在计划里——项目暂时归档，没有把它写成已完成。
outcome: 一次配置即可跑一批视频处理任务。
stack:
  - 独立 Web 平台
  - 批量字幕 / 贴片
evidence: 技术侧实操平台
# image: /case-04.png
# imageAlt: 视频批量混剪平台的示意
published: true
titleEn: "Batch Video Editing Web Platform"
problemEn: "Batch video processing (subtitles, overlays, transcoding) was painfully slow done one clip at a time by hand."
whatIDidEn: "Independently built a batch video-processing web platform: a FastAPI back end split into auth / tasks / workspaces / ws routes, an ASR engine for subtitles, modular front-end builds, and one-command packaging for distribution."
challengeEn: "Phase one finished the shortest path — sign-up and login, task handling and error messaging — and passed self-checks; phase two is still only a plan. The project is archived for now rather than described as done."
outcomeEn: "One configuration runs a whole batch of video jobs."
stackEn: ["Standalone web platform", "Batch subtitles / overlays"]
---

把"一条条手工攒视频"的重复劳动，做成能批量跑的流水线。
