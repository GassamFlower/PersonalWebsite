# q · 立项建议 · SEO / GEO 出海服务线

> 项目：Personal Website 的**第三条变现通道评估**（与 `docs/n-` 门禁、`docs/p-` WorkBuddy 并列，互不替代）
> 门禁：立项门（阶段 1·立项）· **本文只提建议与验收口径，未过门不落任何交付、不报对外价**
> 状态：`[待确认]`——待站主本人打钩；未打钩归 `[不推进]`
> 输入：2026-11-03 联网查证（出处见 §6，全部带日期）+ 本仓既有客户案数据（`user-business-direction` 2026-10-28 核定）
> 纪律：不承诺排名、不承诺出单；未核实的写 `[待核]`；能力档位如实标（宪法 §7）。

---

## 0. 先拆框架，再给唯一推荐

"做 SEO、GEO、独立站、出海赚钱"混了**三条不同维度的路**，必须先分开：

| 路 | 本质 | 你要承担的东西 | 判断 |
|---|---|---|---|
| A 自己开店卖货出海 | 你是**卖家** | 货源、库存/退货、广告投放预算、账号主体 | **不做**。你 2026-10 已明确定位是交付服务商，不是卖家；且 merrilis 案实测 2 UV/日、0 加购、0 成交，正好证明"没有分发能力的站自己卖不动"，这条路要烧的是你的钱 |
| B 把 SEO/GEO 做成**卖给客户的服务** | 你是**交付方** | 人天（内容与外链是人天大户）、预期管理 | **唯一推荐**。它挂在你已成立的报价带上，回款最快，且 2026 年客户的旧模型正在失效，换新付费意愿最强 |
| C 把 SEO/GEO 做成工具/资产 | 你是**作者** | 分发（`docs/p-` 已证：平台内无曝光保障） | **只做副产品**：B 的诊断动作沉淀成可复用检查器，反哺 `docs/p-` 的付费资产，不单独作主线 |

**唯一推荐：以 B 为主线，A 明确不做，C 作为 B 的沉淀物。**

理由三条，均可核：
1. 你的客户已经在买"建站"，没在买"分发"。merrilis 案缺的是 sitemap、GA4、Meta Pixel、商品 meta description——**这不是设计缺陷，是分发缺陷**，而你现在的报价带里根本没有这一项。
2. SEO 的旧交付物（排名+点击）正在贬值，客户却还没换计价方式（§1）——**信息差就是你的毛利**。
3. GEO 的新交付物恰好是"**可按动作验收、结果滞后 3–6 个月**"的类型，天然适合月订阅，而月订阅正是你现有 ¥500–1,500 维护费无法长大的原因（§4）。

---

## 1. 2026 年事实卡（为什么现在成立）

### 1.1 点击在贬值，引用在升值

- Google AI Overviews 已出现在 **48% 的查询**（2026-03 口径，同比 +58%）。
- 出现 AIO 时，**自然结果第 1 名的 CTR 下降 58%（Ahrefs，2025-12 复核）/ 61%**（Seer Interactive 2025-09，1.76% → 0.61%）；付费 CTR 降 68%。
- → 客户花 ¥3k–3 万建一个"能排到第一"的站，第 1 名的点击价值可能只有两年前的四成。**卖"排名"这个话术正在失效，但客户还没听到替代方案。**

### 1.2 AI 引用的来源高度集中，而且不在客户自己的站上

- Reddit / Wikipedia / YouTube / LinkedIn / Forbes 是 AI 答案最常引用的域名；Reddit 在 **40%–46.4%** 的 AI 答案中被引用，YouTube 31.8%（社交类内）；**Top15 域名吃掉 68% 的全部 AI 引用**。
- 各引擎偏好不同：ChatGPT 偏 Wikipedia（16.3%）与新闻源，Perplexity 偏 YouTube（16.1%），Google AIO 偏用户生成内容。
- 另有研究记录到 2025-09 ChatGPT 对 Reddit、Wikipedia 的引用率出现突变 → **引用面会变，不能承诺长期效果。**
- → 单靠站内优化天花板很低，**第三方语料层（社区、视频、清单页、评价站）才是新增战场**；这层是人力密集、按月产出、可按动作计量的——正好是个人交付者能收月费的形状。

### 1.3 AI 已经在直接卖货，且门槛是"数据面"而非"排名"

