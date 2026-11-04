// HeroLattice — 首屏经纬：静态 SVG 是默认层，three 只在条件允许时接替它。
// 无 JS、reduced-motion、WebGL 不可用、saveData 时都停在静态线稿；three 加载失败同样不报错。
import { useEffect, useRef, useState } from 'react';
import { SVG_LATTICE } from './lattice';
import type { LatticeHandle } from './latticeScene';
import s from './HeroLattice.module.css';

export default function HeroLattice() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mq.matches || connection?.saveData) return;

    let disposed = false;
    let handle: LatticeHandle | null = null;
    let canvas: HTMLCanvasElement | null = null;
    let idle: number | undefined;

    const start = () => {
      import('./latticeScene')
        .then(({ mountLattice }) => {
          if (disposed) return;
          canvas = document.createElement('canvas');
          canvas.className = s.canvas;
          host.appendChild(canvas);
          try {
            handle = mountLattice(canvas, { onReady: () => setLive(true) });
          } catch {
            // WebGL 不可用时只留静态线稿，页面其余部分不受影响
            canvas.remove();
            canvas = null;
          }
        })
        .catch(() => {});
    };

    if (typeof window.requestIdleCallback === 'function') {
      idle = window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      idle = window.setTimeout(start, 200);
    }

    const onMotionChange = () => {
      if (!mq.matches) return;
      handle?.dispose();
      handle = null;
      canvas?.remove();
      canvas = null;
      setLive(false);
    };
    mq.addEventListener('change', onMotionChange);

    return () => {
      disposed = true;
      if (idle !== undefined) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
        else clearTimeout(idle);
      }
      handle?.dispose();
      canvas?.remove();
      mq.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div ref={hostRef} className={`${s.lattice} ${live ? s.live : ''}`} aria-hidden="true">
      <svg className={s.static} viewBox="0 0 560 560" focusable="false">
        <path className={s.inkPath} d={SVG_LATTICE.black} fill="none" />
        <path className={s.sealPath} d={SVG_LATTICE.red} fill="none" />
      </svg>
    </div>
  );
}
