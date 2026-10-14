// Seal — 朱砂验收章（v5 §2.2）：只包裹内容真源中「已上线/已交付/已验证」的事实
// 入视口播放一次 120ms「落章」；reduced-motion / 无 JS 时静态可见（章类由客户端 JS 添加）
import { useEffect, useRef } from 'react';

interface SealProps {
  label?: string;
  dark?: boolean;
  className?: string;
}

export default function Seal({ label = '已验证', dark = false, className = '' }: SealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('seal-armed');
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) {
            el.classList.remove('seal-armed');
            el.classList.add('seal-in');
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`seal${dark ? ' dark' : ''}${className ? ' ' + className : ''}`}>
      {label}
    </span>
  );
}
