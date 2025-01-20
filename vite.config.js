import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/',

  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173, // Frontend port
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Backend API
        changeOrigin: true,
        secure: false, // Use false for HTTP (true for HTTPS in production)
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite path
      },
    },
  },
});
