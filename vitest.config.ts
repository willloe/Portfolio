import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],

    // ✅ Only run unit tests under src/tests/unit
    include: ['src/tests/unit/**/*.test.ts?(x)'],

    // ✅ Make sure anything e2e-ish is ignored
    exclude: [
      'node_modules/**',
      'dist/**',
      'tests/e2e/**',
      'src/tests/e2e/**',
      '**/*.e2e.ts?(x)',
      '**/*.pw.ts?(x)',
      'playwright.config.ts',
      'playwright-report/**',
      'test-results/**',
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        'playwright.config.ts',
        'playwright-report/**',
        'test-results/**',
      ],
      thresholds: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/styles': path.resolve(__dirname, './src/styles'),
    },
  },
})
