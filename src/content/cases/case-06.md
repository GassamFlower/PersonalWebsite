---
title: 数字文博小程序（门票预约与核销）
order: 6
status: 已上线
tier: minor
problem: 一处文旅场馆缺线上化能力——门票售卖、入馆核销、文化内容展示散落在线下流程里。
whatIDid: 独立搭起微信小程序 + 管理后台 + 云函数的整套系统（12 个小程序页面、31 个云函数）：门票售卖、预约、入馆核销、内容浏览、邀请码与用户管理。
challenge: 涉及钱的链路只用真机验证：支付按 APIv3 接口接通，用一分钱实测走完下单—支付—回调—核销；核销用版本号乐观锁防并发重复入场，管理端鉴权 fail-closed，删除走软删并留审计痕迹。
titleEn: "Digital Museum Mini Program (Ticketing & Check-in)"
problemEn: "A culture-and-tourism venue had no online capability — ticket sales, entry check-in and cultural content all lived in offline processes."
whatIDidEn: "Built the whole system solo: mini program, admin console and cloud functions (12 mini program pages, 31 cloud functions) covering ticket sales, reservation, entry check-in, content browsing, invite codes and user management."
challengeEn: "Anything touching money was only believed on a real device: payments wired through the APIv3 interface and a one-cent payment walked the full order → pay → callback → check-in path; check-in uses a version-number optimistic lock so concurrent entries can't double-scan, admin auth is fail-closed, and deletes are soft with an audit trail."
---

一个小程序把「买票—预约—入馆—看内容」整条游客动线搬上线，管理侧在同一后台收口。
