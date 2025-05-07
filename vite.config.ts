import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Portfolio-Generator/', // Add this line to set the base path for your assets
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
