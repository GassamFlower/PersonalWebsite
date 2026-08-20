// @ts-check
import { defineConfig } from 'astro/config';

// 纯静态单页站：无适配器，输出静态 HTML/CSS/少量 JS。
// 部署：GitHub Pages（唯一推荐），见 .github/workflows/deploy.yml
//
// 两种 Pages 形态（择一，改下面的 site/base 即可）：
//  A) 个人主页仓 <用户名>.github.io  → site 填该地址，base '/'
//  B) 项目仓 <用户名>.github.io/<仓库名> → site 填 <用户名>.github.io，base '/<仓库名>/'
// 本仓暂按 A（个人主页仓）预设；若你用的是 B，把 base 改成 '/<仓库名>/' 并在 md 里的
// 图片绝对路径('/xxx.png')前补上相同 base。
export default defineConfig({
  site: 'https://gassamflower.github.io',
  base: '/',
  output: 'static',
  build: {
    // 详情见 docs 视觉准绳：克制、极简
  },
});