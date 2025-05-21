import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/gif-lottery-app/', // 例如如果儲存庫名稱是 vue-project，則填入 /vue-project/
})
