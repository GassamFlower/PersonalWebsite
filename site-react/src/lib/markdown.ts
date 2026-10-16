// markdown.ts — 写作区正文的**块级子集**解析（docs/k §3）。
// 一行一个块，只认三种起手法：`## ` 小标题、`- ` 列表项、其余为段落。
// 刻意不引第三方解析器、不产 HTML 字符串（无 dangerouslySetInnerHTML）；
// 行内语法（加粗/链接/行内代码）一律不支持，由 scripts/check-content.mjs 规则④ 在 build 时拦下，
// 免得真源写了语法而页面上原样吐出来。
export type Block =
  | { kind: 'h'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] };

export function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith('## ')) {
      blocks.push({ kind: 'h', text: line.slice(3) });
      continue;
    }
    if (line.startsWith('- ')) {
      const last = blocks[blocks.length - 1];
      if (last && last.kind === 'ul') last.items.push(line.slice(2));
      else blocks.push({ kind: 'ul', items: [line.slice(2)] });
      continue;
    }
    blocks.push({ kind: 'p', text: line });
  }
  return blocks;
}
