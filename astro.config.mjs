// @ts-check
import { defineConfig } from 'astro/config';

// 纯静态单页站：无适配器，输出静态 HTML/CSS/少量 JS。
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  build: {
    // 详情见 docs 视觉准绳：克制、极简
  },
});