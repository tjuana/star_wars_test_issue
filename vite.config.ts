import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const base =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_ACTIONS ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1]}/` : '/')

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
