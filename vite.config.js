import { fileURLToPath, URL } from 'node:url'

// import less from 'vite-plugin-less';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/css/base.less";`,
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