出海独立站真正的新入口是 AI 导购/代理结账，各家都有**明确的商品数据字段要求**（2026-10 口径）：

| 面 | 接入方式 | 关键字段/门槛 | 主体限制 |
|---|---|---|---|
| ChatGPT（OpenAI） | Feed 经 SFTP/API；抓取走 OAI-SearchBot | `item_id`/`title`(≤150)/`description`(≤5000)/`url`/`brand`/`seller_name`/`image_url`/`availability`/`price` | 仅美国买家；结账在回退到外站 |
| Google AI Mode | Merchant Center feed + `/.well-known/ucp`（UCP） | 标准 GC 字段 + `checkout_eligibility`/`consumer_notice`/`merchant_item_id` | 结账仅美国、18+ 登录、英文 |
| Microsoft Copilot | Microsoft Merchant Center 或 PayPal/Stripe/Shopify 集成 | `offerId`(≤50)/`title`(≤150)/`description`(≤10000) | 美国、USD、英文商家 |
| Perplexity | PayPal Store Sync（CSV/JSON）或 Agent Ready API | 无公开必改清单，沿用 Google Shopping CSV | 仅美国用户，不含 Enterprise |
| Meta | Meta/Shopify Catalog 同步 | `id`/`title`(≤200)/`description`(≤9999)/`price`/`link`/`image_link` | Shopify 结账限 US/CA/MX |

`[待核]` **Instant Checkout 的状态本身有冲突**：有资料称 OpenAI 于 2026-02-16 上线并收 4% 费用，另有资料称 2026 年内已退出、能力转由 Google UCP / Universal Cart 与 Perplexity Instant Buy 承接。**本文不把这当成卖点。**
→ 可确定的结论只有一条：**这些面靠"可爬 + 商品数据合规"进入，不靠排名**，而它们目前**全部要求美国/英文/USD**——**出海独立站客户是这批规则的最大受益者，也是最大困惑者**。这就是你的信息差，而且 2 周内可交付、可验收。

### 1.4 反直觉但是最有价值的一条：llms.txt 基本没用

- Limy 分析 **5.15 亿次 AI bot 请求**：搜索类爬虫几乎从不抓 `/llms.txt`。
- ezy.ai 给 83 个已部署 llms.txt 且能看服务端日志的站做了 12 周观察：**OpenAI 只读了 7 次**。
- Prosopo 自 2026-05 起挂 llms.txt，IP 核验日志显示**没有任何 AI 爬虫读过它**（同期 robots.txt 被抓 120 次）。
- → **不要把 llms.txt 当交付物卖。** 这是你跟吹商家的区别，也是唯一一条"你比同行多知道、且能当场验证"的诚实差异化。真正管用的是 robots 里的 AI 爬虫许可矩阵、服务端可核验的抓取日志、以及 §1.3 的数据面。

---

## 2. 定价带（用你的口径，不用美国 agency 的口径）

美国 agency 锚点（仅作参照，**不可照抄**，你的客户是中小出海卖家）：GEO/AEO 月订阅中位 **$6,850**、较 2024Q1 涨 66%（FirstPageSage 2026-10）；另一口径 GEO 中位 $4,500 < SEO $6,200（presenc.ai）；行业区间 $1,500–50,000+/月，平均时薪 $111。

换算到你的既有单价（混合约 ¥1,070/人天、开发 ¥1,200/人天）：

| SKU | 内容 | 人天 | 建议价 | 依据 |
|---|---|---|---|---|
| **S1 AI 可见性诊断包** | 抓取许可矩阵 + schema 校验 + feed 字段核对 + 引用基线测量 + 修复清单 | 3–5 | **¥6,800–9,800**（一次性） | 5 人天 × 1,070 ≈ ¥5,350 成本，毛利 20–45%；比建站单小、当天可开工 |
| **S2 GEO 月订阅** | 每两周一测（固定 prompt 集）+ 站内数据层维护 + 语料层产出（社区/清单页/评价） | 2–4/月 | **¥2,800–4,800/月** | 是你现有 ¥500–1,500 纯维护的**升级理由**，不是并列项 |
| **S3 商品数据面接入** | GMC feed + `/.well-known/ucp` + 各家字段合规 + 提交 | 2–4 | **¥4,800–8,800**（一次性） | §1.3 门槛明确、可当天验收，最适合卖给已有 Shopify/BeikeShop 客户 |
| 不卖 | "保排名/保出单/快排/站群/卖链接/批量 AI 内容" | — | **一律不接** | Google scaled content abuse 直接判罚；且违宪法 §4/§7 与平台公约禁刷量条款 |

