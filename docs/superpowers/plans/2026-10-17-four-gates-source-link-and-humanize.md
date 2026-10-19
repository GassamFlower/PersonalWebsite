# 「四道门」加出处链接 + 正文去 AI 味 实现计划

**目标：** 给写作区第一篇《四道门》补一条可达的仓库出处链接，并把中英文正文里残留的编辑自指话术与 AI 句式清掉，不新增任何事实。

**架构：** 链接走 md frontmatter 真源 → `WritingData` → `Post.tsx` 一条 `<a class="ink-link">`；正文改动全部落在 `src/content/writing/2026-10-四道门.md` 的 zh body 与 frontmatter `bodyEn` 两处，中英逐句对齐。渲染器的行内语法禁令（`markdown.ts` 块级子集 + `check-content.mjs` 规则④ `INLINE`）**不改**——它正是拦 `[文本](链接)` 这种东西的，把链接放进真源字段而不是正文语法，是绕开而不是拆掉守卫。

**技术栈：** Vite + React 18 + CSS Modules；gray-matter（Node 侧 `md-plugin.ts` 解析）；验证链 `npm run build` = `tsc` → `vite build` → SSR build → `prerender.mjs`（发射 4 张静态页）→ `check-content.mjs` → `fonts.mjs --check`。

---

## 适配声明（先说清哪里不照搬模板）

本计划**不写 pytest 式失败测试、不建 feature 分支**，两条都是有意为之：

1. 这个仓库没有单测框架。它的「测试」是构建链上那三道守卫（`check-content` 内容成对与语法守卫、`fonts --check` 子集覆盖、`prerender` 静态发射）加**渲染面静态断言**。所以每个任务的「跑测试」一步＝跑 build + grep dist 里的事实，效果等价且不引入新工具（YAGNI）。
2. 工作区此刻同时躺着另一条会话的 v8 在途改动（`Writing.tsx`、`docs/j`、`docs/k`、`src/content/writing/` 都是 dirty 状态，其中该 md 相对 HEAD 只多一行 `slug: four-gates`）。此时切分支会把两条会话的边界搅混；本项目的既有纪律是**按显式文件清单 commit / `git apply --cached` 局部入索引**，沿用即可。

## 文件结构（谁负责什么）

| 文件 | 职责 | 动作 |
|---|---|---|
| `src/content/writing/2026-10-四道门.md` | 本篇真源：frontmatter（含新 `source`/`sourceName`、`bodyEn`）+ 中文 body | 修改 |
| `site-react/src/lib/content.ts:43-47` | `WritingData` 类型，md frontmatter 到组件的通道 | 修改（加 2 个可选字段） |
| `site-react/src/components/Post.tsx:37-43` | 子页正文渲染，出处行挂在 `.body` 之后 | 修改 |
| `site-react/src/components/Post.module.css` | 出处行排版 | 修改（加 `.source`） |
| `site-react/src/i18n/ui.ts:104-106` | `PostUi` 文键，标签「出处」/「Source」 | 修改（接口 + zh + en 三处） |
| `docs/k-写作承载与能力档位.md` §3 | md 契约（真源字段的法源） | 修改（登记可选字段） |
| `docs/j-写作流程.md` | 写作流程与欠账 | 修改（迁入三处待口述） |
| `site-react/src/lib/markdown.ts`、`scripts/check-content.mjs` | 块级子集与行内语法守卫 | **不动** |

---

## 任务 1：出处链接进真源并渲染成可点 `<a>`

**文件：** 修改 `src/content/writing/2026-10-四道门.md:1-9`、`site-react/src/lib/content.ts:43-47`、`site-react/src/components/Post.tsx:37-43`、`site-react/src/components/Post.module.css`、`site-react/src/i18n/ui.ts:104-106`

- [ ] **步骤 1：链接可达性已验（前置，已完成）**

  ```bash
  curl -s -o /dev/null -w "%{http_code}\n" -L "https://github.com/GassamFlower/vibe_coding_KnowledgeBase-"
  # 200
  ```
  预期：200。已实测 200，`.git` 形式同样 200；HTML 形式更适合放页面上，故取不带 `.git` 的那个。

