// Particles.tsx — Hero 3D 浮尘粒子（r3f 版 · 单色墨蓝 · 三层深度 + 鼠标风感 + 呼吸）
// 纪律：由外层 Hero 决定是否挂载（prefers-reduced-motion / WebGL 不可用时不渲染）。
// 用 CanvasTexture 软粒子贴图 + NormalBlending（白底可见），对齐原 three 脚本。
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = '#2e4a8c';

function makeSoftTexture(): THREE.Texture {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

interface LayerDef {
  n: number; size: number; op: number;
  spread: [number, number, number];
  amp: number; spd: number; rot: number; depth: number;
}

function ParticleLayer({ def, soft }: { def: LayerDef; soft: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const arr = new Float32Array(def.n * 3);
    for (let i = 0; i < def.n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * def.spread[0];
      arr[i * 3 + 1] = (Math.random() - 0.5) * def.spread[1];
      arr[i * 3 + 2] = (Math.random() - 0.5) * def.spread[2];
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, [def]);

  useFrame((state) => {
    if (!group.current) return;
    const g = group.current;
    const t = state.clock.elapsedTime;
    // 慢自转 + 浮沉呼吸
    g.rotation.y += def.rot * 60;
    g.position.y = Math.sin(t * def.spd) * def.amp;
    // 鼠标“风感”：r3f state.pointer 已归一化 (-1..1)，按 depth 不同位移倍数 → 沉浸深度
    g.position.x = state.pointer.x * def.depth * 1.6;
    g.position.z = state.pointer.y * def.depth * 0.6;
  });

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <pointsMaterial
          color={ACCENT}
          map={soft}
          size={def.size}
          transparent
          opacity={def.op}
          depthWrite={false}
          blending={THREE.NormalBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// 桌面/移动降档（对齐原脚本 mobile 分支）
const isMobile = typeof window !== 'undefined' && window.innerWidth < 720;
const LAYER_DEFS: LayerDef[] = isMobile
  ? [
      { n: 260, size: 0.2, op: 0.3, spread: [20, 14, 9], amp: 0.5, spd: 0.4, rot: 0.0003, depth: 0.2 },
      { n: 200, size: 0.13, op: 0.4, spread: [16, 11, 7], amp: 0.8, spd: 0.55, rot: 0.0006, depth: 0.45 },
      { n: 140, size: 0.08, op: 0.55, spread: [12, 8, 5], amp: 1.1, spd: 0.7, rot: 0.0009, depth: 0.9 },
    ]
  : [
      { n: 900, size: 0.2, op: 0.28, spread: [22, 15, 14], amp: 0.4, spd: 0.35, rot: 0.00025, depth: 0.16 },
      { n: 700, size: 0.13, op: 0.38, spread: [18, 12, 10], amp: 0.7, spd: 0.5, rot: 0.0005, depth: 0.34 },
      { n: 450, size: 0.08, op: 0.55, spread: [13, 9, 6], amp: 1.2, spd: 0.65, rot: 0.0008, depth: 0.7 },
    ];

export default function Particles() {
  const soft = useMemo(() => makeSoftTexture(), []);
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 12], fov: 60 }}
      onCreated={(s) => s.gl.setClearColor(0x000000, 0)}
    >
      {LAYER_DEFS.map((d, i) => (
        <ParticleLayer key={i} def={d} soft={soft} />
      ))}
    </Canvas>
  );
}