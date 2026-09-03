// useReveal.ts — 滚动渐进显现（对应 Astro Base.js 的 .section.reveal/.in）
// 纪律：prefers-reduced-motion 时不添加 reveal；无 JS 时内容全显。
import { useEffect } from 'react';

export function useSectionReveal<T extends HTMLElement>() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<T>('.section'));
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}