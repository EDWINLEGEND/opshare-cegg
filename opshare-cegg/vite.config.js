import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // If you have base path issues, uncomment and adjust the following:
  // base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    historyApiFallback: true,
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
}); 