import { chromium, test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Lighthouse Audit', () => {
	test('should pass the defined thresholds for performance, accessibility, etc. on Chromium', async ({
		browserName,
	}) => {
		// Lighthouse requires capabilities only available in Chromium, skip this test for non-Chromium browsers
		if (browserName !== 'chromium') {
			test.skip();
		}

		const browser = await chromium.launch({
			args: ['--remote-debugging-port=9222'],
		});

		const page = await browser.newPage();
		const { playAudit } = await import('playwright-lighthouse');

		await page.goto(process.env.STAGING_URL!);

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
			reportName: string,
			screenEmulation?: object
		) => {
			await playAudit({
				page,
				port: 9222,
				thresholds,
				reports: {
					...reportSettings,
					name: reportName,
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
		await runAudit('desktop', 'desktop-audit', {
			mobile: false,
			width: 1920,
			height: 1080,
			deviceScaleFactor: 1,
		});

		// mobile audit
		await runAudit('mobile', 'mobile-audit');

		await browser.close();
	});
});
