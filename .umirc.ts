import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'npm',
  history: { type: 'hash' }, // 默认路由模式“browser”会导致本地静态文件加载问题
  publicPath: process.env.NODE_ENV !== 'production' ? '/' : './', // 问题同上，静态文件加载
  outputPath: 'build', // electron-builder 已经使用了 dist 文件，所以改一个文件
});