**90 天收入目标（唯一口径）**：S1/S3 成交 3 单（≈¥2.2 万）+ S2 成交 2 个订阅（≈¥6k/月）。
达成即验证付费意愿；**未达成（0 单）即判定该线不成立，回到 `docs/p-` 与 `docs/o-`，不再投入内容人天。**

---

## 3. 交付物与验收标准（核心：按动作验收，不按结果验收）

SEO/GEO 结果滞后 3–6 个月且引用面会突变（§1.2），所以**合同只锁可核验动作**，沿用你 merrilis 案的"4 条验收标准"写法：

- **L1 可抓取层**：robots 按"训练 vs 检索"分别放行（GPTBot / OAI-SearchBot / ChatGPT-User / PerplexityBot / ClaudeBot / Google-Extended / GoogleOther）；预渲染/SSR 使 AI 与无 JS 抓取能看到正文；sitemap 可取；Core Web Vitals 达标。
  **验收＝服务端日志出现对应 UA 且返回 200，AI 抓取到的正文含关键事实句。**
- **L2 数据层**：`Product`/`Offer`/`AggregateRating`/`FAQPage`/`Article` 结构化数据校验 0 错；GMC feed 无 disapproval；UCP 文件可达；§1.3 字段逐项合规（含 title 长度上限、`availability`、`brand`、`image_url`）。
  **验收＝校验截图 + GMC 状态页 + `/.well-known/ucp` 返回 200。**
- **L3 语料层**：AI 实际引用的来源里建立存在——相关子版块的**真实**参与、YouTube/短视频、行业清单页与"best X for Y"类问答、评价站（Trustpilot 类）。
  **验收＝提及数与引用数的变化量**（**不承诺**排名、不承诺引用次数）。禁假评、禁刷量、禁批量生成内容。
- **L4 度量层**：开工即拍基线快照；固定 prompt 集 20–50 条（客户品类 + 竞品 + 场景问法），每两周一测，记**提及率/引用率/是否出现在推荐位**；GA4 单独切出 `chatgpt.com`/`perplexity.ai`/`copilot` referral 段；服务端日志统计 AI bot 抓取次数。
  **验收＝每两周一份带数字的对比表。**（本仓已有的守卫式思维在此复用：先写过门标准，再记验收结论。）

> **这套东西同时是 `docs/p-` 的付费资产来源**：L1+L2 的检查器是纯静态可执行断言（robots/sitemap/schema/feed 字段），与 `scripts/check-content.mjs` 同形态，可直接打包成技能；L3/L4 是服务，不适合做成资产。

---

## 4. 与你现有三条线的关系

- **不取代 `docs/o-` R1–R4。** 可达性是你**自己的站**的问题；本线是**客户的站**的分发问题，两者不互斥，但共用你的时间。本线若开工，R1–R4 仍按原顺序，不得因为"新钱好赚"就把本站留在抖动链路上。
- **不取代 `docs/p-`。** WorkBuddy 是慢钱（30 天锁）且需先签约；本线是快钱（诊断单可本周成交）。
- **与本仓的诚实资产直接接得上**：`docs/n-` §1.1 的合法口径（五道闸 / 3 次真拦停 / 4 次负样本验证）可以原样写进 S1 报告的"我们怎么保证交付质量"章节，不新增任何夸大。

---

## 5. 红线（这条线上最容易翻车的地方）

1. **能力档位（宪法 §7）**：站主 SEO/GEO 当前档位是"**正在做/会用**"，**不得**对外写"操盘过 N 个站做到类目第一/月流量翻 X 倍"。首单可换案例（明码标"验证"或成本价），**不得编造战绩**——这与你 merrilis 案实测 2 UV/日、0 成交并不丢人，如实写反而符合本站纪律。
2. **不承诺结果**：不承诺排名、不承诺引用、不承诺出单（对齐你已有的"不承诺包过审/包出单，权在通道"）。
3. **不碰灰产**：卖链接、站群、批量 AI 内容 farm、假评、快排、蜘蛛池——2026 年判罚与封号风险明确，且违 §4。
4. **预期管理写进合同**：GEO 见效 3–6 个月、引用面会变（§1.2 已证突变），合同期内只锁动作验收。
5. **客户账号归客户**：GMC、Search Console、GA4、feed 凭证全部建在客户名下，交付后撤销访问（沿用 merrilis 案约束）。

