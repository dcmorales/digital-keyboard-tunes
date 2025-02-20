import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

test.describe('homepage accessibility', () => {
	test('does not have any automatically detectable issues', async ({
		page,
	}) => {
		await page.goto('http://localhost:3000/');

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
