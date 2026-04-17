import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const host = process.env.DOCKER ? 'backend' : 'localhost'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: `http://${host}:8000`,
        changeOrigin: true,
      }
    }
  }
})
