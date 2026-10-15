// content.ts — 构建时读取 src/content/** 的 md 真源（Vite import.meta.glob + gray-matter）
// 与 Astro 版共享同一内容源，遵守宪法「内容即真源」：改内容只改 md，不硬编码。
import matter from 'gray-matter';

// 用 Vite 的 glob import 把 md 以 raw 字符串打进来（eager 构建时解析）
// 本文件位于 site-react/src/lib/，内容真源在仓库根 src/content（向上三级）。
const raw = import.meta.glob<string>('../../../src/content/**/*.md', {
  query: '?raw',
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
  const { data, content } = matter(raw[path]);
  return { key: path, data, body: content };
});

// 按 frontmatter 判别内容类型（各集合有互斥的必填唯一键）
export interface CaseData {
  title: string; order: number; status: string;
  problem: string; whatIDid: string;
  challenge?: string; outcome?: string;
  stack: string[]; evidence?: string;
  image?: string; imageAlt?: string; published: boolean;
}
export interface SkillItem { name: string; note?: string; }
export interface SkillData {
  order: number; domain: string;
  level: '已交付' | '会用' | '在学';
  tagline: string; skills: SkillItem[]; evidence?: string;
}
export interface GrowthData { month: string; takeaway: string; tags: string[]; body: string; }
export interface TimelineData {
  year: string; title: string; flag: string; role: string; detail: string; stack: string[];
}
export interface OffcatData {
  no: string; title: string; date?: string;
  status: '已验证' | '进行中' | '计划中' | '参考'; tags: string[];
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

export function getGrowth(): GrowthData[] {
  return collect<GrowthData>((d) => hasAll(d, ['month', 'takeaway'])).sort((a, b) => b.month.localeCompare(a.month));
}

export function getCases(): CaseData[] {
  return collect<CaseData>((d) => 'status' in d && 'problem' in d)
    .filter((c) => c.published !== false)
    .sort((a, b) => a.order - b.order);
}

export function getSkills(): SkillData[] {
  return collect<SkillData>((d) => 'domain' in d && 'level' in d).sort((a, b) => a.order - b.order);
}

export function getTimeline(): TimelineData[] {
  return collect<TimelineData>((d) => 'year' in d && 'role' in d);
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