// vite.config.ssr.ts — SSR/预渲染构建配置。
// 目标：把 React 站预渲染进球 root HTML，产出 dist-server 单文件供 prerender 脚本注入。
// 输出仍为纯静态 dist/（无后端），SSR 仅作为「构建期一次渲染」。
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: true,
    target: 'node',
  },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-server',
    emptyOutDir: true,
    // 输出 CJS，供 scripts/prerender.mjs require 调用
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'entry-server.cjs',
      },
    },
  },
});