// ui.ts — 界面层文案字典（组件里原本硬编码的中文串，逐条搬进来，一条不改字）。
// 内容真源仍是 src/content/**（案例/成长/技能不在这里）；本文件只管 UI 骨架上的字。
// 纪律：en 补齐之前不许发 /en/ —— prerender 的键位守卫会直接 build 失败，不静默回退中文。
// 只收含中文的串；纯 Latin 装饰串（PLATE 02 / 08、CAT.2026-10、GATE✓ 等）两语言同形，留在组件里。
import type { Locale } from './locale';

export interface ShellUi {
  skipLink: string;
}

export interface HeroUi {
  plateRail: string;
  eyebrowNo: string;
  siteLatin: string;
  role: string;
  railGate: string;
  signature: string;
  title: string;
  subline: string;
  subline2: string;
  focusCta: string;
  dossierAria: string;
  gateLabel: string;
  releasedLabel: string;
  revLabel: string;
  dossierName: string;
  sealVerified: string;
  worksCta: string;
  propDelivery: string;
  propImpact: string;
  propPrinciples: string;
}

export interface NavUi {  brandZh: string;
  ariaMain: string;
  langAria: string;
  statusOnline: string;
  itemHero: string;
  itemCases: string;
  itemWriting: string;
  itemGrowth: string;
  itemPrinciples: string;
  itemOffcat: string;
  itemContact: string;
}

export interface StoryUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  linkPosition: string;
  linkStory: string;
  linkMethod: string;
  linkWorks: string;
  linkInsight: string;
  linkContact: string;
  headline1: string;
  headline2: string;
  labelPast: string;
  labelNow: string;
  past1: string;
  past2: string;
  past3: string;
  present1: string;
  present2: string;
  present3: string;
  footSigned: string;
}

export interface TimelineUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  headline1: string;
  headline2: string;
  artArchived: string;
}

export interface CasesUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  title: string;
  labelProblem: string;
  labelDid: string;
  labelKey: string;
  labelMore: string;
  seriesLabel: string;
  seriesRail: string;
  seriesIntro: string;
  labelResult: string;
  sealVerified: string;
  artAssets: string;
  artUnifiedEntry: string;
  slotFlow: string;
  slotUi: string;
  slotHint: string;
  altSuffix: string;
}

export interface WritingUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  headline1: string;
  headline2: string;
  empty: string;
}

export interface GrowthUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  linkArchive: string;
  linkWorks: string;
  linkMethod: string;
  linkLog: string;
  linkAbout: string;
  nextAria: string;
  headline1: string;
  headline2: string;
  sub: string;
  thMonth: string;
  thTakeaway: string;
  thTags: string;
}

export interface PrinciplesUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  headline1: string;
  headline2: string;
  headline3: string;
  gate1Title: string;
  gate1Desc: string;
  gate2Title: string;
  gate2Desc: string;
  gate3Title: string;
  gate3Desc: string;
  gate4Title: string;
  gate4Desc: string;
  tierLead: string;
  tier1Name: string;
  tier1Role: string;
  tier1Act: string;
  tier2Name: string;
  tier2Role: string;
  tier2Act: string;
  tier3Name: string;
  tier3Role: string;
  tier3Act: string;
  tier4Name: string;
  tier4Role: string;
  tier4Act: string;
  tier5Name: string;
  tier5Role: string;
  tier5Act: string;
  note: string;
  stampArchive: string;
  stampApproved: string;
}

export interface OffcatUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  linkWorks: string;
  linkWriting: string;
  linkLog: string;
  linkContact: string;
  nextAria: string;
  title: string;
  sub: string;
  thNo: string;
  thItem: string;
  thStatus: string;
  thTags: string;
  diagramAria: string;
  artBlockDevice: string;
  artEncryptedBackup: string;
  artOffsite: string;
  caption: string;
  footBy: string;
}

export interface ContactUi {
  plateRail: string;
  tagNo: string;
  tagZh: string;
  title: string;
  labelWechat: string;
  labelMail: string;
  labelAsk: string;
  askNote: string;
  copyIdle: string;
  copyDone: string;
  promptText: string;
  slogan: string;
  signRail: string;
}

export interface FooterUi {
  note: string;
  tagline: string;
}

export interface ZoneUi {
  shell: ShellUi;
  hero: HeroUi;
  nav: NavUi;
  story: StoryUi;
  timeline: TimelineUi;
  cases: CasesUi;
  writing: WritingUi;
  growth: GrowthUi;
  principles: PrinciplesUi;
  offcat: OffcatUi;
  contact: ContactUi;
  footer: FooterUi;
}

