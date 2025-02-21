import { chromium, test } from '@playwright/test';
import dotenv from 'dotenv';

import { pages } from './pages';

dotenv.config();

pages.forEach(({ name, url }, index) => {
	test.describe(`Lighthouse Audit for ${name} page`, () => {
		test('meets the defined thresholds for performance, accessibility, etc. on Chromium', async ({
			browserName,
		}) => {
			// Lighthouse requires capabilities only available in Chromium, skip this test for non-Chromium browsers
			if (browserName !== 'chromium') {
				test.skip();
			}

			const browser = await chromium.launch({
				// run test in its own port to avoid concurrency issues
				args: [`--remote-debugging-port=${9222 + index}`],
			});

			const page = await browser.newPage();
			const { playAudit } = await import('playwright-lighthouse');

			await page.goto(url);

			const thresholds = {
				performance: 85,
				accessibility: 90,
				'best-practices': 85,
				seo: 85,
			};

			const reportSettings = {
				formats: {
					html: true,
				},
				directory: './lighthouse-report',
			};

			const extraHeaders = {
				'x-vercel-protection-bypass':
					process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '',
			};

			const runAudit = async (
				formFactor: 'desktop' | 'mobile',
				screenEmulation?: object
			) => {
				await playAudit({
					page,
					port: 9222 + index,
					thresholds,
					reports: {
						...reportSettings,
						name: `${name}-${formFactor}-audit`,
					},
					config: {
						extends: 'lighthouse:default',
						settings: {
							extraHeaders,
							formFactor,
							screenEmulation: screenEmulation || {},
						},
					},
				});
			};

			// desktop audit
			await runAudit('desktop', {
				mobile: false,
				width: 1920,
				height: 1080,
				deviceScaleFactor: 1,
			});

			// mobile audit
			await runAudit('mobile');

			await browser.close();
		});
	});
});
