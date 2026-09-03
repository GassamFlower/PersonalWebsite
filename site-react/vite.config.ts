import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 纯静态单页站：vite build → dist/ 静态产物。
// 部署：GitHub Pages（与 Astro 版同 URL 路径 /PersonalWebsite/，切换部署时保持一致）。
// base 必须为 '/PersonalWebsite/'（项目仓），缺了会导致资源 404。
export default defineConfig({
  base: '/PersonalWebsite/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});