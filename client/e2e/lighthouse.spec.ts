import { test, chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Lighthouse Audit Test', () => {
	test('should pass performance and accessibility audits on Chromium', async ({
		browserName,
	}) => {
		// Lighthouse requires capabilities only available in Chromium, skip this test for non-Chromium browsers
		if (browserName !== 'chromium') {
			test.skip();
		}

		const { playAudit } = await import('playwright-lighthouse');

		const browser = await chromium.launch({
			args: ['--remote-debugging-port=9222'],
		});

		const page = await browser.newPage();

		await page.goto(process.env.STAGING_URL!);

		await playAudit({
			page,
			port: 9222,
			thresholds: {
				performance: 85,
				accessibility: 90,
				'best-practices': 85,
				seo: 85,
			},
			reports: {
				formats: {
					html: true,
				},
				directory: './lighthouse-reports',
				name: `audit-report-${Date.now()}`,
			},
		});

		await browser.close();
	});
});
