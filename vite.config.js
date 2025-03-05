import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  define: {
    global: {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['date-fns', 'zustand']
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: command === 'serve',
    minify: 'esbuild'
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  }
}))
