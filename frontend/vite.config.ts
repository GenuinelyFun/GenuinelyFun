import react from '@vitejs/plugin-react';
import reactSWC from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import PrettyModuleClassnames from 'vite-plugin-pretty-module-classnames';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactSWC(),
    svgr(),
    checker({
      typescript: true,
    }),
    PrettyModuleClassnames(),
  ],
  resolve: { preserveSymlinks: true },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      less: {
        math: 'always',
        relativeUrls: true,
        javascriptEnabled: true,
      },
    },
  },
});
