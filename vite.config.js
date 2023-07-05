import { fileURLToPath, URL } from 'node:url'

// import less from 'vite-plugin-less';
// import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )

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
