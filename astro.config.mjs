// @ts-check
import { defineConfig } from 'astro/config';

// 纯静态单页站：无适配器，输出静态 HTML/CSS/少量 JS。
// 部署：GitHub Pages（唯一推荐），见 .github/workflows/deploy.yml
//
// 本项目是【项目仓】PersonalWebsite.git → Pages URL:
//   https://gassamflower.github.io/PersonalWebsite/
// 故 base 必须为 '/PersonalWebsite/'（缺了会导致资源 404）。
// 若是个人主页仓 <用户名>.github.io 则 base 改 '/'。
export default defineConfig({
  site: 'https://gassamflower.github.io',
  base: '/PersonalWebsite/',
  output: 'static',
  build: {
    // 详情见 docs 视觉准绳：克制、极简
  },
});