import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages base path
const base = process.env.NODE_ENV === 'production' 
  ? '/star_wars_test_issue/' 
  : '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tsconfigPaths(), svgr(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-router-dom': ['react-router-dom'],
          '@tanstack/react-query': ['@tanstack/react-query'],
          'zustand': ['zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
