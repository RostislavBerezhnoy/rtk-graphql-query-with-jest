/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: './node_modules/.vite/rtk-graphql-query-with-jest-and-vite',
  
  server: {
    port: 4200,
    host: 'localhost',
    open: '/public/index.html',
  },

  preview: {
    port: 4300,
    host: 'localhost',
    open: '/public/index.html',
  },

  plugins: [
    react(),
    viteTsConfigPaths({
      root: './',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: './',
  //    }),
  //  ],
  // },

  build: {
    rollupOptions: {
      input: {
        app: './public/index.html', // default
      },
    },
  },

  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
