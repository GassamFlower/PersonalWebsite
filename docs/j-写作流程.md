# j — 写作流程（个人创作管线契约）

> 立项：2026-10-15 v7 叙事改向（v6 图鉴 §13.5）。写作区已在首页占位（图版 04），真源为空时显示诚实空态。
> 本文件只定契约与管线，不含任何代笔内容。

## 1. 生命线（诚实红线延伸条款）

- 文章是**用户本人的经历与观点**，AI 只做编辑（结构、双语 *En 字段、标点字距），**不做代笔**。
- 空态「第一篇在写」可以长期挂着；用假内容填充区块 = 直接违反宪法诚实红线。

## 2. 管线（每篇五步）

1. **选题**：来自月度复盘（growth 区）里已经发生的事，或 X 日历发布后反响好的条目反哺。
2. **初稿**：用户口述或打字， raw 即可，不追求成稿。
3. **编辑**：AI 整理结构、修标点、补 `titleEn/summaryEn` 对照，交用户逐条裁决。
4. **定稿落盘**：写入 `src/content/writing/YYYY-MM-slug.md`，用户确认为本人观点后发布。
5. **守卫**：`npm run build` 全链路（字体 `--check` 自动覆盖新字；写作区 *En 覆盖率规则**待第一篇落地时**并入 `scripts/check-content.mjs`——当前目录为空，不挂空守卫）。

## 3. md 契约（frontmatter + body）

```yaml
---
title: 文章标题
date: "2026-10"          # 排序键，YYYY-MM 或 YYYY-MM-DD；文件名前缀须等于它
summary: 一句话摘要（列表页显示）
titleEn: "Title"
summaryEn: "One-line summary"
slug: four-gates           # 子页 URL 段：ASCII 小写加连字符，全目录唯一（守卫拦）
published: false         # 可省；压稿时置 false，页面与字体子集都不收它
bodyEn: |
  英文正文放这里，块式标量（缩进两格），段间空行。
  渲染器只认三种块：## 小标题、- 列表项、普通段落。
---

中文正文直接写在闭合 --- 之后，同样只允许 ## / - / 段落。
```

- **行内语法一律禁用**：加粗、行内代码、链接、图片、引用、表格、非 `##` 的标题层级——`scripts/check-content.mjs` 规则④当场拦（中英文正文都扫），因为渲染器只认那三种块，别的语法会原样吐到页面上。
- 判别键：`title + date + summary + slug` 四齐即入写作区（`site-react/src/lib/content.ts getWriting()`）；缺任一条既不上卡片页也不发射子页。
- 英文正文的落法在 v8.3 由「单行标量」改为「块式标量」（单行写两千字没法维护）；守卫 `block()` 认 `bodyEn: |`，同时兼容旧单行式。
- `slug` 在 v8.5 起**必填**（子页路径要用，且发布后不可随意改——改了等于换 URL）。命名：小写字母数字加单个连字符，不以连字符开头结尾，长度 ≤40；同一目录内不许重复；`en` 保留不用（它是语言段，撞进来 `/en/writing/<slug>/` 的解析会两头不是人）。四条都由 `check-content.mjs` 规则④ 拦。

## 4. 渲染契约（v8.5 改版：卡片 + 静态子页）

宪法 §1.2（2026-10-17 用户批准）放开「构建期预渲染的静态子页」，写作区由「页内 `<details>` 展开」改为**卡片列表 + 每篇一个子页**。

**页面与路径**

| 面 | 路径 | 发射方 |
|---|---|---|
| 中文主页 | `/PersonalWebsite/` | `prerender.mjs` |
| 英文主页 | `/PersonalWebsite/en/` | 同上 |
| 文章子页（中） | `/PersonalWebsite/writing/<slug>/` | 同上，逐篇发射 `dist/writing/<slug>/index.html` |
| 文章子页（英） | `/PersonalWebsite/en/writing/<slug>/` | 同上 |

- **无路由库**：`site-react/src/lib/routes.ts` 只做一次 `location.pathname` 去 base、去尾斜杠的字符串解析；SSR 侧由 prerender 显式传 route，两边共用同一个解析函数，避免水合不一致。
- 卡片整体是一个原生 `<a>`（键盘可达、无 JS 也能进子页），卡内只渲染 `date + title + summary` 三个真源字段，不加配图、不加标签、不加悬停堆料。
- 子页渲染：日期 + 标题 + 正文（`##` 小标题、段落、列表），语言副本互链（同一篇的中英页互相指向），并提供「回写作区」链接；**不挂 SiteNav**（首页锚点在子页上没有落点，宁可少一条导航也不能给死链）。
- 每个子页的正文写进自己的初始 HTML（§17）：无 JS 时卡片→子页→读完全文整条路径都走得通。
- 子页 head 逐页生成：`title`／`description` 用本篇的标题与摘要，`canonical`／`og:url` 指向本篇路径，`hreflang` 成对指向另一语言同篇，`og:locale` 按语言分 `zh_CN`/`en_US`。分享图暂用站点级 `og.png`（每篇配图属后续批，不假造配图）。

