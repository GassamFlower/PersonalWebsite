import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mdPlugin } from './md-plugin';

// 纯静态单页站：vite build → dist/ 静态产物。
// 部署：GitHub Pages（与 Astro 版同 URL 路径 /PersonalWebsite/，切换部署时保持一致）。
// base 必须为 '/PersonalWebsite/'（项目仓），缺了会导致资源 404。
export default defineConfig({
  base: '/PersonalWebsite/',
  plugins: [react(), mdPlugin()],
  server: {
    // 子集字体在仓库根 assets/fonts/（与 Astro 线共用一份真源），dev 默认 fs.allow 只到本项目根 → woff2 全被拦成 error，
    // 页面上看到的是系统回退字体，目测结论不成立。build 侧走资源管线不受此限。
    fs: { allow: ['..'] },
  },
  build: {
    outDir: 'dist',
  },
});