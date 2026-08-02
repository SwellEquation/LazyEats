import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {

      '/recipes': {
        target: 'http://localhost:3001'
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
