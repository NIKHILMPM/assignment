import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true, // Ensures the Host header is modified to match the target
        secure: false, // Disable SSL verification if using HTTPS in development
      },
    },
  },
  plugins: [react()],
});
