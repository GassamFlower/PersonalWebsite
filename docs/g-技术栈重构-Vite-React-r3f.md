# g · 技术栈重构决策（Vite + React + r3f · 第三版方案）

> 项目：Personal Website（个人网站 · 接单交付凭证）
> 门禁：本文档为「技术栈重构 · 立项门/架构门变更」建议稿，**需用户确认**后才动工。
> 上游：`docs/a-立项文档.md`（内容与 9 分区）、`docs/视觉方向-v4-墨水档案.md`（视觉准绳）、现有 Astro 实现、宪法 v0.2。
> 状态：`已确认 → 重建进行中`（9 区已迁移、prerender 已落地，构建通过；待本地浏览器视觉验证后切换部署）
> 定位：这是对既有站点的一次**技术栈重构（framework re-engineering）**，不是内容重写、不是视觉推倒——内容与 v4 视觉方向全部保留。

---

## 1. 为什么换栈（动机与代价的诚实陈述）

用户已确认：**换到 Vite + React + three.js（react-three-fiber，r3f），拥抱「经典 CSS 技术」**，
以配合对**品牌套件（brandkit）/ 设计品味前端（design-taste-frontend）/ 极简 UI（minimalist-ui）** 等手法的复现与深化。

换栈的三点真实动机：

| 动机 | 点 |
|---|---|
| **3D 深化自由** | 现有 Hero 用原生 `three`；迁移到 `r3f`（声明式、组件化）后，粒子/浮尘/鼠标风感可拆成组件、更易维护与扩展。 |
| **组件化与生态环境** | React 组件生态成熟；未来若要加 Figma 对接、复杂交互、设计系统组件，React 是主流选择。 |
| **工程化与Hot reload** | Vite 的 dev 体验与 HMR 优于 Astro 对单页交互引擎的现状。 |

### 诚实申明（不脱离宪法）
- **纯静态约束不变**：无后端 / 无数据库 / 无登录 / 无接口。React 只是**前端渲染层**，构建输出仍是纯静态 HTML/CSS/JS。
- **内容真源不变**：`src/content/` 的 md 仍在，构建时读入；**不硬编码业务文案**。
- **匿名化 / 诚实分级 / 无 JS 可读**：均不能因换栈而降级（见 §7 纪律）。
- **视觉方向不变**：v4「冷档案 / 墨黑 / INK」作为设计准绳全文保留（配色 token 平移）。

> 因此这次变更是「**换引擎、保皮相与内容**」，而不是「换肤色或换整车」。

---

## 2. 目标技术栈

| 层 | 选择 | 说明 |
|---|---|---|
| 构建 | **Vite** | 现代、快、纯静态输出（`vite build` → `dist/` 静态文件）|
| 框架 | **React 18**（+ ReactDOM）| 渲染层 |
| 3D | **three + @react-three/fiber (r3f)** | 声明式 3D；仅 Hero 高光点，克制 |
| 3D 工具（可选） | `@react-three/drei` | 常用封装（如渐变纹理/软粒子）；若用则严格限定在 3D 叶组件 |
| 样式 | **经典/传统 CSS + CSS 变量（token）** | 用户点名「传统 CSS 技术」。用 CSS Modules 做组件级作用域，配合 `:root` token。**不用** Tailwind/UI 框架（守原「样式=data」克制）。|
| 内容 | `src/content/**` md，**构建时解析**（用 `frontmatter` / `gray-matter` 等；或用 Vite 静态 import） | 保持 md 驱动 |
| 路由 | 单页长站：**不引 react-router**；9 区锚点导航原生实现 | 无需多路由 |

> **不引**：Yoga/GSAP 动效全家桶（守住克制）；全局状态库（zustand 等，暂不需要）；CSS 框架。
> **一个原则**：除 Vite+React+r3f 外，其余能力尽量用「经典 CSS + 原生 JS」，避免全家桶（对齐原选型「克制动效」精神）。

---

## 3. 目录结构（新栈映射 · 保持三分离）

