import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
      //TODO: add tests to gray2binary
      exclude: ['node_modules', 'dist', '**/index.ts', 'src/sketch.ts', '**/*config.*', '**/gray2binary.ts'],
    },
  },
});
