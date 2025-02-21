import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { pages } from './pages';

pages.forEach(({ name, url }) => {
	test.describe(`Accessibility check for ${name} page`, () => {
		test('does not have any automatically detectable issues', async ({
			page,
		}) => {
			await page.goto(url);

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	});
});
