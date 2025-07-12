import reactSWC from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    reactSWC(),
    svgr(),
    checker({
      typescript: true,
    }),
    readableClassnames(),
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
