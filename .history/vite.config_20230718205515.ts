import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import '..//vite.env.ts'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true,
  },
  plugins: [vue()],
})
