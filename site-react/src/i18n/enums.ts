// enums.ts — 内容枚举的英文显示副本 + 双语字段取词。
// 纪律：md 里的中文枚举是真源（条件判断、CSS 类名继续用中文键），这里只负责"显示层"翻译。
// 措辞按 docs/h §3 术语表；配套守卫 scripts/check-content.mjs 规则③ 保证内容 *En 不缺。
import type { Locale } from './locale';

export const STATUS_EN: Record<string, string> = {
  已上线: 'Live',
  内部系统: 'Internal',
  开发中: 'In progress',
};

export const OFFCAT_STATUS_EN: Record<string, string> = {
  已验证: 'Verified',
  进行中: 'In progress',
  计划中: 'Planned',
  参考: 'Reference',
};

// 单语字段取词：en 且有 *En 副本时用副本，否则回落中文真源
export function pick(locale: Locale, zh: string | undefined, alt?: string): string {
  return locale === 'en' && alt ? alt : zh ?? '';
}

// 列表字段取词：en 且 *En 非空时用副本
export function pickList(locale: Locale, zh: string[], alt?: string[]): string[] {
  return locale === 'en' && alt && alt.length > 0 ? alt : zh;
}

// 枚举显示：zh 原样；en 查表，查不到回落原文（缺键由守卫拦，不应发生）
export function enumLabel(locale: Locale, map: Record<string, string>, zh: string): string {
  return locale === 'en' ? map[zh] ?? zh : zh;
}