```
src/
├── content/               # 内容真源（md/entry, 由构建时读入）—— 原样保留
├── assets/styles/global.css   # 设计 token（:root 变量，从原 global.css 平移，值不变）
├── app/                   # 应用渲染入口（React 挂载）
│   └── main.tsx
├── lib/                   # 读取 content 的解析工具（md → 结构化 JS 数组）
├── components/            # React 组件（9 区）
│   ├── Hero/              # 含 r3f 3D 背景（仅这里用 r3f）
│   ├── Story/
│   ├── Timeline/
│   ├── Cases/
│   ├── CapabilityMap/
│   ├── Growth/
│   ├── Principles/
│   ├── Contact/
│   ├── SiteNav/
│   ├── Footer/
│   └── ui/                # 复用小组件（.section-head / CTA / 徽章 ...）
└── App.tsx                # 组装 9 区
```

**架构原则（沿用原 `docs/e-架构设计.md`）**：
- 内容 / 展示 / 样式三分离：`content/`（数据） · `components/`（展示） · `styles/`（token）。
- 组件只展示，不写业务文案。
- `styles/` 只放设计 token + 全局基础样式，配色/字体只在这里定义。

---

## 5. 迁移映射（原 Astro 组件 → React 组件 + 3D）

| 分区 | 原 Astro | 现 React 组件 | 迁移要点 |
|---|---|---|---|
| 01 首屏 | `Hero.astro` | `Hero/` | 3D 粒子迁移为 r3f（见 §6）|
| 02 品牌故事 | `Story.astro` | `Story/` | 线稿 SVG 保留 |
| 03 做过的事 | `Timeline.astro` | `Timeline/` | 时间线真序流 |
| 04 项目案例 | `Cases.astro` | `Cases/` | 大编号/徽章/截图槽 |
| 05 技能树 | `CapabilityMap.astro` | `CapabilityMap/` | 诚实三档徽章 |
| 06 成长记录 | `Growth.astro` | `Growth/` | md 驱动 |
| 07 做事的规矩 | `Principles.astro` | `Principles/` | 四门禁流 |
| 08 联系交流 | `Contact.astro` | `Contact/` | 微信/邮箱复制 |
| 09 底部 | `Base.astro` footer | `Footer/` | 匿名声明小字 |
| 全局布局 | `Base.astro` head | `App` head + `SiteNav` | head/字体/favicon/背景 |

---

## 6. 3D（r3f）落地 —— 克制纪律

- **仅限 Hero** 一个背景层 r3f 场景，单色墨蓝，低透明。
- 用 r3f 组件声明粒子（`Points` + `PointsMaterial`）与软纹理：
  - 三层深度 / 慢自转 / 浮沉呼吸 / 鼠标风感视差 / 滚动相机微动（复用原 §7 规格）。
  - 白底用 `NormalBlending`（Additive 在白纸看不见——v4 已踩过）。
- **纪律（硬）**：
  - `prefers-reduced-motion: reduce` → **不 mount r3f Canvas**，内容全显。
  - WebGL 不可用 → 不渲染 3D，纯文本/纯 CSS 布局不破。
  - 移动端降粒 / 降 `pixelRatio`（≤1.2）。
  - 3D 永远做背景层（`position:absolute; z-index:0`），前景文字高对比可读。
  - 单色，不出现彩虹/霓虹/荧光。

---

## 5b. 上线与「先上线再深化」策略（采纳 Option A）

现有 Astro 站点已到可上线状态（结构 / 内容 / v4 视觉均就绪，仅待接 GitHub + 推 Pages 上线门）。
为满足「先上线」同时不阻塞本次重构：

- **步骤 1（先上线）**：现有 **Astro** 版**不做任何改动**，立即接 GitHub 远端 → 推 `main` → GitHub Pages 自动部署，拿到**一路可以接单的可达 URL**。此全程与本地就对换 React 版无关。
- **步骤 2（并行重建）**：在同一项目目录下，用独立目录/分支（见下「目录策略」）构建 **Vite + React + r3f** 版，逐步迁移 9 区，随时可对照。
- **步骤 3（切换上线）**：当 React 版达到既定（视觉保真 + 功能等价 + 移动端 + 动效纪律）后，再切换部署指向 React 版产物；Astro 旧版作为回退保留（`git tag`）。

