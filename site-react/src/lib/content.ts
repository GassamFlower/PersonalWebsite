// content.ts — 读取 src/content/** 的 md 真源（Vite import.meta.glob + md-plugin 服务侧解析）
// 与 Astro 版共享同一内容源，遵守宪法「内容即真源」：改内容只改 md，不硬编码。
// md 的 frontmatter 由 md-plugin.ts 在 vite 服务侧用 gray-matter 解析（Node 专用库，不进浏览器 bundle），
// 这里拿到的是已解析好的 { data, body } 模块。

import type { Locale } from '../i18n/locale';
import { pick } from '../i18n/enums';

// 用 Vite 的 glob import 把 md 打进来（eager，构建时解析；dev 下单文件 HMR）
// 本文件位于 site-react/src/lib/，内容真源在仓库根 src/content（向上三级）。
const raw = import.meta.glob<{ data: Record<string, any>; body: string }>('../../../src/content/**/*.md', {
  import: 'default',
  eager: true,
});

// 任一基础类型：含 frontmatter + body
interface Entry {
  key: string;
  data: Record<string, any>;
  body: string;
}

const entries: Entry[] = Object.keys(raw).map((path) => {
  const { data, body } = raw[path];
  return { key: path, data, body };
});

// 按 frontmatter 判别内容类型（各集合有互斥的必填唯一键）
export interface CaseData {
  title: string; order: number; status: string;
  tier?: string; // 'feature' 详案卡（默认）| 'minor' 简表一句话
  series?: string; // '底座' = 归入内部系统系列块
  part?: string; partEn?: string; // 系列部位名（入口/地基/生产/数据/身份/出口）
  problem: string; whatIDid: string;
  challenge?: string; outcome?: string;
  stack: string[]; evidence?: string;
  featured?: boolean; // 封面档案卡占位（恰好 3 条，守卫见 check-content ⑦）
  image?: string | string[]; imageAlt?: string | string[]; imageAltEn?: string | string[]; published: boolean;
  titleEn?: string; problemEn?: string; whatIDidEn?: string;
  challengeEn?: string; outcomeEn?: string; stackEn?: string[];
}
// docs/k §3：中文正文放 md body（你口述/打字的自然入口），英文正文放 frontmatter bodyEn。
export interface WritingData {
  title: string; date: string; summary: string; slug: string;
  titleEn?: string; summaryEn?: string; bodyEn?: string;
  source?: string; sourceName?: string;
  body: string;
}
export interface SkillItem {
  name: string; note?: string;
}
export interface SkillData {
  order: number; domain: string; level: '已交付' | '会用'; tagline: string;
  skills: SkillItem[]; evidence: string;
  domainEn?: string; taglineEn?: string; skillsEn?: SkillItem[]; evidenceEn?: string;
}
export interface OffcatData {
  no: string; title: string; date?: string;
  status: '已验证' | '进行中' | '计划中' | '参考'; tags: string[];
  titleEn?: string; tagsEn?: string[];
}
export interface NowItem { text: string; textEn?: string; }
export interface NowData {
  updated: string; doing: NowItem[]; learning: NowItem[];
  note: string; noteEn?: string;
}

function collect<T>(isMember: (d: Record<string, any>) => boolean): T[] {
  return entries
    .filter((e) => isMember(e.data))
    .map((e) => ({ ...(e.data as unknown as T) }));
}

function hasAll(d: Record<string, any>, keys: string[]): boolean {
  return keys.every((k) => k in d);
}

export function getCases(): CaseData[] {
  return collect<CaseData>((d) => 'status' in d && 'problem' in d)
    .filter((c) => c.published !== false)
    .sort((a, b) => a.order - b.order);
}

// 封面档案卡（docs/f §封面 · v8.7）：三行 = 真源里 featured: true 的详案卡（数量由 check-content ⑦ 兜住），
// 那行说明取 whatIDid 截到第一个句读（: ： 。 .）为止——派生自已有字段，不另造事实、不新增内容。
const firstClause = (t: string) => /^[^:：。.]+/.exec(t)?.[0].trim() ?? t;

export function getHeroFacts(): (CaseData & { note: string; noteEn: string })[] {
  return getCases()
    .filter((c) => c.featured === true)
    .map((c) => ({ ...c, note: firstClause(c.whatIDid), noteEn: firstClause(c.whatIDidEn ?? c.whatIDid) }));
}

// 写作区（docs/k）：判别键 title+date+summary 三齐；带 md body；published: false 可压稿（沿用 cases 做法）。
// 真源为空时组件渲染诚实空态。
export function getWriting(): WritingData[] {
  return entries
    .filter((e) => hasAll(e.data, ['title', 'date', 'summary', 'slug']) && e.data.published !== false)
    .map((e) => ({ ...(e.data as unknown as Omit<WritingData, 'body'>), body: e.body.trim() }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// 文章子页（docs/j §4，宪法 §1.2）：slug 即 URL 段，同一篇的中英两个静态副本由 locale 选字段。
export function getPost(slug: string): WritingData | undefined {
  return getWriting().find((p) => p.slug === slug);
}

// 逐页 head 用（prerender 发射子页时取）：标题/摘要按语言取词，日期双语同值
export function getPostMeta(slug: string, locale: Locale): { title: string; description: string; date: string } | null {
  const p = getPost(slug);
  if (!p) return null;
  return {
    title: pick(locale, p.title, p.titleEn),
    description: pick(locale, p.summary, p.summaryEn),
    date: p.date,
  };
}

// 能力档位（docs/k §1.2）：判别键 domain+level；档位高的在前，同级按 order 升序。
export function getSkills(): SkillData[] {
  const RANK: Record<string, number> = { 已交付: 0, 会用: 1 };
  return collect<SkillData>((d) => 'domain' in d && 'level' in d)
    .sort((a, b) => (RANK[a.level] ?? 9) - (RANK[b.level] ?? 9) || a.order - b.order);
}

// 能力档位整体自述（docs/k §1.2 改版）：全站恒一条，intro 与 introEn 条数一一对应（守卫把关）。
// 判别键 = intro 是数组；skills md 用 domain+level，互不重叠。
export interface CapabilityData {
  intro: string[]; introEn?: string[];
}
export function getCapability(): CapabilityData {
  const e = entries.find((x) => Array.isArray(x.data.intro));
  return e ? { ...(e.data as unknown as CapabilityData) } : { intro: [] };
}

// 写作区空态实质内容（docs/j §4）：判别键 = topics 是数组，与文章集合的 title+date+summary 不重叠。
export interface WritingPlanData {
  why: string; whyEn?: string; planLabel: string; planLabelEn?: string;
  topics: string[]; topicsEn?: string[];
}
export function getWritingPlan(): WritingPlanData | null {
  const e = entries.find((x) => Array.isArray(x.data.topics));
  return e ? (e.data as unknown as WritingPlanData) : null;
}

// 附录台账：以唯一键 no（A-0n）判别，按编号升序
export function getOffcat(): OffcatData[] {
  return collect<OffcatData>((d) => 'no' in d && 'title' in d).sort((a, b) => a.no.localeCompare(b.no));
}

// 「当下」区：以唯一键 updated + doing 判别，全站恒一条（条数由 check-content 守卫把关）
export function getNow(): NowData {
  const found = entries.find((e) => 'updated' in e.data && 'doing' in e.data);
  const d = (found?.data ?? {}) as Partial<NowData>;
  return {
    updated: d.updated ?? '',
    doing: d.doing ?? [],
    learning: d.learning ?? [],
    note: d.note ?? '',
    noteEn: d.noteEn,
  };
}