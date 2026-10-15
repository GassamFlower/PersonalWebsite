// ui.ts — 界面层文案字典（组件里原本硬编码的中文串，逐条搬进来，一条不改字）。
// 内容真源仍是 src/content/**（案例/成长/技能不在这里）；本文件只管 UI 骨架上的字。
// 纪律：en 补齐之前不许发 /en/ —— prerender 的键位守卫会直接 build 失败，不静默回退中文。
import type { Locale } from './locale';

export interface ShellUi {
  skipLink: string;
}

export interface HeroUi {
  plateRail: string;
  eyebrowNo: string;
  siteLatin: string;
  role: string;
  railGate: string;
  signature: string;
  titleLine1: string;
  titleLine2: string;
  subline: string;
  focusCta: string;
  dossierAria: string;
  gateLabel: string;
  releasedLabel: string;
  revLabel: string;
  dossierName: string;
  sealVerified: string;
  worksCta: string;
  propCapability: string;
  propCases: string;
  propPrinciples: string;
}

export interface ZoneUi {
  shell: ShellUi;
  hero: HeroUi;
}

const zh: ZoneUi = {
  shell: {
    skipLink: '跳到正文',
  },
  hero: {
    plateRail: '封面 · COVER',
    eyebrowNo: '档案 01',
    siteLatin: 'PERSONAL DOSSIER',
    role: '独立系统建构者',
    railGate: 'DOSSIER',
    signature: '一个故事',
    titleLine1: '把复杂的事情，',
    titleLine2: '变成可以运行的系统。',
    subline: '8 年在真实系统里 · 工业数字化 · 全栈 · 真实交付',
    focusCta: '聊聊你的问题 →',
    dossierAria: '已验证事实档案卡',
    gateLabel: 'GATE✓',
    releasedLabel: '上线',
    revLabel: 'REV',
    dossierName: '档案卡',
    sealVerified: '已验证',
    worksCta: '精选作品 01—04',
    propCapability: '独立交付',
    propCases: '业务落地',
    propPrinciples: '边界诚实',
  },
};

// 英文措辞须用户逐条裁决后才落字（docs/h-英文版-i18n.md §3），故这里刻意留空。
// 类型上允许逐区渐进补全，完整性由 prerender 的 missingKeys 守卫在构建期把关。
type PartialUi = { [Z in keyof ZoneUi]?: Partial<ZoneUi[Z]> };

const en: PartialUi = {
  shell: {},
  hero: {},
};

export const ui: { zh: ZoneUi; en: PartialUi } = { zh, en };

// 取当前语言的字典。en 在守卫放行前不会被渲染，这里的断言只服务于类型收窄。
export function uiFor(locale: Locale): ZoneUi {
  return (locale === 'zh' ? ui.zh : (ui.en as ZoneUi));
}

// 守卫用：返回该语言相对中文缺失的键路径，例如 'hero.titleLine1'。
export function missingKeys(locale: Locale): string[] {
  const base = ui.zh as unknown as Record<string, Record<string, string>>;
  const target = (locale === 'zh' ? ui.zh : ui.en) as unknown as Record<string, Record<string, string> | undefined>;
  const missing: string[] = [];
  for (const zone of Object.keys(base)) {
    const dict = target[zone];
    for (const key of Object.keys(base[zone])) {
      const value = dict?.[key];
      if (typeof value !== 'string' || value.length === 0) {
        missing.push(`${zone}.${key}`);
      }
    }
  }
  return missing;
}