**字体口径（子页同样适用）**

- `scripts/fonts.mjs` 递归扫 `dist/**/*.html`，**子页自动进入取字面**。衬线面只有各页 `title` 与 `##` 小标题；正文与摘要一律 `data-font="sans"` 走系统 sans，写多长都不涨字体字节。
- 由此得到一条实用结论：**发布新文章通常只需把标题与小标题的汉字收进已有码位档**（v8.4 实测：初稿只缺「十」一字，改写作「14 个阶段」即零字体产物）。真要新增码位，就必须在没有他路未提交 content 改动时重跑 `node scripts/fonts.mjs`。

**空态**：`writing/` 无已发布条目时，渲染 `ui.ts writing.empty` 一行 + `src/content/writing-plan.md` 的实质块（见 §4′）；一旦有文章上页，排期块按设计让位。

**实现落点**（改多页只动这五处，别处不复制路径规则）

| 处 | 职责 |
|---|---|
| `site-react/src/lib/routes.ts` | `routeFromPath` / `homePath` / `postPath`，路径口径唯一来源 |
| `site-react/src/lib/content.ts` | `getWriting()` 判别键、`getPost(slug)`、`getPostMeta(slug, locale)`（子页 head 字段） |
| `site-react/src/entry-server.tsx` | `render(locale, route)` + `postSlugs()` / `postMeta()` 供发射 |
| `site-react/scripts/prerender.mjs` | 页面清单 = 主页 2 张 + 每篇 2 张；`applyHead()` 逐页改写 head |
| `site-react/src/components/Post.tsx` | 子页版面（`Post.module.css`）；主页侧只剩 `Writing.tsx` 的卡片列表 |

新增一面（如案例详情页）就在页面清单里多 push 一条 `{ kind, locale, path, route, title, description }`，并在 `routes.ts` 加一条解析分支——不要在组件里拼 URL。

## 4′. 空态实质块（v8.3 落，v8.5 改版后仍适用）

- 首页写作区显示：卡片列表，按 date 倒序；卡内 月份（mono）+ 标题（衬线）+ 摘要（sans），整卡是一个 `<a>` 指向本篇子页。
- 空态一行文案来自 `ui.ts writing.empty`（双语，衬线）。
- 文章数 = 0 时，空态之下再渲染**实质内容块**：这一区放什么＋为什么还空着＋排期中的选题。真源 = `src/content/writing-plan.md`（`why` / `planLabel` / `topics` 各配 `*En`，由 `scripts/check-content.mjs` 规则⑥守卫条数一一对应）。
  - 整块 `data-font="sans"` 走系统 sans，**不进衬线子集**：加删选题不撑破字体产物。改回衬线必须同时删那个标记，否则线上缺字。
  - 第一篇真文章落地后，本块自动让位给文章列表（`pieces.length === 0` 才渲染）。
- **本块只写「打算写什么」与「为什么空着」，不得用来假装文章存在**——它是空态的说明，不是内容替代品。

## 5. 建议选题池（候选，素材必须是用户真实经历；已上页的四条以 `writing-plan.md` 为准）

- 把本站从 v4 做到 v6 双语上线的全过程（素材：growth 区 + PROJECT_STATUS）
- 五级项目体系 / 四门禁是怎么用在自己身上的
- 中文衬线自托管子集化的实测坑（806 kB vs 122 kB 的取舍）
- 一台物理机搭内网开发运维闭环：P0–P6 验收都验了什么

## 6. 第一篇欠作者本人的三处（2026-10-17 从正文移出）

这三段原先以「（待你口述 · 一/二/三）」的形式留在 `src/content/writing/2026-10-四道门.md` 正文里，
会原样渲染给读者。按「AI 做编辑不做代笔」的红线，它们属于流程台账，不属于页面。等用户口述后
再作为正式段落写回正文（中文进 body，英文进 bodyEn，两边同时补）。

1. 第一次被「基本完成」骗到是哪一年、什么活、那件事后来怎么收场。
2. 发现体系自己那几个窟窿时是怎么想的：改，还是就这样放着，为什么。
3. 孵化不超过三个、同时开工不超过两到三这两条上限破过几次；哪一次选择不按门禁直接推进，结果是好的还是坏的。