> 这样既达成「先上线接单」的连续，也启动「换栈深化」，两者互不阻塞。请确认是否接受此三分案，若你更希望「只保留 React 版、Astro 直接废弃」，我按后者执行（会在§8 记你一个「待定」供选）。

---

## 7. 清晰边界（这次重构不做/推迟）

- ❌ 不改 9 分区结构（处分区需先改 `docs/a-立项文档` + 你确认）。
- ❌ 不改内容文案 / 时间线真序 / 案例排序 / 脱敏。
- ❌ 不新签名 用的视觉方向（v4 为唯一准绳）。
- ❌ 不加 `react-router` / 后台 / 登录 / 接口 / 全局状态库。
- ❌ 不冒喧哗动效、不多分区 3D、不用 JSON 当内容真源代替 md。
- ⏳ 待你据需增补：Figma 主设计稿 如你有；若你提供，可能在 **Cell组合/徽章**做像素匹配。

---

## 8. 验收自查（换栈后）

- [ ] `vite build` 出 `dist/` 纯静态可部署（GitHub Pages）
- [ ] 9 区全部渲染、锚点导航正常、复制微信可用
- [ ] 成长记录由 md 驱动、新增条目即出
- [ ] 视觉对齐 v4 色板 / 字体 / 间距（token 全平移）
- [ ] 移动端与桌面端无溢出；`prefers-reduced-motion` 时 3D 关闭、内容全显
- [ ] 匿名化 / 诚实分级无降级
- [ ] react 包体积可控（除 r3f 外不引多余 3D 全家桶）；`pixelRatio` 移动端降档

---

## 9. 「无 JS 内容可见」的实现：构建时预渲染（SSG·SSR at build）

换栈到 React 后，默认 CSR（纯客户端渲染）的产物 `#root` 是空壳——**JS 关闭时整页为空**，这违反宪法 §17 / §40「无 JS 时关键内容仍完整可见」的既有保留。为守住这条底线，React 版采用**构建期预渲染（SSR at build）**而非纯 CSR：

- `src/entry-server.tsx`：`renderToString(<App/>)`，把完整 9 区内容渲染成 HTML 字符串。
- `vite.config.ssr.ts`：产出 SSR bundle（`dist-server/entry-server.cjs`）。
- `scripts/prerender.mjs`：把渲染结果**注入 `dist/index.html` 的 `#root`**。
- 客户端 `main.tsx`：检测 `#root` 已有内容 → `hydrateRoot`（水合挂事件）；否则退化 `createRoot`（如 `vite dev` 直开）。

**结果**：`dist/index.html` 里直接含全部文案（验证过含 `工程用车助手` / `2026-08` 等 md 内容），无 JS 也整页可见——§17 保住；浏览器 JS 再承担 reveal 动画 / 复制微信 / r3f 等交互。

**纪律**：服务端渲染不做任何 effect（DOM/window/IntersectionObserver/r3f 均不在服务端跑，靠 effect 的组件服务端天然跳过）；产物**仍是无后端的纯静态 dist/**，SSR 只在构建期一次性运行，部署与 Astro 一致。

> 构建命令：`npm run build`（= `tsc` + `vite build` 客户端 + `vite build --config vite.config.ssr.ts` + `node scripts/prerender.mjs`）。

---

## 用户确认记录（2026-08 · 均已由用户选定）

| # | 决策点 | 已确认结果 |
|---|---|---|
| 1 | 上线策略 | **Astro 先上线 + React 并行重建、就绪后切换**（本文件 §5b Option A）|
| 2 | 内容真源 | `src/content/` md 保持原样、唯一内容源，构建时读入 |
| 3 | 样式 | **CSS Modules（组件级）+ 全局 CSS token**（不用纯 BEM、不用 Tailwind）|
| 4 | 品牌套件 brandkit | **文档化设计规范**（首屏标识/页脚档案章/档案编号系统落地为组件代码），不投放位图（环境无出图能力）|
| 5 | 3D 范围 | **仅 Hero** 一个 r3f 背景，不扩展到案例区 |

> 以上确认后即按 §5b 第 1 步推进上线，随后进入 React 重建。本文件即重构准绳 + 决策记录。