- [ ] **步骤 2：frontmatter 加两个字段**

  在 `published: true` 与 `slug: four-gates` 之间插入：

  ```yaml
  source: "https://github.com/GassamFlower/vibe_coding_KnowledgeBase-"
  sourceName: "vibe_coding_KnowledgeBase"
  ```

  两个值都是纯 ASCII，`check-content` 的「含中文须有 *En」规则不会触发，因此不需要 `sourceEn`。

- [ ] **步骤 3：`WritingData` 补类型**

  `site-react/src/lib/content.ts:43-47` 改为：

  ```ts
  export interface WritingData {
    title: string; date: string; summary: string; slug: string;
    titleEn?: string; summaryEn?: string; bodyEn?: string;
    source?: string; sourceName?: string;
    body: string;
  }
  ```

- [ ] **步骤 4：`PostUi` 加标签（三处，zh/en 成对）**

  接口 `site-react/src/i18n/ui.ts:104-106`：

  ```ts
  export interface PostUi {
    back: string;
    source: string;
  }
  ```

  zh 块的 `post` 对象内、`back` 那行之后加 `source: '出处',`；en 块对应位置加 `source: "Source",`。

- [ ] **步骤 5：`Post.tsx` 渲染出处行**

  把 `site-react/src/components/Post.tsx:37-43` 的 `</div>`（`.body` 收尾）之后、`</article>` 之前插入：

  ```tsx
            {post.source && (
              <p className={s.source} data-font="sans">
                {t.post.source}{' '}
                <a className="ink-link" href={post.source} rel="noopener noreferrer">{post.sourceName ?? post.source}</a>
              </p>
            )}
  ```

  `data-font="sans"` 是硬要求：衬线子集只收 title / h1 / `##` 小标题，正文与出处走系统 sans，**加任何字都不涨字体产物**（见该文件头注释）。`ink-link` 是 global.css:314 已有的活层链接装置（墨线下划），复用不自造。

- [ ] **步骤 6：`Post.module.css` 加样式**

  在 `.h` 规则之后、`@media` 之前插入：

  ```css
  /* 出处行：正文之后的唯一一条外链，走 sans 不占衬线子集 */
  .source {
    margin-top: var(--space-8);
    font-size: var(--text-sm);
    color: var(--color-ink-soft);
  }
  ```

- [ ] **步骤 7：跑构建验证守卫不炸**

  运行：`cd site-react && npm run build`
  预期：`[check-content] 通过`、`[fonts] 覆盖率校验通过`，且**没有** `用了不支持的行内语法 [链接]` 报错（这条是本轮设计的关键：链接在 frontmatter，不在正文语法里）。

- [ ] **步骤 8：静态断言渲染面**

  ```bash
  cd site-react/dist && grep -c 'href="https://github.com/GassamFlower/vibe_coding_KnowledgeBase-"' index.html writing/four-gates/index.html en/writing/four-gates/index.html
  ```
  预期：主页 0、zh 子页 1、en 子页 1（出处只属于子页，不该漏到主页）。

- [ ] **步骤 9：Commit**

  ```bash
  git add src/content/writing/2026-10-四道门.md site-react/src/lib/content.ts site-react/src/components/Post.tsx site-react/src/components/Post.module.css site-react/src/i18n/ui.ts
  git commit -m "feat(写作): 文章出处改走真源字段并渲染为可点链接"
  ```
  注：`ui.ts` 与并发会话共用，若对方仍在改该文件，改用 `git apply --cached` 只入自己的 hunk。

---

## 任务 2：中文正文去 AI 味（9 处，逐处 before → after）

**文件：** 修改 `src/content/writing/2026-10-四道门.md:75-137`

诊断出的四类模式（humanizer / de-ai-ify 对照）：**「不是 X，是 Y」句式 5 次**、**破折号「——」4 次**、**编辑自指 4 处**、**一处错字**。改法只动句式与节奏，不新增经历、不加数字、不改结论。

- [ ] **步骤 1：破折号改冒号（第 79 行）**

  旧：`- 收集区只做一件事：先丢进来。不整理、不分类。它自己写着另一条判据——超过两周不碰的东西，大概不重要。`
  新：`- 收集区只做一件事：先丢进来。不整理、不分类。它自己带着一条判据：超过两周不碰的东西，大概不重要。`

- [ ] **步骤 2：换掉军事比喻（第 81 行）**

  旧：`- 进行中是主力战场。`
  新：`- 进行中那层是真正干活的地方。`

