import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// load environment variables from file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI, // fail the build on CI if a test is marked as test.only
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined, // limit workers to two in CI environments to avoid resource contention
	reporter: 'html',
	use: {
		baseURL: process.env.STAGING_URL || 'http://localhost:3000', // CI will always use staging URL, optional for local development
		extraHTTPHeaders: {
			'x-vercel-protection-bypass':
				process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '', // bypass Vercel authentication
		},
		trace: 'on-first-retry', // collect trace when retrying the failed test
	},

	// configure projects for major browsers and mobile viewports
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'Mobile Chrome',
			testIgnore: /.*lighthouse.spec.ts/, // explicitly ignore non-Chromium browser that uses Chromium engine
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
	],
});
