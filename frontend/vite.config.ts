import reactSWC from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    reactSWC(),
    svgr(),
    ...(!process.env.VITEST ? [checker({ typescript: true })] : []),
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
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    exclude: ['src/projects/__tests__/generate-excel.test.ts'],
    testTimeout: 30000,
    hookTimeout: 60000,
  },
});
