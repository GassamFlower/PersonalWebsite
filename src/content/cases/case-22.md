---
title: 清债工作台（本地单机）
order: 22
status: 开发中
tier: minor
problem: 手工清债靠表格与记忆：欠多少、先还哪笔、这个月能分多少，改一次全表重算，算错了还查不出来。
whatIDid: 把方法做成一台本地工作台：Go 单文件服务 + SQLite 单文件库，Vue 3 界面；负债台账、还款流水、结清与冲正、总览红线、月度分流、快照趋势与导入导出。
challenge: 钱的口径不允许含糊：金额存整数分、利率用基点，剩余本金按流水求和，冲正只允许一次；数据只留本机。台账与还款第一轮已通过，业务门仍在推进。
stack:
  - Go 1.26 / Gin / GORM
  - SQLite（纯 Go 驱动）
  - Vue 3 / Element Plus
stackEn: ["Go 1.26 / Gin / GORM", "SQLite (pure-Go driver)", "Vue 3 / Element Plus"]
published: true
titleEn: "Debt Payoff Workbench (Local, Single-user)"
problemEn: "Manual debt payoff lived in spreadsheets and memory: how much is owed, which debt to clear first, how much can be allocated this month — every edit recalculated the whole sheet, and a wrong figure was impossible to trace."
whatIDidEn: "Turned the method into a local workbench: a single Go binary and a single SQLite file behind a Vue 3 interface — debt ledger, repayment records, settlement and reversal, overview red lines, monthly allocation, snapshot trends and import/export."
challengeEn: "Money leaves no room for loose definitions: amounts in integer cents, rates in basis points, remaining principal summed from the ledger, reversal allowed once only — and the data never leaves the machine. The ledger and repayment first rounds passed; the business gate is still moving."
---
一座只在本机跑的账本：每笔钱从哪来、到哪去，改过什么，都留得下。
