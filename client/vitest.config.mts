import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, '.'),
		},
	},
	test: {
		globals: true,
		coverage: {
			provider: 'istanbul',
			exclude: [
				'.next/**', // build files
				'**/*.test.tsx', // test files
				'**/*.test.ts', // test files
				'e2e/**', // playwright tests
				'mocks/**', // mock files for tests
				'*.config.*', // all config files
			],
			thresholds: {
				// average for all files
				statements: 85,
				branches: 85,
				functions: 85,
				lines: 85,

				'**/*.tsx': {
					statements: 85,
					branches: 85,
					functions: 85,
					lines: 85,
				},

				'**/*.ts': {
					statements: 85,
					branches: 85,
					functions: 85,
					lines: 85,
				},
			},
		},
		setupFiles: './setupTests.ts',
		environment: 'jsdom',
		exclude: ['node_modules', 'e2e'],
	},
});