const zh: ZoneUi = {
  shell: {
    skipLink: '跳到正文',
  },
  hero: {
    plateRail: '封面 · COVER',
    eyebrowNo: '档案 01',
    siteLatin: 'PERSONAL DOSSIER',
    role: '独立系统建构者',
    railGate: 'DOSSIER',
    signature: '一个故事',
    title: 'Hi，这里是一个故事。',
    subline: '一个普通人做过哪些事、正在做什么，都记在这里。',
    subline2: '故事都有出处。',
    focusCta: '聊聊你的问题 →',
    dossierAria: '已验证事实档案卡',
    gateLabel: 'GATE✓',
    releasedLabel: '上线',
    revLabel: 'REV',
    dossierName: '档案卡',
    sealVerified: '已验证',
    worksCta: '精选作品 01—04',
    propDelivery: '独立交付',
    propImpact: '业务落地',
    propPrinciples: '边界诚实',
  },
  nav: {
    brandZh: '独立交付档案',    ariaMain: '主导航',
    langAria: '切换语言',
    statusOnline: '在线',
    itemHero: '封面',
    itemCases: '项目',
    itemWriting: '写作',
    itemGrowth: '成长',
    itemPrinciples: '规矩',
    itemOffcat: '附录',
    itemContact: '联系',
  },
  story: {
    plateRail: '图版 02 · STORY',
    tagNo: '档案 02',
    tagZh: '一个人的故事',
    linkPosition: '定位',
    linkStory: '故事',
    linkMethod: '方法与体系',
    linkWorks: '项目精选',
    linkInsight: '洞见',
    linkContact: '联系',
    headline1: '干过的活，',
    headline2: '都有据可查',
    labelPast: '曾经做过什么',
    labelNow: '正在做什么',
    past1: '起步于旅游数据爬虫，专做数据抓取与清洗——在杂乱数据与干净数据之间，练出了对数据的第一手感觉。',
    past2: '之后在一家保险公司做运维，门户网站、业务流程与数据的维护管理都经手——学会让系统稳稳当当地服务业务。',
    past3: '再然后是八年的法院政务系统维护，让我懂业务、懂数据，也看见系统背后的真实需求与约束。',
    present1: '现在在一家工业类企业，我看见长期被忽视的数字化空白——流程割裂、数据孤岛、体验落后。',
    present2: '正在从零搭起工业运维平台、统一用户中心、智能网关管理以及 ERP 系统数据维护等，让数据流动，让一线可用，让管理可视。',
    present3: '支撑这一切的，是好奇心，更是持续学习的习惯——不满足于「能用」，而是追问每一层为什么这样设计。AI 也不停在演示里：把它落进 RAG、知识库与智能体的真实场景，让回答有据可查，让流程自己运转——更深一层的工程化与评估，仍在精进路上。',
    footSigned: 'BY 一个故事',
  },
  timeline: {
    plateRail: '图版 05 · TIMELINE',
    tagNo: '档案 05',
    tagZh: '来路',
    headline1: '一年一步，',
    headline2: '走到这里',
    artArchived: '存档',
  },
  cases: {
    plateRail: '核心卷 · CASES',
    tagNo: '档案 03',
    tagZh: '项目案例（卷宗）',
    title: '做的项目，能看能查',
    labelProblem: '问题',
    labelDid: '解决',
    labelKey: '关键',
    labelMore: '还做过这些，就不一件件展开了',
    seriesLabel: '同一套底座 · 五个部位',
    seriesRail: '底座',
    seriesIntro:
      '上面详案里的内网私有化平台与 OPS，加上这三块，不是五个各干各的工具：地基承载代码与发布，生产管住设备与运维，身份只管一次登录，搬运连起设计端与业务系统，出口统一 AI 与接口调用。接口与规矩互相咬合，缺一段就断链。',
    labelResult: '结果',
    sealVerified: '已验证',
    artAssets: '资产 · 监控 · 巡检 · 工单',
    artUnifiedEntry: '统一入口',
    slotFlow: '示意 · 手机端流程',
    slotUi: '示意 · 界面功能线稿',
    slotHint: '示意线稿 · 非真实截图',
    altSuffix: '截图',
  },
  writing: {
    plateRail: '图版 04 · WRITING',
    tagNo: '档案 04',
    tagZh: '写作',
    headline1: '写下来的，',
    headline2: '才算想清楚',
    empty: '第一篇在写。写好就挂在这里。',
  },
  growth: {
    plateRail: '图版 06 · GROWTH',
    tagNo: '档案 06',
    tagZh: '成长记录',
    linkArchive: '档案',
    linkWorks: '作品',
    linkMethod: '方法',
    linkLog: '记录',
    linkAbout: '关于',
    nextAria: '下一页',
    headline1: '公开的成长，',
    headline2: '一个月记一次',
    sub: '给自己一个月进步的交代',
    thMonth: '月份',
    thTakeaway: '本月的交代',
    thTags: '标签',
  },
  principles: {
    plateRail: '图版 07 · PRINCIPLES',
    tagNo: '档案 07',
    tagZh: '做事的规矩',
    headline1: '先立规矩，',
    headline2: '再让',
    headline3: '干活',
    gate1Title: '一 · 立项门',
    gate1Desc: '先把话说清楚，\n再动手',
    gate2Title: '二 · 架构门',
    gate2Desc: '参考图为准绳，\n不凭感觉',
    gate3Title: '三 · 业务门',
    gate3Desc: '素材有清单，\n证据才能过',
    gate4Title: '四 · 上线门',
    gate4Desc: '可访问、可追溯、\n可复盘',
    tierLead: '「五级项目体系」的目录流水线——碎片进来，资产出去：',
    tier1Name: '收集区',
    tier1Role: '大脑缓存，零门槛收录一切碎片',
    tier1Act: '每周清空',
    tier2Name: '孵化区',
    tier2Role: '验证方向可行性，最小成本试错',
    tier2Act: '填写验证卡',
    tier3Name: '进行中',
    tier3Role: '全力推进已立项的产品 / 工具',
    tier3Act: '每日推进',
    tier4Name: '资产库',
    tier4Role: '可复用能力沉淀，越做越轻',
    tier4Act: '项目结束时提取',
    tier5Name: '归档区',
    tier5Role: '阶段性收尾，保留复活可能',
    tier5Act: '写总结卡',
    note: '知识库与工作台分离，文档前缀排序，单一信源 SSOT。',
    stampArchive: '档案',
    stampApproved: '通过',
  },
  offcat: {
    plateRail: '附录 · APPENDIX',
    tagNo: '附录 A',
    tagZh: '工作台之外',
    linkWorks: '作品',
    linkWriting: '写作',
    linkLog: '记录',
    linkContact: '联系',
    nextAria: '下一页',
    title: '工作台之外',
    sub: '正卷之外的几件事：用什么做、正在拆什么、审美从哪来',
    thNo: '编号',
    thItem: '条目',
    thStatus: '状态',
    thTags: '标签',
    diagramAria: '工作台拓扑示意：一台物理机内跑 Hyper-V 与 Ubuntu 虚拟机，容器里承载代码仓、CI、面板与备份，数据库落在独立块设备，备份一份出网到异地',
    artBlockDevice: '独立块设备',
    artEncryptedBackup: '加密备份',
    artOffsite: '异地',
    caption: '工作台拓扑 · 示意（不含真实网段与主机名）',
    footBy: 'BY 一个故事',
  },
  contact: {
    plateRail: '封底 · BACK COVER',
    tagNo: '档案 08',
    tagZh: '联系',
    title: '聊得来，就一起做事',
    labelWechat: '微信',
    labelMail: '邮箱',
    labelAsk: '索取',
    askNote: '雇主与过程细节对公开版隐去 · 详询索取',
    copyIdle: '加微信聊聊',
    copyDone: '已复制',
    promptText: '请手动复制微信号',
    slogan: '把一团乱麻，理成能用的系统',
    signRail: '署名章 · 一个故事',
  },
  footer: {
    note: '展示内容均经匿名化脱敏，不涉及具体公司 / 客户信息',
    tagline: '把一团乱麻，理成能用的系统',
  },
};

