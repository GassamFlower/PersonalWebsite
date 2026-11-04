// lattice.ts — 「经纬」线结构：3D 场景与静态 SVG 共用同一套坐标。
// 目标结构 = 沿 z 轴排列的七道框架 + 纵向连杆 + 侧面斜撑，读作一栋剖开的骨架建筑。
// 初始状态 = 同一批线段散落在球体里，形成一团乱麻；动画只做两端点的位移，不生成随机粒子。
export type Vec3 = [number, number, number];

export interface Segment {
  a: Vec3;
  b: Vec3;
}

export interface Lattice {
  segments: Segment[];
  red: Vec3[];
}

// 固定种子：服务端与客户端得到同一组坐标，避免水合前后线稿跳变。
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function subdivide(a: Vec3, b: Vec3, parts: number): Segment[] {
  const out: Segment[] = [];
  for (let i = 0; i < parts; i += 1) {
    const t0 = i / parts;
    const t1 = (i + 1) / parts;
    out.push({
      a: [a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0, a[2] + (b[2] - a[2]) * t0],
      b: [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1, a[2] + (b[2] - a[2]) * t1],
    });
  }
  return out;
}

function targetLongLines(): [Vec3, Vec3][] {
  const x = 0.95;
  const y = 0.72;
  const zs = [-1.05, -0.7, -0.35, 0, 0.35, 0.7, 1.05];
  const lines: [Vec3, Vec3][] = [];

  for (const z of zs) {
    // 每道框架：外圈 + 中十字
    lines.push([[-x, -y, z], [x, -y, z]]);
    lines.push([[x, -y, z], [x, y, z]]);
    lines.push([[x, y, z], [-x, y, z]]);
    lines.push([[-x, y, z], [-x, -y, z]]);
    lines.push([[0, -y, z], [0, y, z]]);
    lines.push([[-x, 0, z], [x, 0, z]]);
  }

  // 纵向连杆：四角 + 中十字的端点
  const rails: [number, number][] = [
    [-x, -y], [x, -y], [x, y], [-x, y],
    [0, -y], [0, y], [-x, 0], [x, 0],
  ];
  for (const [px, py] of rails) {
    lines.push([[px, py, zs[0]], [px, py, zs[zs.length - 1]]]);
  }

  // 侧面斜撑：跨两道框架，给骨架一点受力方向
  for (let i = 0; i < zs.length - 1; i += 2) {
    lines.push([[-x, -y, zs[i]], [x, y, zs[i + 1]]]);
    lines.push([[x, -y, zs[i]], [-x, y, zs[i + 1]]]);
  }

  return lines;
}

export function latticeTargets(partsPerLine: number): Lattice {
  const long = targetLongLines();
  const segments = long.flatMap(([a, b]) => subdivide(a, b, Math.max(1, partsPerLine)));
  // 朱线从骨架内部穿出，跨过档案卡后停在上右角纸面；末端不回到结构
  const red: Vec3[] = [
    [-0.62, -0.5, -0.9],
    [-0.2, -0.25, -0.5],
    [0.18, 0.0, -0.1],
    [0.4, 0.2, 0.25],
    [0.2, 0.05, 0.55],
    [0.45, -0.2, 0.2],
    [0.85, -0.45, -0.1],
    [1.2, -0.7, -0.45],
    [1.5, -0.95, -0.8],
  ];
  return { segments, red };
}

export interface SceneSegment {
  start: [Vec3, Vec3];
  target: [Vec3, Vec3];
  delay: number;
}

export interface SceneData {
  black: SceneSegment[];
  red: { starts: Vec3[]; targets: Vec3[]; delays: number[] };
}

// 3D 场景数据：每条线段一对起点与终点，delay 让收束有先后。
export function sceneData(partsPerLine: number, seed = 20261103): SceneData {
  const { segments, red } = latticeTargets(partsPerLine);
  const rand = mulberry32(seed);
  const point = (): Vec3 => {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(rand() * 2 - 1);
    const r = 0.35 + Math.cbrt(rand()) * 1.05;
    return [r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];
  };

  const black = segments.map((seg, i) => ({
    start: [point(), point()] as [Vec3, Vec3],
    target: [seg.a, seg.b] as [Vec3, Vec3],
    delay: Math.min(0.34, (i / segments.length) * 0.2 + rand() * 0.16),
  }));

  const starts = red.map(() => point());
  const delays = red.map((_, i) => 0.12 + (i / red.length) * 0.3);

  return { black, red: { starts, targets: red, delays } };
}

// 等距投影：给静态 SVG 用；3D 场景用自己的透视相机。
function project([x, y, z]: Vec3): [number, number] {
  return [(x - z) * 0.866, (x + z) * 0.5 - y * 0.9];
}

export interface SvgLattice {
  black: string;
  red: string;
}

// 构建静态线稿：与 3D 同一组坐标，无 JS、reduced-motion、WebGL 不可用时都靠它。
export function svgLattice(partsPerLine = 6): SvgLattice {
  const { segments, red } = latticeTargets(partsPerLine);
  const all = [...segments.flatMap((s) => [s.a, s.b]), ...red].map(project);
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  const size = 560;
  // 留白要先把可用边长扣掉再定比例，否则线稿会顶出 viewBox（旧实现只挪原点不缩比例）。
  const pad = size * 0.14;
  const avail = size - pad * 2;
  const scale = Math.min(avail / (maxX - minX || 1), avail / (maxY - minY || 1));
  const ox = pad + (avail - (maxX - minX) * scale) / 2;
  const oy = pad + (avail - (maxY - minY) * scale) / 2;
  const map = ([x, y]: Vec3 | [number, number]) => [
    ox + (x - minX) * scale,
    oy + (maxY - y) * scale,
  ];

  const black = segments
    .map(({ a, b }) => {
      const [x1, y1] = map(project(a));
      const [x2, y2] = map(project(b));
      return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    })
    .join('');

  const redPath = red
    .map((p, i) => {
      const [x, y] = map(project(p));
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join('');

  return { black, red: redPath };
}

// 静态图不细分：直线再细分的路径与原始线完全重合，只会让 inline SVG 体积翻倍。
export const SVG_LATTICE = svgLattice(1);