- [ ] **步骤 3：错字（第 85 行）**

  旧：`一个装满代办事项的收集区谁都有`
  新：`一个装满待办事项的收集区谁都有`

- [ ] **步骤 4：拆掉一处「不是…」判断句（第 89 行段首）**

  旧：`门是四道，不是越多越好。立项门管阶段 1 到 4`
  新：`门就四道。立项门管阶段 1 到 4`
  理由：「不是越多越好」是空判断，删掉不丢信息，标题「四道门，14 个阶段」已经把话说完了。

- [ ] **步骤 5：破折号改句号分句（第 117 行）**

  旧：`根因是这个判断的依据来自开发机——本机装了源字体，而且 localhost 永远可达。`
  新：`根因是这个判断的依据来自开发机：本机装了源字体，localhost 也永远可达。`

- [ ] **步骤 6：小结句去句式（第 120 行）**

  旧：`三条坑指向同一件事：不是我不够小心，是我的验收面选错了地方。`
  新：`三条坑指向同一件事：小心的程度够，验的地方错了。`
  理由：全文第 3 次「不是…是…」。留节奏对比，去复读结构。

- [ ] **步骤 7：删编辑自指 + 破折号（第 124 行段首）**

  旧：`写到这儿必须交代反面。台账根目录没有 PROJECT_STATUS，没有立项门记录，也没有变更日志——也就是说，管着十几个项目的那套门禁，本身没走过一次门。再往下查：`
  新：`台账根目录没有 PROJECT_STATUS，没有立项门记录，也没有变更日志。管着十几个项目的那套门禁，自己一次门都没走过。再往下查：`
  理由：「写到这儿必须交代反面」是写作过程旁白，读者不需要；小标题「这套体系自己没过的门」已经承担了提示。拆成两句后落点反而更硬。

- [ ] **步骤 8：删「这篇文章以台账为准」+ 断句（第 131 行）**

  旧：`还有一处口径不一致：站点早期一份视觉方向的文档里我写过「五门是真序列」，而台账只有 4 道门、4 张门禁卡，「功能门」「实现门」在任何清单文件里都不存在。这篇文章以台账为准。规矩最容易坏掉的地方不是没写下来，是同一个东西在两份文档里长得不一样。`
  新：`还有一处口径不一致。站点早期一份视觉方向的文档里我写过「五门是真序列」，台账这边只有 4 道门、4 张门禁卡，「功能门」「实现门」在任何清单文件里都找不到。规矩坏掉的地方往往不是没写下来。是同一个东西在两份文档里长得不一样。`
  理由：「这篇文章以台账为准」是对自己稿子的裁决，属于自身说法；末句用句号劈开，破掉第 4 次「不是…是…」的排比感，同时保留原来的对撞。

- [ ] **步骤 9：三条「（待你口述）」整块移出正文 → 见任务 4**

  第 133–137 行（含末行）删除。它们是给作者看的编辑便签，不是文章内容，现在直接渲染在读者面前。

- [ ] **步骤 10：刻意保留清单（防止下一轮把好东西砍掉）**

  - 「五级不是难度分级，是东西放在哪儿。」「归档不是删掉。」——两句各自独立、形状不同，不是排比堆叠，留。
  - 「有几项一开始我觉得是形式主义：」「『基本完成』这四个字是我列进禁词的。」「推进状态还有五条硬约束，其中两条是我给自己下的死命令。」——第一人称意见与情绪，humanizer 明确要求保留（有观点才是人写的）。
  - 「文件路径、命令输出或者截图」「目录结构、接口规则、错误处理」「角色、业务流程、模块」——三组三项**是台账里真实的规定**，不是凑数的 rule of three，留。
  - 结尾停在「长得不一样。」——不给光明尾巴，符合 humanizer 第 24 条，**不要**补一段「未来展望」。

- [ ] **步骤 11：一处待用户点头的旋钮**

  de-ai-ify 技能鼓励「说白了」「讲道理」「对吧？」这类口语。本篇是「档案/图鉴」体裁、全站克制排版，硬塞东北腔会变成另一种假。所以本轮只按技能原则办事（长短句混搭、具体代替抽象、去连接词腔、留观点），**不进口口语词库**。要更松的版本，说一声，我按同一批句子再降半格。

---

## 任务 3：英文正文同步（与任务 2 逐句对齐）

