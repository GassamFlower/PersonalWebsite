// latticeScene.ts — 「经纬」3D 场景：一团墨线在纸面上收束成结构框，一根朱线留在外面。
// 只用 three 原生 API：一个画布、一组 LineSegments、一条 Line、一次进场动画。
// 几何与静态 SVG 同源（lattice.ts），坐标由固定种子生成，刷新不换形状。
import * as THREE from 'three';
import { sceneData } from './lattice';

export interface LatticeOptions {
  onReady?: () => void;
}

export interface LatticeHandle {
  dispose: () => void;
}

const INK = 0x1a1a1a;
const SEAL = 0xbc4832;

// easeOutExpo：快收尾慢，线的落位像被吸到该在的地方
function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - 2 ** (-10 * t);
}

export function mountLattice(canvas: HTMLCanvasElement, opts: LatticeOptions = {}): LatticeHandle {
  const compact = window.matchMedia('(max-width: 860px)').matches;
  const parts = compact ? 8 : 16;
  const dprCap = compact ? 1.2 : 1.5;
  const data = sceneData(parts);

  const count = data.black.length;
  const targets = new Float32Array(count * 6);
  const starts = new Float32Array(count * 6);
  const delays = new Float32Array(count * 2);
  data.black.forEach((seg, i) => {
    const o = i * 6;
    starts[o] = seg.start[0][0];
    starts[o + 1] = seg.start[0][1];
    starts[o + 2] = seg.start[0][2];
    starts[o + 3] = seg.start[1][0];
    starts[o + 4] = seg.start[1][1];
    starts[o + 5] = seg.start[1][2];
    targets[o] = seg.target[0][0];
    targets[o + 1] = seg.target[0][1];
    targets[o + 2] = seg.target[0][2];
    targets[o + 3] = seg.target[1][0];
    targets[o + 4] = seg.target[1][1];
    targets[o + 5] = seg.target[1][2];
    delays[i * 2] = seg.delay;
    delays[i * 2 + 1] = Math.min(0.36, seg.delay + 0.025);
  });
  const positions = new Float32Array(starts);

  const inkGeo = new THREE.BufferGeometry();
  inkGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const inkMat = new THREE.LineBasicMaterial({
    color: INK,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const ink = new THREE.LineSegments(inkGeo, inkMat);

  const redCount = data.red.targets.length;
  const redStarts = new Float32Array(redCount * 3);
  const redTargets = new Float32Array(redCount * 3);
  data.red.starts.forEach((p, i) => {
    redStarts.set(p, i * 3);
    redTargets.set(data.red.targets[i], i * 3);
  });
  const redPositions = new Float32Array(redStarts);
  const redGeo = new THREE.BufferGeometry();
  redGeo.setAttribute('position', new THREE.BufferAttribute(redPositions, 3));
  const redMat = new THREE.LineBasicMaterial({
    color: SEAL,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const red = new THREE.Line(redGeo, redMat);

  // 交点节点：两端框架的八个角。收束完成后再淡入，不参与收束位移，避免节点先浮在乱线上。
  // 移动端只留正面四个，小屏上点太密会抢掉线稿。
  const nodePoints: [number, number, number][] = compact
    ? [[-0.95, 0.72, 1.05], [0.95, 0.72, 1.05], [-0.95, -0.72, 1.05], [0.95, -0.72, 1.05]]
    : [[-0.95, 0.72, -1.05], [0.95, 0.72, -1.05], [-0.95, -0.72, -1.05], [0.95, -0.72, -1.05],
      [-0.95, 0.72, 1.05], [0.95, 0.72, 1.05], [-0.95, -0.72, 1.05], [0.95, -0.72, 1.05]];
  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(nodePoints.flat()), 3));
  // 节点要比线（收束后 0.5）略重才读得出是交点；2.5px / 0.55 是目测下限
  const nodeMat = new THREE.PointsMaterial({
    color: INK,
    size: 2.5,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const nodes = new THREE.Points(nodeGeo, nodeMat);

  // 朱线脉冲：沿朱线折线按弧长取 6% 的一小段，10s 走完一遍；首尾 8% 淡入淡出。
  // 用点阵而不是短线：1px 线叠 1px 线几乎看不出，2.5px 朱点在纸面上才读得出在走。
  const redPts = data.red.targets;
  const segLen: number[] = [];
  let redLen = 0;
  for (let i = 1; i < redPts.length; i += 1) {
    const a = redPts[i - 1];
    const b = redPts[i];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    segLen.push(len);
    redLen += len;
  }
  const sampleRed = (dist: number, out: Float32Array, o: number) => {
    const d = Math.min(Math.max(dist, 0), redLen);
    let acc = 0;
    for (let i = 0; i < segLen.length; i += 1) {
      if (d <= acc + segLen[i] || i === segLen.length - 1) {
        const t = segLen[i] > 0 ? (d - acc) / segLen[i] : 0;
        const a = redPts[i];
        const b = redPts[i + 1];
        out[o] = a[0] + (b[0] - a[0]) * t;
        out[o + 1] = a[1] + (b[1] - a[1]) * t;
        out[o + 2] = a[2] + (b[2] - a[2]) * t;
        return;
      }
      acc += segLen[i];
    }
  };
  const pulseCount = compact ? 8 : 12;
  const pulseLenData = redLen * 0.06;
  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pulseCount * 3), 3));
  // 同样用实心朱点但比底线更实：0.75 的线偏淡，0.9 的点才读得出「在走」
  const pulseMat = new THREE.PointsMaterial({
    color: SEAL,
    size: 2.5,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const pulse = new THREE.Points(pulseGeo, pulseMat);

  const group = new THREE.Group();
  group.add(ink, red, nodes, pulse);

  const scene = new THREE.Scene();
  scene.add(group);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  // 等距偏右上的视角，让七道框架与斜撑同时可读
  const dir = new THREE.Vector3(0.62, 0.42, 0.78).normalize().multiplyScalar(6.6);
  camera.position.copy(dir);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 0);

  const parent = canvas.parentElement ?? canvas;
  const resize = () => {
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(parent);

  // 指针视差与滚动倾角：移动端不监听指针，减少无谓输入与电量消耗
  let pointerX = 0;
  let pointerY = 0;
  let parallaxX = 0;
  let parallaxY = 0;
  const onPointer = (e: PointerEvent) => {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const resetPointer = () => {
    pointerX = 0;
    pointerY = 0;
  };
  if (!compact) {
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('blur', resetPointer);
  }

  let scrollTilt = -0.08;
  const hero = canvas.closest('section');
  const onScroll = () => {
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    scrollTilt = (p - 0.5) * 0.16;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 画布离开视口或页面隐藏时停帧；回到视口继续，不重置进度
  let visible = true;
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0 },
  );
  io.observe(parent);

  const startAt = performance.now();
  const duration = 1800;
  let assembled = false;
  let ready = false;
  let last = 0;
  let raf = 0;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    if (compact && last && now - last < 1000 / 30 - 1) return;
    last = now;

    const elapsed = now - startAt;
    if (!assembled) {
      const progress = Math.min(1, elapsed / duration);
      const inkPos = inkGeo.getAttribute('position') as THREE.BufferAttribute;
      const arr = inkPos.array as Float32Array;
      for (let i = 0; i < count; i += 1) {
        const o = i * 6;
        for (let v = 0; v < 2; v += 1) {
          const d = delays[i * 2 + v];
          const t = easeOutExpo(Math.min(1, Math.max(0, (progress - d) / 0.62)));
          const p = o + v * 3;
          arr[p] = starts[p] + (targets[p] - starts[p]) * t;
          arr[p + 1] = starts[p + 1] + (targets[p + 1] - starts[p + 1]) * t;
          arr[p + 2] = starts[p + 2] + (targets[p + 2] - starts[p + 2]) * t;
        }
      }
      inkPos.needsUpdate = true;

      const redPos = redGeo.getAttribute('position') as THREE.BufferAttribute;
      const rArr = redPos.array as Float32Array;
      for (let i = 0; i < redCount; i += 1) {
        const d = data.red.delays[i];
        const t = easeOutExpo(Math.min(1, Math.max(0, (progress - d) / 0.62)));
        const p = i * 3;
        rArr[p] = redStarts[p] + (redTargets[p] - redStarts[p]) * t;
        rArr[p + 1] = redStarts[p + 1] + (redTargets[p + 1] - redStarts[p + 1]) * t;
        rArr[p + 2] = redStarts[p + 2] + (redTargets[p + 2] - redStarts[p + 2]) * t;
      }
      redPos.needsUpdate = true;

      inkMat.opacity = 0.18 + 0.32 * progress;
      redMat.opacity = 0.28 + 0.47 * progress;
      if (progress >= 1) assembled = true;
    }

    if (assembled) {
      // 节点在收束完成后 400ms 淡入；脉冲同刻起跑，首尾各 8% 淡入淡出
      nodeMat.opacity = 0.55 * Math.min(1, (elapsed - duration) / 400);

      const period = compact ? 14000 : 10000;
      const phase = ((elapsed - duration) % period) / period;
      const startDist = phase * (redLen + pulseLenData) - pulseLenData;
      const pulsePos = pulseGeo.getAttribute('position') as THREE.BufferAttribute;
      const pArr = pulsePos.array as Float32Array;
      for (let k = 0; k < pulseCount; k += 1) {
        sampleRed(startDist + (pulseLenData * k) / (pulseCount - 1), pArr, k * 3);
      }
      pulsePos.needsUpdate = true;
      const edge = Math.min(1, phase / 0.08, (1 - phase) / 0.08);
      pulseMat.opacity = 0.9 * Math.max(0, edge);
    }

    // 进场结束后只留极慢自转（±0.09 rad）与指针视差（±0.06 rad）
    const drift = assembled ? Math.sin(((elapsed - duration) / 1000) * 0.22) * 0.09 : 0;
    parallaxX += (pointerX * 0.06 - parallaxX) * 0.05;
    parallaxY += (pointerY * 0.06 - parallaxY) * 0.05;
    group.rotation.y = drift + parallaxX;
    group.rotation.x = parallaxY + scrollTilt;

    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
  };
  raf = requestAnimationFrame(frame);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('blur', resetPointer);
      window.removeEventListener('scroll', onScroll);
      inkGeo.dispose();
      inkMat.dispose();
      redGeo.dispose();
      redMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      renderer.dispose();
    },
  };
}
