import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { preserveSymlinks: true },
  test: {
    environment: 'jsdom',
    include: ['src/projects/__tests__/generate-excel.test.ts'],
    testTimeout: 60000,
    hookTimeout: 120000,
  },
});
