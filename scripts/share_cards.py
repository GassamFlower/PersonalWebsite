"""scripts/share_cards.py — 按 v6 语言确定性绘制外站分享卡（X/即刻/微信），数据取自内容真源。

为什么自己画而不用 AI 生图：生图会产出假汉字（糊出来的笔画），直接踩诚实红线。
为什么从 src/content/cases/*.md 读而不是写死：一处事实两处发布，卡片不许讲出站内没有的话。
尺寸 1600x900（X 的 16:9 建议），头像 400x400。
输出落 site-react/public/share/ —— 部署线是 site-react（见 PROJECT_STATUS 2026-10-15）。
不要落 public/images/：.gitignore 的 images/ 无前导斜杠，会连带挡住部署目录。
"""
from PIL import Image, ImageDraw, ImageFont
import glob
import os
import re
import sys

BASE = (246, 246, 244)
INK = (26, 26, 23)
LINE = (139, 139, 136)
FAINT = (200, 200, 195)
SOFT = (99, 99, 96)
SEAL = (196, 60, 43)

W, H = 1600, 900
M = 96
URL = "gassamflower.github.io/PersonalWebsite"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "site-react", "public", "share")

LOCALE = "en" if "--locale" in sys.argv and "en" in sys.argv else "zh"

SERIF = next((p for p in [
    "C:/Windows/Fonts/NotoSerifSC-VF.ttf",
    "C:/Windows/Fonts/SourceHanSerifSC-Bold.otf",
    "C:/Windows/Fonts/simsun.ttc",
] if os.path.exists(p)), None)
SANS = next((p for p in [
    "C:/Windows/Fonts/msyh.ttc",
    "C:/Windows/Fonts/arial.ttf",
] if os.path.exists(p)), None)
if not SERIF or not SANS:
    raise SystemExit("[share] 缺中文字体，无法绘制（绝不允许回退成 AI 生图）")


def font(path, size, weight=None):
    f = ImageFont.truetype(path, size)
    if weight is not None:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
    return f


def wrap(d, text, f, maxw):
    lines, cur = [], ""
    for ch in text:
        if d.textlength(cur + ch, font=f) > maxw and cur:
            lines.append(cur)
            cur = ch
        else:
            cur += ch
    if cur:
        lines.append(cur)
    return lines


def read_case(path):
    body = open(path, encoding="utf-8").read()
    fm = re.match(r"^---\n(.*?)\n---", body, re.S)
    if not fm:
        return None
    data, key = {}, None
    for line in fm.group(1).split("\n"):
        m = re.match(r"^([A-Za-z][\w]*):\s*(.*)$", line)
        if m:
            key, val = m.group(1), m.group(2).strip().strip('"')
            data[key] = [] if val == "" else val
        elif re.match(r"^\s+-\s+", line) and key:
            data[key].append(re.sub(r"^\s+-\s+", "", line).strip())
    return data


def suffix(k, d):
    return (k + "En") if (LOCALE == "en" and (k + "En") in d and d[k + "En"]) else k


def crop_marks(d):
    cl = 30
    for x, y, dx, dy in [(M, M, -1, -1), (W - M, M, 1, -1), (M, H - M, -1, 1), (W - M, H - M, 1, 1)]:
        d.line([(x + dx * cl, y), (x, y)], fill=LINE, width=2)
        d.line([(x, y + dy * cl), (x, y)], fill=LINE, width=2)


def tri_marks(d):
    bx, by = W - M - 132, M - 6
    for i, c in enumerate([INK, SEAL, BASE]):
        x = bx + i * 44
        d.rectangle([x, by, x + 40, by + 22], fill=c, outline=LINE if c is BASE else None, width=1)