**文件：** 修改 `src/content/writing/2026-10-四道门.md:9-72`（frontmatter `bodyEn`，缩进两格必须保持，否则 YAML 块标量断掉）

- [ ] **步骤 1：第 14 行破折号**

  旧：`It carries its own test as well — anything untouched for two weeks probably was not important.`
  新：`It carries its own test as well: anything untouched for two weeks probably was not important.`

- [ ] **步骤 2：第 16 行比喻**

  旧：`Active is where the real work happens.`
  新：`Active is where the work actually gets done.`

- [ ] **步骤 3：第 24 行段首**

  旧：`There are four gates, and fewer is not sloppiness. The charter gate covers stages 1 to 4`
  新：`Four gates. The charter gate covers stages 1 to 4`

- [ ] **步骤 4：第 47 行破折号断句**

  旧：`...charter, stack decision, architecture document and the Agent constitution all landed, five Git commits, all 7 charter items ticked — only then was the architecture gate allowed to open.`
  新：`...charter, stack decision, architecture document and the Agent constitution all landed, five Git commits, all 7 charter items ticked. Only then did the architecture gate open.`

- [ ] **步骤 5：第 52 行破折号**

  旧：`Cause: the judgement came from my own development machine — the source font installed locally, and localhost always reachable.`
  新：`Cause: the judgement came from my own development machine. The source font is installed locally, and localhost is always reachable.`

- [ ] **步骤 6：第 55 行去句式**

  旧：`All three point at the same thing: I was not careless enough — I had picked the wrong surface to verify against.`
  新：`All three point at the same thing. I was careful enough; I just verified the wrong surface.`

- [ ] **步骤 7：第 59 行删自指 + 破折号**

  旧：`The other side has to be stated here. The root of the project system has no PROJECT_STATUS, no charter gate record and no changelog — the set of gates governing a dozen projects has never been walked by any gate itself. Further checks:`
  新：`The root of the project system has no PROJECT_STATUS, no charter gate record and no changelog. The set of gates governing a dozen projects has never been walked by any gate itself. Further checks:`

- [ ] **步骤 8：第 66 行删自指 + 断句**

  旧：`One more inconsistency in wording: an early visual-direction document of mine says the sequence has five gates, while the ledger has 4 gates and 4 cards — a feature gate and an implementation gate exist in no checklist file at all. This piece follows the ledger. Where rules rot is not usually in being unwritten but in the same thing looking different in two documents.`
  新：`One more inconsistency in wording. An early visual-direction document of mine says the sequence has five gates; the ledger has 4 gates and 4 cards, and a feature gate and an implementation gate exist in no checklist file anywhere. Where rules rot is usually not in being unwritten. It is in the same thing looking different in two documents.`

- [ ] **步骤 9：三条「(To be filled by me, ...)」删除（原文迁任务 4）**

  第 68–72 行整块移除；`bodyEn` 以步骤 8 那段收尾（YAML 块标量末尾不留空行）。

- [ ] **步骤 10：em dash 计数核对**

  ```bash
  grep -c '—' <(sed -n '/^bodyEn: |$/,/^---$/p' "src/content/writing/2026-10-四道门.md")
  ```
  预期：从 6 降到 1（只留 summaryEn 那句不属于 body 的破折号不计）。

---

## 任务 4：三处欠账迁进流程文档（删内容不丢信息）

**文件：** 修改 `docs/j-写作流程.md`

- [ ] **步骤 1：在文档末尾追加欠账小节**

  ```markdown
  ## 7. 第一篇欠作者本人的三处（2026-10-17 从正文移出）

  这三段原先以「（待你口述 · 一/二/三）」的形式留在 `src/content/writing/2026-10-四道门.md` 正文里，
  会原样渲染给读者。按「AI 做编辑不做代笔」的红线，它们属于流程台账，不属于页面。等用户口述后
  再作为正式段落写回正文（中文进 body，英文进 bodyEn，两边同时补）。

  1. 第一次被「基本完成」骗到是哪一年、什么活、那件事后来怎么收场。
  2. 发现体系自己那几个窟窿时是怎么想的：改，还是就这样放着，为什么。
  3. 孵化不超过三个、同时开工不超过两到三这两条上限破过几次；哪一次选择不按门禁直接推进，结果是好的还是坏的。
  ```

