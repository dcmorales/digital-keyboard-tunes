import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
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
		},
		setupFiles: './setupTests.ts',
		environment: 'jsdom',
	},
});
