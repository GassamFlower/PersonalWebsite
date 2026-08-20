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
    stack: z.array(z.string()).default([]), // 技术栈（橄榄小字）
    evidence: z.string().optional(),// 证据说明
    image: z.string().optional(),   // 脱敏截图/示意槽路径（public/ 下）
    imageAlt: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { growth, cases };