- [ ] **步骤 2：Commit**

  ```bash
  git add "docs/j-写作流程.md"
  git commit -m "docs(写作流程): 第一篇三处待口述从正文迁入流程台账"
  ```
  注：`docs/j-写作流程.md` 当前是并发会话的 dirty 文件。若 `git add` 会带入对方的在途改动，改用 `git apply --cached` 只入本节的 hunk。

---

## 任务 5：契约回写（法源要跟上实现）

**文件：** 修改 `docs/k-写作承载与能力档位.md` §3（md 契约 v2）

- [ ] **步骤 1：登记新可选字段**

  在 §3 的字段清单里补一行，措辞：

  ```markdown
  `source` / `sourceName`（可选，均 ASCII）：文章的外部出处。渲染在子页正文之后一条 `ink-link`，
  不进正文语法——`markdown.ts` 只认 `## ` / `- ` / 段落，`check-content` 规则④ 的 `INLINE` 明令禁止
  `[文本](链接)`，所以链接只能走真源字段这条路。标签「出处」/「Source」在 `i18n/ui.ts` 的 `post` 段。
  ```

- [ ] **步骤 2：把「正文不得出现编辑自指」写成规矩**

  同节追加：

  ```markdown
  正文红线补一条：不得出现编辑过程话术（「这篇文章以…为准」「写到这儿必须交代」「待你口述」）。
  裁决口径写在流程文档里，读者看到的只能是成稿。
  ```

---

## 任务 6：验证（本仓库的「跑测试」）

- [ ] **步骤 1：构建全链**

  运行：`cd site-react && npm run build`
  预期：`[check-content] 通过`、`[fonts] 覆盖率校验通过（子集 N / 当前渲染 M）`，无行内语法报错。

- [ ] **步骤 2：渲染面静态断言**

  ```bash
  cd site-react/dist
  for w in 待你口述 口述 主力战场 代办 这篇文章以台账为准 写到这儿; do printf "%-10s %s\n" "$w" "$(grep -c "$w" writing/four-gates/index.html)"; done
  ```
  预期：六项全 0。

  ```bash
  grep -c 'ink-link' writing/four-gates/index.html en/writing/four-gates/index.html
  ```
  预期：各 1（中英子页都有出处链接）。

- [ ] **步骤 3：双语子页真机看一次**

  预览服务在 `http://localhost:4173/PersonalWebsite/`，子页路径 `/PersonalWebsite/writing/four-gates/` 与 `/PersonalWebsite/en/writing/four-gates/`。核对：出处行在正文末尾、链接可点、跳 GitHub 命中 200；中文段落改后无错行；`## ` 小标题仍是衬线（缺字会掉成系统字）。

- [ ] **步骤 4：破折号密度复核（zh）**

  ```bash
  grep -o '——' ../src/content/writing/2026-10-四道门.md | wc -l
  ```
  预期：从 8（含 bodyEn 与 summaryEn）降到 ≤2。

---

## 自审

**规格覆盖**：用户四条要求逐条对上——① 加链接 → 任务 1；② 不要自身说法 → 任务 2 步骤 7/8、任务 3 步骤 7/8、任务 5 步骤 2（并写成规矩）；③ 完善优化正文 → 任务 2/3；④ 去掉 AI 味 → 任务 2/3 全篇 + 步骤 10 保留清单 + 步骤 11 旋钮。三处「待口述」的删除在任务 4 有去处，不丢信息。

**占位符扫描**：无 TBD/「类似任务 N」；每处改动给了完整旧句与新句；命令给了预期输出。

**一致性核对**：字段名 `source` / `sourceName` 在任务 1 步骤 2/3/5 与任务 5 步骤 1 四处拼写一致；文键 `post.source` 与接口 `PostUi.source` 同名不同层（一个是真源值、一个是标签），已在步骤 4/5 的上下文里区分；`ink-link` 与 global.css:314 实际类名一致；子页路径 `writing/four-gates/` 与 md 里 `slug: four-gates` 一致。

**风险**：`ui.ts`、`docs/j`、`docs/k`、该 md 全是并发会话的在途文件——每个 commit 步骤都标了 `git apply --cached` 退路；改 `bodyEn` 时 YAML 两格缩进是硬约束，缩进错一位 gray-matter 会把整块吞成字符串或截断。
