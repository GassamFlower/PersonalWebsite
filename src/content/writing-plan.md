---
why: 这一区放长文：一件活做完之后，那段塞不进案例卡的说明——当时怎么选的、哪里判断错了、后来怎么改的。文章得我自己写，AI 只帮我理结构和做英文对照；别人代笔的不是我的经历，所以这一区宁可空着等。
whyEn: "This plate holds the long pieces: the part that never fits onto a case card — how the choice was made back then, where my judgement went wrong, what I changed afterwards. The writing has to be mine; the AI only restructures it and produces the English side. Words ghost-written for me would not be my experience, so this stays empty until they are."
planLabel: 准备写的几件
planLabelEn: "In the queue"
topics:
  - 这个站怎么一路改版改到现在：每一轮改了什么、为什么改
  - 五级项目体系和四道门禁怎么用在自己身上
  - 中文衬线字体上页：整套字库与按页面实际用字裁剪之间的取舍怎么定
  - 一台物理机搭出内网开发运维闭环，阶段手册里每一道门各验了什么
topicsEn:
  - "How this site got rebuilt pass after pass — what each round changed and why"
  - "Turning a five-stage project system and its four gates on myself"
  - "Putting Chinese serif type on a page: choosing between the full font file and a subset cut to the glyphs a page actually uses"
  - "Building an intranet development and operations loop on one physical machine, and what each stage gate actually checked"
---

写作区的空态实质内容真源（docs/j §4）。`why`/`planLabel` 为单行标量，`topics` 与 `topicsEn` 条数一一对应，由 `scripts/check-content.mjs` 规则⑥守卫。

页面文案全部走系统 sans（渲染处带 `data-font="sans"`），不进衬线子集，加选题不撑破字体产物。第一篇真文章落地后，本块自动让位给文章列表。