// 英文措辞须用户逐条裁决后才落字（docs/h-英文版-i18n.md §3），故这里刻意留空。
// 类型上允许逐区渐进补全，完整性由 prerender 的 missingKeys 守卫在构建期把关。
type PartialUi = { [Z in keyof ZoneUi]?: Partial<ZoneUi[Z]> };

const en: PartialUi = {
  shell: {
    skipLink: "Skip to content",
  },
  hero: {
    plateRail: "Cover",
    eyebrowNo: "File 01",
    siteLatin: "PERSONAL DOSSIER",
    role: "Independent systems builder",
    railGate: "DOSSIER",
    signature: "一个故事",
    title: "Hi, this is one person's story.",
    subline: "What an ordinary person has done — and is doing now — all kept here.",
    subline2: "Every story has a source.",
    focusCta: "Tell me your problem →",
    dossierAria: "Verified-facts dossier card",
    gateLabel: "GATE✓",
    releasedLabel: "Live",
    revLabel: "REV",
    dossierName: "Dossier card",
    sealVerified: "Verified",
    worksCta: "Selected work 01–04",
    propDelivery: "Independent delivery",
    propImpact: "Business impact",
    propPrinciples: "Honest boundaries",
  },
  nav: {
    brandZh: "Independent delivery dossier",
    ariaMain: "Main navigation",
    langAria: "Switch language",
    statusOnline: "Online",
    itemHero: "Cover",
    itemCases: "Work",
    itemWriting: "Writing",
    itemGrowth: "Growth",
    itemPrinciples: "Principles",
    itemOffcat: "Appendix",
    itemContact: "Contact",
  },
  story: {
    plateRail: "Plate 02 · STORY",
    tagNo: "File 02",
    tagZh: "One person's story",
    linkPosition: "Position",
    linkStory: "Story",
    linkMethod: "Method",
    linkWorks: "Selected work",
    linkInsight: "Insights",
    linkContact: "Contact",
    headline1: "Every job on record,",
    headline2: "with evidence to back it",
    labelPast: "What I have done",
    labelNow: "What I am doing",
    past1: "It began with travel-data crawlers — scraping and cleaning data for a living, building my first instincts for data between the messy and the clean.",
    past2: "Then came operations work at an insurance company: portal sites, business processes and data all under my watch — learning to keep systems steadily serving the business.",
    past3: "After that, eight years maintaining court administration systems — learning the business and the data, and seeing the real needs and hard constraints behind any system.",
    present1: "These days, at an industrial company, I see a long-ignored digital gap: fragmented processes, data silos, dated user experience.",
    present2: "I am building it up from zero — the industrial operations platform, the unified user center, smart gateway management, ERP data maintenance and more — letting data flow, letting the front line use it, letting management see it.",
    present3: "What carries all of this is curiosity backed by a habit of steady learning — never stopping at \"it works\", but asking why each layer is built the way it is. Nor does AI stop at demos: I put it to work in real scenarios — RAG, knowledge bases, agents — making answers traceable and workflows run themselves; the deeper engineering and evaluation is still under way.",
    footSigned: "BY 一个故事",
  },
  timeline: {
    plateRail: "Plate 05 · TIMELINE",
    tagNo: "File 05",
    tagZh: "The path so far",
    headline1: "One step a year,",
    headline2: "the road so far",
    artArchived: "Archived",
  },
  cases: {
    plateRail: "Core Volume · CASES",
    tagNo: "File 03",
    tagZh: "Project cases (dossier)",
    title: "Work you can see and verify",
    labelProblem: "Problem",
    labelDid: "Solution",
    labelKey: "Key point",
    labelMore: "More things I have built",
    seriesLabel: "One Shared Platform · Five Parts",
    seriesRail: "Platform",
    seriesIntro:
      "The private dev-ops platform and OPS above, plus these three, are not five unrelated tools: the foundation carries code and releases, production runs equipment and operations, identity owns a single login, the mover links the design side to business systems, and the exit unifies AI and API calls. Interfaces and rules interlock — one missing link breaks the chain.",
    labelResult: "Result",
    sealVerified: "Verified",
    artAssets: "Assets · Monitoring · Inspection · Tickets",
    artUnifiedEntry: "Single entry",
    slotFlow: "Sketch · mobile flow",
    slotUi: "Sketch · UI wireframe",
    slotHint: "Wireframe sketch · not a real screenshot",
    altSuffix: "screenshot",
  },
  writing: {
    plateRail: "Plate 04 · WRITING",
    tagNo: "File 04",
    tagZh: "Writing",
    headline1: "What is written down,",
    headline2: "has been thought through",
    empty: "First piece in progress — it will hang here when done.",
  },
  growth: {
    plateRail: "Plate 06 · GROWTH",
    tagNo: "File 06",
    tagZh: "Growth log",
    linkArchive: "Dossier",
    linkWorks: "Work",
    linkMethod: "Method",
    linkLog: "Log",
    linkAbout: "About",
    nextAria: "Next page",
    headline1: "Growth in public,",
    headline2: "one entry a month",
    sub: "A monthly accounting to myself",
    thMonth: "Month",
    thTakeaway: "This month's takeaway",
    thTags: "Tags",
  },
  principles: {
    plateRail: "Plate 07 · PRINCIPLES",
    tagNo: "File 07",
    tagZh: "How I work",
    headline1: "Rules first,",
    headline2: "then let",
    headline3: "work",
    gate1Title: "I · Idea gate",
    gate1Desc: "Say it clearly first,\nthen build",
    gate2Title: "II · Architecture gate",
    gate2Desc: "Reference art is the standard,\nnot gut feeling",
    gate3Title: "III · Delivery gate",
    gate3Desc: "Assets have a checklist;\nevidence gets things through",
    gate4Title: "IV · Launch gate",
    gate4Desc: "Reachable, traceable,\nreviewable",
    tierLead: "The five-tier project system — a directory pipeline: fragments in, assets out:",
    tier1Name: "Capture",
    tier1Role: "A zero-friction cache for every spark and fragment",
    tier1Act: "Emptied weekly",
    tier2Name: "Incubation",
    tier2Role: "Prove a direction viable, at minimal cost",
    tier2Act: "Fill a validation card",
    tier3Name: "In progress",
    tier3Role: "Full push on products and tools already green-lit",
    tier3Act: "Progress logged daily",
    tier4Name: "Asset library",
    tier4Role: "Reusable capability settles out — lighter every time",
    tier4Act: "Extracted at project close",
    tier5Name: "Archive",
    tier5Role: "Staged wrap-up, kept ready to revive",
    tier5Act: "Write a summary card",
    note: "Knowledge base and workspace stay separate; documents sorted by prefix; single source of truth (SSOT).",
    stampArchive: "Dossier",
    stampApproved: "Approved",
  },
  offcat: {
    plateRail: "Appendix · APPENDIX",
    tagNo: "Appendix A",
    tagZh: "Off the workbench",
    linkWorks: "Work",
    linkWriting: "Writing",
    linkLog: "Log",
    linkContact: "Contact",
    nextAria: "Next page",
    title: "Off the workbench",
    sub: "A few things outside the main volume: what I build with, what I am taking apart, where the taste comes from",
    thNo: "No.",
    thItem: "Entry",
    thStatus: "Status",
    thTags: "Tags",
    diagramAria: "Workbench topology sketch: one physical host running Hyper-V and an Ubuntu VM; containers carry the code forge, CI, dashboard and backups; the database sits on its own block device; one backup copy leaves to an offsite location",
    artBlockDevice: "Own block device",
    artEncryptedBackup: "Encrypted backup",
    artOffsite: "Offsite",
    caption: "Workbench topology · sketch (no real subnets or hostnames)",
    footBy: "BY 一个故事",
  },
  contact: {
    plateRail: "Back cover · BACK COVER",
    tagNo: "File 08",
    tagZh: "Contact",
    title: "If we click, let us work together",
    labelWechat: "WeChat",
    labelMail: "Email",
    labelAsk: "Discretion",
    askNote: "Employers and process details are withheld from the public edition — ask and I will share",
    copyIdle: "Add me on WeChat",
    copyDone: "Copied",
    promptText: "Please copy the WeChat ID manually",
    slogan: "Turning tangles into systems that work",
    signRail: "Signature seal · 一个故事",
  },
  footer: {
    note: "Everything shown here is anonymized — no specific company or client information",
    tagline: "Turning tangles into systems that work",
  },
};

export const ui: { zh: ZoneUi; en: PartialUi } = { zh, en };

// 取当前语言的字典。en 在守卫放行前不会被渲染，这里的断言只服务于类型收窄。
export function uiFor(locale: Locale): ZoneUi {
  return (locale === 'zh' ? ui.zh : (ui.en as ZoneUi));
}

// 守卫用：返回该语言相对中文缺失的键路径，例如 'hero.title'。
export function missingKeys(locale: Locale): string[] {
  const base = ui.zh as unknown as Record<string, Record<string, string>>;
  const target = (locale === 'zh' ? ui.zh : ui.en) as unknown as Record<string, Record<string, string> | undefined>;
  const missing: string[] = [];
  for (const zone of Object.keys(base)) {
    const dict = target[zone];
    for (const key of Object.keys(base[zone])) {
      const value = dict?.[key];
      if (typeof value !== 'string' || value.length === 0) {
        missing.push(`${zone}.${key}`);
      }
    }
  }
  return missing;
}
