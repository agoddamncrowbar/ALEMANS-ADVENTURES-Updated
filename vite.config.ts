import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and React DOM
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Split TanStack Query
          'query-vendor': ['@tanstack/react-query', '@tanstack/react-query-devtools'],
          // Split UI libraries
          'ui-vendor': ['framer-motion', 'lucide-react', 'react-icons'],
          // Split PDF library (it's large)
          'pdf-vendor': ['react-pdf'],
          // Split date libraries
          'date-vendor': ['date-fns', 'react-datepicker'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
  },
})