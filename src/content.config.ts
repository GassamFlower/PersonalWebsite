// 内容集合声明：本站内容真源（成长 / 案例 / 能力）全从这里校验与输出。
import { defineCollection, z } from 'astro:content';

// 成长记录（月度一更 · 站内唯一动态数据）
const growth = defineCollection({
  type: 'content',
  schema: z.object({
    month: z.string(),          // 月份，等宽展示，示例 "2026-08"
    takeaway: z.string().min(1),// 一句收获
    tags: z.array(z.string()).default([]),
  }),
});

// 项目案例（脱敏内容 · 说服力排序）
const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),       // 案例名（衬线大标题）
    order: z.number().int(),        // 说服力排序序号（工程用车助手第 1 位）
    status: z.enum(['已上线', '内部系统', '开发中']), // 透明徽章
    problem: z.string().min(1),     // "问题 → 我做了什么"
    whatIDid: z.string(),
    challenge: z.string().default(''), // 关键难点/取舍（诚实，不编造）
    outcome: z.string().default(''),   // 结果/覆盖面锚点（不造假量级）
    stack: z.array(z.string()).default([]), // 技术栈（橄榄小字）
    evidence: z.string().optional(),// 证据说明
    image: z.string().optional(),   // 脱敏截图/示意槽路径（public/ 下）
    imageAlt: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

// 技能树（技术栈维度 · 诚实三档分级 · 每个领域给证据锚点）
const skills = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number().int(),              // 展示顺序（领域主次）
    domain: z.string().min(1),            // 领域名，如「前端」
    level: z.enum(['已交付', '会用', '在学']), // 诚实三档（宪法 §7）
    tagline: z.string().min(1),           // 一句总述
    skills: z.array(
      z.object({
        name: z.string().min(1),          // 技能点，如「React / Vue」
        note: z.string().optional(),      // 具体程度说明（诚实描述）
      })
    ).default([]),
    evidence: z.string().optional(),      // 真实证据锚点（在什么项目里做过）
  }),
});

// 做过的事（真实时间线 · 纵向档案 · 档案 03）
const timeline = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.string().min(1),       // 等宽年份，如 "2018—2025"
    title: z.string().min(1),      // 项目名（衬线）
    flag: z.string().default(''),  // 诚实档标，如 内部系统 / 外单·已上线 / 方法论
    role: z.string().min(1),       // 一行总述（原设计的一行说明）
    detail: z.string().min(1),     // 一句更实的过程描述（从 case 提取，不编造）
    stack: z.array(z.string()).default([]), // 技术栈锚点
  }),
});

// 附录 · 工作台之外（OFF-CATALOGUE · 窄带台账，全站 ≤6 行）
const offcat = defineCollection({
  type: 'content',
  schema: z.object({
    no: z.string().min(1),                            // 附录编号 A-0n（不占图版页码）
    title: z.string().min(1),
    date: z.string().optional(),                      // 可缺：缺则该行不渲染日期
    status: z.enum(['已验证', '进行中', '计划中', '参考']), // 诚实四档，不用朱砂
    tags: z.array(z.string()).default([]),
  }),
});

// 「当下」区（docs/i §5.1）：全站恒一条，真源 src/content/now/current.md
const now = defineCollection({
  type: 'content',
  schema: z.object({
    updated: z.string().regex(/^\d{4}-\d{2}$/),
    doing: z.array(z.object({ text: z.string().min(1), textEn: z.string().optional() })).default([]),
    learning: z.array(z.object({ text: z.string().min(1), textEn: z.string().optional() })).default([]),
    note: z.string().default(''),
    noteEn: z.string().optional(),
  }),
});

export const collections = { growth, cases, skills, timeline, offcat, now };