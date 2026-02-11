import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3005,
    host: true,
    strictPort: true,
    hmr: {
      clientPort: 3005, // Forces the browser to look for HMR on the correct port
    },
    // Add this to allow the browser to talk to Vite across different "origins"
    cors: true, 
    proxy: {
      // Direct API calls to your Docker Gateway
      '/api': {
        target: 'http://localhost:9151',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})