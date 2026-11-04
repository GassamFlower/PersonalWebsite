---
title: 法律费用计算器小程序
order: 21
status: 开发中
tier: minor
problem: 法律费用的计算规则散在法规与地方口径里，当事人和经办人各算一遍，数字对不上，也说不清依据。
whatIDid: 把九类费用做成微信原生小程序：6 个页面、9 个计算器、85 个字段；规则核心写成可在 Node 里跑的纯函数，136 个测试覆盖边界。
challenge: 规则要能追溯到条文，数据只留本机；136 个测试全绿，但主体、备案、界面实测与律师复核未就绪，上线门仍阻塞。
stack:
  - 微信小程序（原生）
  - JavaScript
  - node:test
stackEn: ["WeChat mini program (native)", "JavaScript", "node:test"]
published: true
titleEn: "Legal Fee Calculator Mini Program"
problemEn: "Legal-fee rules live scattered across statutes and local practice: the claimant and the clerk each compute it once, the numbers disagree, and neither can point to the basis."
whatIDidEn: "Turned nine fee calculators into a native WeChat mini program: six pages, nine calculators, 85 fields, with the rule core written as pure functions runnable in Node and 136 tests covering the edges."
challengeEn: "Every rule has to trace back to its clause, and data stays on the device. All 136 tests are green, but the filing entity, registration, on-device checks and lawyer review are not ready — the launch gate is still blocked."
---
九类费用算成同一条口径，数字能对上，依据也说得清。
