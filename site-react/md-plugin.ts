// md-plugin.ts — 把内容真源 md 在构建/开发服务侧解析成 { data, body } 模块。
// gray-matter 是 Node 库（内部用 Buffer），只允许跑在这里（Node 侧）；
// 浏览器 bundle 直接吃 JSON 模块，dev 与 build 行为一致，白屏风险为零。
import matter from 'gray-matter';
import type { Plugin } from 'vite';

export function mdPlugin(): Plugin {
  return {
    name: 'content-md-to-json',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return;
      const { data, content } = matter(code);
      return `export default ${JSON.stringify({ data, body: content })};`;
    },
  };
}
