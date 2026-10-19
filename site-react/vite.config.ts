import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mdPlugin } from './md-plugin';

// 纯静态单页站：vite build → dist/ 静态产物。
// 部署：GitHub Pages + 自定义域 onetale.cn。
// 项目仓挂自定义域后由域名根目录提供站点（github.io/PersonalWebsite/ 只 301 过来），
// 故 base 必须为 '/'；写 '/PersonalWebsite/' 会让 css/js/图片全部 404 → 全站裸奔。
export default defineConfig({
  base: '/',
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