---
intro: 我不生产消息，只决定哪条消息值得往前送。演示视频不算证据，能跑起来的才算。
introEn: "I do not produce the news. I decide which piece of it is worth passing on. A demo video is not evidence; code that runs is."

gates:
  - 复现门
  - 成本门
  - 维护门
  - 边界门
gatesEn:
  - Reproduction
  - Cost
  - Maintenance
  - Boundary

gateQuestions:
  - 有没有第三方能复现的证据？
  - 十倍规模时，账单是什么形状？
  - 出问题的时候，谁在现场？
  - 它在什么条件下不成立？
gateQuestionsEn:
  - Is there evidence a third party can reproduce?
  - At ten times the scale, what shape does the bill take?
  - When it breaks, who is on site?
  - Under what conditions does it stop holding?

gateCriteria:
  - 演示视频不算，能跑起来的代码才算。
  - 看账单是线性增长，还是灾难式增长。
  - 有人负责但没有权限，等于没人负责。
  - 说不出边界的，基本等于没做过。
gateCriteriaEn:
  - A demo video does not count; code that runs does.
  - Whether the bill grows linearly, or catastrophically.
  - Someone accountable without access means no one is accountable.
  - If you cannot state the boundary, you probably have not done it.

ledgerNote: 档案从第一条开始记。跑完一条写一条，没跑完不写结论；拦下的也记，不删。
ledgerNoteEn: "The record starts with the first entry. One entry per completed review; no conclusions before it is done. Blocked items are recorded too, not deleted."

blockedReasons:
  - 通稿改写
  - 数字对不上
  - 只有情绪，没有事实
blockedReasonsEn:
  - Rewritten press release
  - Numbers do not match
  - Emotion only, no facts
---

四道门区的真源（品牌策划 1.2/1.3）。`gates` / `gateQuestions` / `gateCriteria` 各 4 条，
与 `*En` 逐条对应，条数由 `scripts/check-content.mjs` 规则⑧守卫。

账本两张表：通过表（热词 × 四门 → 判定）与拦截表（条目 / 理由 / 复判条件）。
理由分类取自品牌策划 2.1 的那条示例记录，不是新造的类目。

账本不存数字：有真实过门记录之前，页面只显示空态与提交入口，不写任何拦截数量。

