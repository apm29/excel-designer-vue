import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require("path");
import WindiCSS from 'vite-plugin-windicss'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/",
  plugins: [
    vue(),
    WindiCSS(),

    //ElementPlus 按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //@别名设置
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  server: {
    port: 8013,
    proxy: {
      // 字符串简写写法
      //"/foo": "http://localhost:4567/foo",
      // 选项写法
      // "/testApi": {
      //   target: "http://ebasetest.ciih.net",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/testApi/, ""),
      // },
      // 正则表达式写法
      "/permission": {
        target: "http://axj.ciih.net",
        changeOrigin: true,
      },
      "/business": {
        target: "http://axj.ciih.net",
        changeOrigin: true,
      },
      "/Php": {
        target: "http://axj.ciih.net",
        changeOrigin: true,
      },
    },
  }
})
