---
title: 多智能体运营中枢（文旅景区）
order: 15
status: 演示案例
tier: minor
problem: 文旅景区的运营想试一把「多个 AI 智能体分工干活」，缺一个能编排、能看运行状态、还不敢让它乱来的中枢。
whatIDid: 搭起多智能体运营中枢 Demo：状态图编排加人在环，检索侧用 BM25 与向量的混合召回再重排（分块 500、重叠 50），规划侧交给分工智能体；管理后台四个标签页、15 个 API、知识库与景区配置、热门问答与未命中回流 FAQ 都跑通，容器化可演示。
challenge: 安全边界是设计的重点：票价查询强制走工具接口，资金类动作一律禁止由 AI 触发，置信度低于 60% 转人工，3 秒超时即降级。基础展示到位，是否投产把判断留给业务。
titleEn: "Multi-Agent Operations Hub (Culture & Tourism)"
problemEn: "A culture-and-tourism operator wanted to try 'several AI agents splitting the work', with no console that could orchestrate them, watch them, and keep them from acting on their own."
whatIDidEn: "Built a multi-agent operations hub demo: a state-graph orchestration with human-in-the-loop, retrieval using hybrid BM25 + vector recall with reranking (500-token chunks, 50 overlap), planning handed to role-divided agents. The admin console runs four tabs and 15 APIs, with knowledge base, venue configuration, top questions and unmatched-query feedback into FAQ all working, containerized for showcase."
challengeEn: "Safety boundaries were the design focus: fare lookups must go through the tool API, AI is flat-out forbidden from money actions, confidence below 60% hands off to a human, and a 3-second timeout degrades gracefully. The showcase is done; going to production is left as a business call."
---

验证「智能体编队」在真实运营场景里长什么样，越界的事一律不做。
