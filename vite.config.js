import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [vue(), ghPages()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: 'https://github.com/dkztv/infinite-scroll',
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue';
            }
            if (id.includes('pinia')) {
              return 'pinia';
            }
            return 'vendor';
          }
        },
      },
    },
    minify: 'terser',
  },
  server: {
    host: 'localhost',
  },
});
