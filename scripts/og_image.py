"""scripts/og_image.py — 生成分享卡片 og.png（1200x630），一次写出两条线的静态根

为什么自己画：微信/钉钉里第一次看到本站的人靠这张卡片判断气质；
用 AI 生图会产出假汉字（糊出来的笔画），直接踩诚实红线。
v6 语言：纸白底 + 墨黑细线 + 一处朱砂署名章 + 裁切线 + 三色标。
为什么放 public/og.png 而不是 public/images/：.gitignore 里的 images/ 用来挡生图草稿，
放进去的文件不会进仓库，CI 检出的站点也就没有这张图。
"""
from PIL import Image, ImageDraw, ImageFont
import os

BASE = (246, 246, 244)
INK = (26, 26, 23)
LINE = (139, 139, 136)
FAINT = (200, 200, 195)
SOFT = (99, 99, 96)
SEAL = (196, 60, 43)

W, H = 1200, 630
SERIF_CANDIDATES = [
    "C:/Windows/Fonts/NotoSerifSC-VF.ttf",
    "C:/Windows/Fonts/SourceHanSerifSC-Bold.otf",
    "C:/Windows/Fonts/simsun.ttc",
]
SANS_CANDIDATES = [
    "C:/Windows/Fonts/msyh.ttc",
    "C:/Windows/Fonts/arial.ttf",
]


def pick(cands):
    for p in cands:
        if os.path.exists(p):
            return p
    raise SystemExit(f"[og] 找不到字体：{cands}")


def font(path, size, weight=None):
    f = ImageFont.truetype(path, size)
    if weight is not None:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass  # 非可变字体时忽略，仍有真实字形可用
    return f


serif = pick(SERIF_CANDIDATES)
sans = pick(SANS_CANDIDATES)

img = Image.new("RGB", (W, H), BASE)
d = ImageDraw.Draw(img)
M = 72

# 顶部眉栏 + 主规则线
d.text((M, 56), "PERSONAL DOSSIER", font=font(sans, 22), fill=SOFT)
d.text((M, 88), "独立交付档案 · 一个故事", font=font(sans, 20), fill=SOFT)
d.line([(M, 132), (W - M, 132)], fill=INK, width=2)

# 主张（衬线大字，v6 的 --text-hero 档）
d.text((M, 176), "把一团乱麻，", font=font(serif, 92, 700), fill=INK)
d.text((M, 288), "理成能用的系统", font=font(serif, 92, 700), fill=INK)

# 副说明 + 辅助发线
d.text((M, 420), "系统建构 / 数据与流程整理 / 内网私有化交付", font=font(sans, 28), fill=SOFT)
d.line([(M, 476), (W - M - 180, 476)], fill=FAINT, width=1)
d.text((M, 496), "CAT.2026-10 · REV v6 · 展示内容均经匿名化脱敏，不涉及具体公司与客户信息",
       font=font(sans, 20), fill=SOFT)

# 右侧三色标（墨 / 朱 / 纸）
bx, by = W - M - 132, 56
for i, c in enumerate([INK, SEAL, BASE]):
    x = bx + i * 44
    d.rectangle([x, by, x + 40, by + 22], fill=c, outline=LINE if c is BASE else None, width=1)

# 朱砂署名章 2x2 印面（与验收章分立，全站唯一）
ss = 132
sx, sy = W - M - ss, H - M - ss
d.rectangle([sx, sy, sx + ss, sy + ss], outline=SEAL, width=3)
d.line([(sx + ss / 2, sy), (sx + ss / 2, sy + ss)], fill=SEAL, width=2)
d.line([(sx, sy + ss / 2), (sx + ss, sy + ss / 2)], fill=SEAL, width=2)
chars = ["一", "个", "故", "事"]
sf = font(serif, 46, 700)
for i, ch in enumerate(chars):
    cx = sx + (i % 2) * (ss / 2)
    cy = sy + (i // 2) * (ss / 2)
    box = d.textbbox((0, 0), ch, font=sf)
    d.text((cx + ss / 4 - (box[2] - box[0]) / 2, cy + ss / 4 - (box[3] - box[1]) / 2 - box[1]),
           ch, font=sf, fill=SEAL)

# 四角裁切线
cl = 26
for x, y, dx, dy in [(M, M, -1, -1), (W - M, M, 1, -1), (M, H - M, -1, 1), (W - M, H - M, 1, 1)]:
    d.line([(x + dx * cl, y), (x, y)], fill=LINE, width=2)
    d.line([(x, y + dy * cl), (x, y)], fill=LINE, width=2)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTS = [
    os.path.join(ROOT, "public", "og.png"),
    os.path.join(ROOT, "site-react", "public", "og.png"),
]
for out in OUTS:
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, optimize=True)
    print(f"[og] 写出 {os.path.relpath(out, ROOT)}  {os.path.getsize(out) / 1024:.1f} kB  衬线={os.path.basename(serif)}")
