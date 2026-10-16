---
title: 工程用车助手
order: 1
status: 已上线
tier: feature
problem: 一家做混凝土运输的企业，工程用车的调度与登记靠纸质单据：车此刻在哪个项目上、这一趟谁批的、油费和维修花在哪，事后没人说得清，也无从追溯。
whatIDid: 从谈需求到上线交付全程独立完成，一个跑在手机上的用车助手：实时看板、拍照录入、批量录入、项目花名册、人员与车辆档案、角色权限、用户审核、加油与维修记录共 17 个页面，把出车—审批—记录串成一条可查的流水。
challenge: 现场没人会认真填表，所以录入贴着现场做：车牌与单据拍照即填，表格识别优先、识别失败自动回退高精度通用识别；统计只认已审核的数据，拍照与批量两条入口分开计口径，避免同一趟车被记两次。
outcome: 已上线，真实用户在日常使用。每台车在哪个项目、由谁审批、油费与维修花在哪，都能在手机上查到出处。
stack:
  - 微信小程序
  - 云开发
  - OCR
evidence: 真实交付案例，企业信息已匿名化
# 放真实脱敏截图到 public/cases/ 后，把下面两行 image/imageAlt 改为真实路径即可显示实图
# image: /cases/case-01.png
# imageAlt: 工程用车助手的脱敏示意
published: true
titleEn: "Workshop Vehicle Dispatcher"
problemEn: "A concrete-transport company ran engineering-vehicle dispatch and registration on paper: which site a truck was on, who approved a trip, where fuel and repair money went — afterwards nobody could say, and nothing was traceable."
whatIDidEn: "Worked solo from requirements talk to delivery: a phone-side vehicle-use assistant with 17 screens — live dashboard, photo entry, bulk entry, project roster, people and vehicle files, role permissions, user review, fuel and repair records — chaining trip → approval → record into one queryable flow."
challengeEn: "Nobody fills forms properly on a job site, so entry was built around the site itself: photograph a plate or a slip and it fills in — table recognition first, automatic fallback to high-accuracy general recognition on failure. Only approved records count toward statistics, and the photo and bulk entries keep separate tallies so one trip never gets counted twice."
outcomeEn: "Live, in daily use by real users. Which site each vehicle is on, who approved it, and where fuel and repair costs went — all queryable on a phone, with a source behind each answer."
stackEn: ["WeChat mini program", "CloudBase", "OCR"]
---

从谈需求到上线交付，一个人做完。具体企业信息对公开版隐去。