---

## 6. 需站主回答（4 项，回答后我才出交付 SOP 与报价单）

1. 目标客户是**中国出海卖家**（中文沟通、国内主体、收款人民币）还是**海外本土卖家**（英文交付、美元收款）？——决定 S3 能不能卖（各家 checkout 目前要求美国/USD/英文主体侧条件）与你的报价币种。
2. 内容/外链人天你打算自己扛还是外包？——L3 是月订阅的成本大头，不定价就先不定人天。
3. 现有真实证据：你是否已经对**任意一个站**做过 L1/L2 动作并留下数据（含 merrilis）？——决定对外口径档位与 S1 定价能否站住。
4. 是否批准"本文只到立项建议"——即 S1 样例诊断先只对**现有客户 merrilis** 免费做（明确标验证），拿到第一份真实数据后再谈对外报价。

---

## 7. 来源

- AI Overviews 与 CTR：[Search Engine Land（Seer 研究，1.76%→0.61%）](https://searchengineland.com/google-ai-overviews-drive-drop-organic-paid-ctr-464212)、[Ahrefs 2025-12 复核 −58%](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)、[2026-03 48% 查询触发口径](https://thestacc.com/blog/google-ai-overview-statistics/)、[Dataslayer 汇编](https://www.dataslayer.ai/blog/google-ai-overviews-the-end-of-traditional-ctr-and-how-to-adapt-in-2025)
- 引用来源分布：[Search Engine Land·Reddit/YouTube/LinkedIn 最常引用（3000 万样本）](https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138)、[EPR 2026 Top50 引用域名指数](https://everything-pr.com/ai-platform-citation-source-index-2026)、[Semrush 三个月引用研究](https://www.semrush.com/blog/most-cited-domains-ai/)、[Outrank·各平台引用占比](https://www.outrank.so/blog/social-platforms-ai-cites)
- llms.txt 实测：[Limy·5.15 亿 AI bot 事件分析](https://limy.ai/blog/llms-txt-in-2026-the-full-guide)、[ezy.ai·83 站 12 周仅 7 次读取](https://www.ezy.ai/research/do-ai-bots-read-llms-txt)、[Prosopo·零读取](https://prosopo.io/blog/llms-txt/)、[GeoToolbox 汇总](https://geotoolbox.ai/blog/llms-txt)
- AI 商品面与代理结账：[WisePIM·各家 feed 字段与门槛逐项对比](https://wisepim.com/reports/ai-shopping-feed-requirements)、[OpenAI 官方 Buy it in ChatGPT](https://openai.com/index/buy-it-in-chatgpt/)、[Hypotenuse·能力迁移至 Google UCP/Perplexity Instant Buy](https://www.hypotenuse.ai/blog/chatgpts-instant-checkout-the-next-phase-of-agentic-commerce)、[ACP 费率与商户条件](https://www.ekamoira.com/blog/chatgpt-instant-checkout-agentic-commerce-protocol-2026)、[小商户条件](https://chocomediaagency.com/chatgpt-instant-checkout-for-small-merchants-what-agentic-commerce-actually-requires-in-2026/)
- 服务报价带：[FirstPageSage·GEO/AEO 2026 中位 $6,850/月](https://firstpagesage.com/seo-blog/geo-aeo-pricing-statistics/)、[presenc.ai·GEO vs SEO 成本](https://presenc.ai/research/geo-vs-seo-cost-comparison)、[gtm8020·32 份 SEO/GEO 报价统计](https://www.gtm8020.com/blog/seo-pricing-statistics)、[Fuel Online·AEO 月费区间](https://fuelonline.com/ai-seo-geo/ai-seo-pricing-aeo-geo-cost-2026/)
- 本仓既有事实：`user-business-direction`（报价带、人天单价、merrilis 实测数据、4 条验收标准）、`docs/p-`（平台分发无曝光保障）、`docs/n-` §1.1（合法对外口径）