def seal(d, size, pos):
    sx, sy = pos
    d.rectangle([sx, sy, sx + size, sy + size], outline=SEAL, width=3)
    d.line([(sx + size / 2, sy), (sx + size / 2, sy + size)], fill=SEAL, width=2)
    d.line([(sx, sy + size / 2), (sx + size, sy + size / 2)], fill=SEAL, width=2)
    sf = font(SERIF, int(size * 0.33), 700)
    for i, ch in enumerate(["一", "个", "故", "事"]):
        cx = sx + (i % 2) * (size / 2)
        cy = sy + (i // 2) * (size / 2)
        b = d.textbbox((0, 0), ch, font=sf)
        d.text((cx + size / 4 - (b[2] - b[0]) / 2, cy + size / 4 - (b[3] - b[1]) / 2 - b[1]),
               ch, font=sf, fill=SEAL)


def footer(d, no):
    d.line([(M, H - 150), (W - M - 210, H - 150)], fill=FAINT, width=1)
    cat = f"CAT.2026-10 · REV v6 · {no} · " + (
        "内容匿名化脱敏，不涉及具体公司与客户" if LOCALE == "zh" else "anonymized, no real companies or clients")
    d.text((M, H - 130), cat, font=font(SANS, 22), fill=SOFT)
    d.text((M, H - 96), URL, font=font(SANS, 26), fill=INK)
    seal(d, 110, (W - M - 110, H - M - 110))


def case_card(d_data, out):
    img = Image.new("RGB", (W, H), BASE)
    d = ImageDraw.Draw(img)
    raw_no = str(d_data.get("order", "0"))
    no = int(raw_no) if raw_no.isdigit() else 0
    def pick(k):
        v = d_data.get(suffix(k, d_data))
        return v if v else d_data.get(k, "" if k != "stack" else [])

    title = str(pick("title"))
    status = str(d_data.get("status", ""))
    problem = str(pick("problem"))
    did = str(pick("whatIDid"))
    stack = pick("stack")
    if not isinstance(stack, list):
        stack = [str(stack)]

    eyebrow = "PERSONAL DOSSIER · " + ("档案 " if LOCALE == "zh" else "File ") + f"{no:0>2}"
    d.text((M, M - 10), eyebrow, font=font(SANS, 24), fill=SOFT)
    # 状态徽章放在三色标左侧：两者都在右上，叠在一起等于把「已上线」这个事实擦掉
    bw = d.textlength(status, font=font(SANS, 24))
    sx0 = W - M - 132 - 30 - bw - 20
    d.rectangle([sx0, M - 14, sx0 + bw + 20, M + 28], outline=INK, width=2)
    d.text((sx0 + 10, M - 10), status, font=font(SANS, 24), fill=INK)
    d.line([(M, M + 52), (W - M, M + 52)], fill=INK, width=2)

    y = M + 92
    tsize = 84 if len(title) <= 12 else 68
    tf = font(SERIF, tsize, 700)
    for line in wrap(d, title, tf, W - 2 * M)[:2]:
        d.text((M, y), line, font=tf, fill=INK)
        y += tsize + 14

    y += 40
    pf = font(SANS, 32)
    for line in wrap(d, problem, pf, W - 2 * M)[:2]:
        d.text((M, y), line, font=pf, fill=SOFT)
        y += 46

    y += 34
    d.text((M, y), ("我做了什么" if LOCALE == "zh" else "What I did"), font=font(SANS, 22), fill=SEAL)
    y += 40
    df = font(SANS, 34)
    did_lines = wrap(d, did, df, W - 2 * M)
    room = (H - 150) - 46 - y
    max_lines = max(1, min(4, room // 50))
    for line in did_lines[:max_lines]:
        d.text((M, y), line, font=df, fill=INK)
        y += 50

    # 技术栈一行画到边就断，不能让它溢出裁切线外（溢出=成图被切）
    cf = font(SANS, 28)
    chips, acc = "", ""
    for item in stack:
        cand = (acc + " / " + str(item)) if acc else str(item)
        if d.textlength(cand + "…", font=cf) > W - 2 * M:
            break
        acc = cand
    chips = acc + ("…" if len(acc.split(" / ")) < len(stack) else "")
    d.text((M, y + 8), chips, font=cf, fill=SOFT)

    crop_marks(d)
    tri_marks(d)
    footer(d, f"CORE {no:0>2}")
    img.save(out, optimize=True)
    return out


def statement_card(out):
    img = Image.new("RGB", (W, H), BASE)
    d = ImageDraw.Draw(img)
    d.text((M, M - 10), "PERSONAL DOSSIER · " + ("独立系统建构者" if LOCALE == "zh" else "Independent systems builder"),
           font=font(SANS, 24), fill=SOFT)
    d.line([(M, M + 52), (W - M, M + 52)], fill=INK, width=2)
    tf = font(SERIF, 96, 700)
    l1 = "把一团乱麻，" if LOCALE == "zh" else "Turning a tangle,"
    l2 = "理成能用的系统" if LOCALE == "zh" else "into a working system"
    d.text((M, 190), l1, font=tf, fill=INK)
    d.text((M, 312), l2, font=tf, fill=INK)
    gates = (["立项门", "架构门", "业务门", "上线门"] if LOCALE == "zh"
             else ["Scope gate", "Architecture gate", "Business gate", "Launch gate"])
    gw = (W - 2 * M - 3 * 24) / 4
    for i, g in enumerate(gates):
        x = M + i * (gw + 24)
        d.rectangle([x, 500, x + gw, 566], outline=INK, width=2)
        gf = font(SANS, 28 if LOCALE == "zh" else 22)
        b = d.textbbox((0, 0), g, font=gf)
        d.text((x + (gw - b[2] + b[0]) / 2, 518 - b[1]), g, font=gf, fill=INK)
    sub = ("四道门禁 · 单一信源 SSOT · 已交付 / 会用 / 在学 三档如实标注"
           if LOCALE == "zh" else
           "Four gates · single source of truth · Delivered / Working knowledge / Learning")
    d.text((M, 604), sub, font=font(SANS, 30), fill=SOFT)
    crop_marks(d)
    tri_marks(d)
    footer(d, "METHOD")
    img.save(out, optimize=True)
    return out


def avatar(out, size=400):
    img = Image.new("RGB", (size, size), BASE)
    d = ImageDraw.Draw(img)
    m = int(size * 0.14)
    cl = int(size * 0.07)
    for x, y, dx, dy in [(m, m, -1, -1), (size - m, m, 1, -1), (m, size - m, -1, 1), (size - m, size - m, 1, 1)]:
        d.line([(x + dx * cl, y), (x, y)], fill=LINE, width=2)
        d.line([(x, y + dy * cl), (x, y)], fill=LINE, width=2)
    ss = int(size * 0.44)
    seal(d, ss, ((size - ss) / 2, (size - ss) / 2 - int(size * 0.03)))
    img.save(out, optimize=True)
    return out


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    written = []
    files = sorted(glob.glob(os.path.join(ROOT, "src", "content", "cases", "*.md")))
    n = 0
    for f in files:
        c = read_case(f)
        if not c or not c.get("published", True):
            continue
        n += 1
        slug = os.path.basename(f)[:-3]
        written.append(case_card(c, os.path.join(OUT_DIR, f"{slug}{'-en' if LOCALE == 'en' else ''}.png")))
    written.append(statement_card(os.path.join(OUT_DIR, f"method{'-en' if LOCALE == 'en' else ''}.png")))
    if LOCALE == "zh":
        written.append(avatar(os.path.join(ROOT, "site-react", "public", "avatar.png")))
    for p in written:
        print(f"[share] {os.path.relpath(p, ROOT)}  {os.path.getsize(p) / 1024:.1f} kB")
    print(f"[share] locale={LOCALE} 共 {len(written)} 张  衬线={os.path.basename(SERIF)}")
