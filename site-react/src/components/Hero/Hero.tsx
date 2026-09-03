// Hero — 档案 01 · 首屏定位（React 版 · 含 r3f 3D 背景，仅一处）
import { lazy, Suspense, useEffect, useState } from 'react';
import s from './Hero.module.css';

// r3f 场景按需挂载：reduced-motion 或 WebGL 不可用时不渲染 3D
const Particles = lazy(() => import('./Particles'));

const props = [
  { href: '#capability', label: '独立交付' },
  { href: '#cases', label: '业务落地' },
  { href: '#principles', label: '边界诚实' },
];

export default function Hero() {
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    if (!gl) return;
    setShow3D(true);
    return () => { if (gl && (gl as WebGLRenderingContext).getExtension) { /* noop */ } };
  }, []);

  return (
    <section id="hero" className={`section hero ${s.hero}`}>
      {show3D && (
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      )}

      <div className={`container ${s.heroInner}`}>
        <div className="section-head">
          <span className="tag"><b>档案 01</b> · PERSONAL DOSSIER · 独立系统建构者</span>
        </div>
        <div className={s.heroRule}></div>

        <div className={s.heroGrid}>
          <div className={s.heroLeft}>
            <h1 className={s.heroTitle}>
              把复杂的事情，<br />变成可以运行的系统。
            </h1>
            <p className={s.heroSub}>8 年在真实系统里 · 工业数字化 · 全栈 · 真实交付</p>
            <a className={s.heroFocus} href="#cases">精选作品 01—04 ↗</a>
          </div>

          <div className={s.heroShots} aria-hidden="true">
            {/* 卡片 1：数据看板 */}
            <div className={s.uiCard}>
              <svg viewBox="0 0 180 200">
                <text x="8" y="14" fontSize="7" fill="var(--color-line)" fontFamily="monospace">数据概览</text>
                <rect x="6" y="24" width="78" height="50" rx="2" fill="none" stroke="var(--color-faint)" strokeWidth="0.8" />
                <text x="12" y="60" fontSize="20" fill="var(--color-ink)" fontWeight="700">32</text>
                <text x="12" y="70" fontSize="6" fill="var(--color-line)">设备总数</text>
                <rect x="96" y="24" width="78" height="50" rx="2" fill="none" stroke="var(--color-faint)" strokeWidth="0.8" />
                <text x="102" y="60" fontSize="20" fill="var(--color-ink)" fontWeight="700">98.6%</text>
                <text x="102" y="70" fontSize="6" fill="var(--color-line)">在线率</text>
                <polyline points="6,120 32,104 60,112 90,92 118,98 146,80 174,86" fill="none" stroke="var(--color-accent)" strokeWidth="1.4" />
                <line x1="6" y1="172" x2="174" y2="172" stroke="var(--color-faint)" strokeWidth="0.6" />
                <rect x="10" y="140" width="12" height="32" fill="var(--color-accent)" opacity="0.25" />
                <rect x="30" y="124" width="12" height="48" fill="var(--color-accent)" opacity="0.4" />
                <rect x="50" y="132" width="12" height="40" fill="var(--color-accent)" opacity="0.55" />
                <rect x="70" y="116" width="12" height="56" fill="var(--color-accent)" opacity="0.7" />
                <rect x="90" y="108" width="12" height="64" fill="var(--color-accent)" opacity="0.85" />
                <rect x="110" y="100" width="12" height="72" fill="var(--color-accent)" />
              </svg>
            </div>

            {/* 卡片 2：新建工单 */}
            <div className={s.uiCard}>
              <svg viewBox="0 0 180 200">
                <text x="8" y="14" fontSize="7" fill="var(--color-line)" fontFamily="monospace">新建工单</text>
                <rect x="6" y="24" width="168" height="22" rx="2" fill="none" stroke="var(--color-faint)" strokeWidth="0.8" />
                <text x="10" y="38" fontSize="7" fill="var(--color-line)">设备名称</text>
                <rect x="6" y="50" width="168" height="22" rx="2" fill="none" stroke="var(--color-faint)" strokeWidth="0.8" />
                <text x="10" y="64" fontSize="7" fill="var(--color-line)">故障描述</text>
                <rect x="6" y="76" width="168" height="22" rx="2" fill="none" stroke="var(--color-faint)" strokeWidth="0.8" />
                <text x="10" y="90" fontSize="7" fill="var(--color-line)">优先级</text>
                <rect x="6" y="102" width="168" height="22" rx="2" fill="none" stroke="var(--color-faint)" strokeWidth="0.8" />
                <text x="10" y="116" fontSize="7" fill="var(--color-line)">负责人</text>
                <rect x="6" y="148" width="40" height="26" rx="5" fill="var(--color-accent)" />
                <text x="16" y="165" fontSize="10" fill="#fff" fontWeight="700">创建</text>
                <text x="120" y="165" fontSize="7" fill="var(--color-line)">· 2 条待处理</text>
              </svg>
            </div>

            {/* 卡片 3：数据列表 */}
            <div className={s.uiCard}>
              <svg viewBox="0 0 180 200">
                <text x="8" y="14" fontSize="7" fill="var(--color-line)" fontFamily="monospace">数据列表</text>
                <text x="8" y="34" fontSize="6" fill="var(--color-line)">编号</text>
                <text x="50" y="34" fontSize="6" fill="var(--color-line)">设备</text>
                <text x="100" y="34" fontSize="6" fill="var(--color-line)">状态</text>
                <line x1="6" y1="40" x2="174" y2="40" stroke="var(--color-faint)" strokeWidth="0.6" />
                <g>
                  <text x="8" y="52" fontSize="7" fill="var(--color-ink)">001</text>
                  <text x="50" y="52" fontSize="7" fill="var(--color-ink)">设备A</text>
                  <circle cx="106" cy="49" r="3" fill="var(--color-accent)" /><text x="113" y="52" fontSize="7" fill="var(--color-ink)">正常</text>
                  <line x1="6" y1="58" x2="174" y2="58" stroke="var(--color-faint)" strokeWidth="0.4" />
                </g>
                <g>
                  <text x="8" y="70" fontSize="7" fill="var(--color-ink)">002</text>
                  <text x="50" y="70" fontSize="7" fill="var(--color-ink)">设备B</text>
                  <circle cx="106" cy="67" r="3" fill="var(--color-accent)" /><text x="113" y="70" fontSize="7" fill="var(--color-ink)">告警</text>
                  <line x1="6" y1="76" x2="174" y2="76" stroke="var(--color-faint)" strokeWidth="0.4" />
                </g>
                <g>
                  <text x="8" y="88" fontSize="7" fill="var(--color-ink)">003</text>
                  <text x="50" y="88" fontSize="7" fill="var(--color-ink)">设备C</text>
                  <circle cx="106" cy="85" r="3" fill="var(--color-accent)" /><text x="113" y="88" fontSize="7" fill="var(--color-ink)">正常</text>
                  <line x1="6" y1="94" x2="174" y2="94" stroke="var(--color-faint)" strokeWidth="0.4" />
                </g>
                <g>
                  <text x="8" y="106" fontSize="7" fill="var(--color-ink)">004</text>
                  <text x="50" y="106" fontSize="7" fill="var(--color-ink)">设备D</text>
                  <circle cx="106" cy="103" r="3" fill="none" stroke="var(--color-accent)" strokeWidth="1" /><text x="113" y="106" fontSize="7" fill="var(--color-ink)">维护</text>
                  <line x1="6" y1="112" x2="174" y2="112" stroke="var(--color-faint)" strokeWidth="0.4" />
                </g>
                <g>
                  <text x="8" y="124" fontSize="7" fill="var(--color-ink)">005</text>
                  <text x="50" y="124" fontSize="7" fill="var(--color-ink)">设备E</text>
                  <circle cx="106" cy="121" r="3" fill="var(--color-accent)" /><text x="113" y="124" fontSize="7" fill="var(--color-ink)">正常</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div className={s.heroFoot}>
          {props.map((p) => (
            <a key={p.href} className={s.heroProp} href={p.href}>
              <span>{p.label}</span>
              <span className={s.arrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}