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