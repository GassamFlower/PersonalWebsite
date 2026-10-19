// Annotations — v8 手层批注笔（D4 三层制之「手」，全站 ≤8 处，配额见 docs/components.md §5）
// 纯装饰 SVG（aria-hidden），文字是真实 DOM 子节点，任何状态下可读（宪法 §17）
import type { ReactNode } from 'react';
import s from './Annotations.module.css';

/** 手绘双圈圈注：包住一段文字；dark=深墨场用提亮朱砂 */
export function MkCircle({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`${s.mk} ${dark ? s.mkDark : ''}`}>
      <svg className={`${s.mkSvg} ${s.mkCircle} ${s.draw}`} viewBox="0 0 120 44" preserveAspectRatio="none" aria-hidden="true">
        <path className={s.mkDash} d="M9 27 C 8 13, 38 4, 66 5 C 96 6, 115 13, 114 23 C 113 34, 84 41, 52 40 C 24 39, 7 35, 9 25" vectorEffect="non-scaling-stroke" />
        <path className={s.mkDash} d="M13 31 C 22 41, 58 44, 87 39 C 108 35, 118 26, 109 15 C 99 5, 63 2, 38 6 C 18 9, 8 17, 12 28" vectorEffect="non-scaling-stroke" />
      </svg>
      {children}
    </span>
  );
}

/** 手绘波浪底线：压在一段文字基线下 */
export function MkUnderline({ children }: { children: ReactNode }) {
  return (
    <span className={s.mk}>
      <svg className={`${s.mkSvg} ${s.mkUnder} ${s.draw}`} viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
        <path className={s.mkWave} d="M2 5 C 10 2, 18 7, 27 4 C 36 1, 45 7, 54 4 C 63 1, 72 7, 81 4 C 88 2, 94 5, 98 3" vectorEffect="non-scaling-stroke" />
      </svg>
      {children}
    </span>
  );
}

/** 手绘下指箭头：无子内容，调用方用容器 position:relative + 自有类绝对定位 */
export function MkArrow({ className }: { className?: string }) {
  return (
    <svg className={`${s.mkSvg} ${s.mkArrowSvg} ${className ?? ''} ${s.draw}`} viewBox="0 0 48 40" aria-hidden="true">
      <path className={s.mkArrowPath} d="M4 4 C 12 24, 26 33, 44 36" vectorEffect="non-scaling-stroke" />
      <path className={s.mkArrowPath} d="M35.5 39.5 L44 36 L36.5 29" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
