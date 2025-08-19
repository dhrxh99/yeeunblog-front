import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'   // ⬅ 추가

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/saving-posting' : {
        target: 'http://localhost:8091',
        changeOrigin: true,
      },
      // 댓글/게시글 등 백엔드 라우트도 추가:
      '/post': {
        target: 'http://localhost:8091',
        changeOrigin: true,
      },
      // REST로 분리돼 있다면 공통 프리픽스 묶기
      '/api': {
        target: 'http://localhost:8091',
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
