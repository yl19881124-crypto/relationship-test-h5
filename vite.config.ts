import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/relationship-test-h5/',
  plugins: [react()]
});
