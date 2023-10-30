import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [svgr(), react()],
    build: {
      target: 'esnext',
    },
    base: mode === 'production' ? '/rsschool-react-components/react-components/' : '/',
  };
});
