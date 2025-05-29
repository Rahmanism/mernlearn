import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import jsconfigPaths from 'vite-jsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
      }
    }
  }
})