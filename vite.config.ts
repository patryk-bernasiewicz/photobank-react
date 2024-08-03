import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT || '3001'),
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      feature: path.resolve(__dirname, './src/feature'),
      store: path.resolve(__dirname, './src/store'),
    },
  },
});
