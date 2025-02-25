import { expect, type Page, test } from '@playwright/test';

async function openNavMenu(page: Page) {
	await page.click('button[aria-label="Open menu"]');

	await expect(page.locator('nav')).toBeVisible();
}

test.describe('Navigation', () => {
	test('correctly navigates to the About page', async ({ page }) => {
		await page.goto(process.env.STAGING_URL!); // home page
		await openNavMenu(page);
		await page.click('a[href="/about"]');

		await expect(page.locator('nav')).toHaveAttribute('aria-hidden', 'true');
		await expect(page).toHaveURL(`${process.env.STAGING_URL}/about`);
		await expect(page.locator('h2').first()).toHaveText('What is it');
	});

	test('navigates back to Home page from any other page', async ({ page }) => {
		const paths = ['/about'];

		for (const path of paths) {
			await test.step(`Navigating from ${path} back to Home`, async () => {
				await page.goto(`${process.env.STAGING_URL}${path}`);
				await openNavMenu(page);
				await page.locator('nav a[href="/"]').click();

				await expect(page.locator('nav')).toHaveAttribute(
					'aria-hidden',
					'true'
				);
				await expect(page).toHaveURL(process.env.STAGING_URL!);
			});
		}
	});

	test('opens GitHub repo in a new tab', async ({ page, context }) => {
		await page.goto(process.env.STAGING_URL!);
		await openNavMenu(page);

		const [newPage] = await Promise.all([
			context.waitForEvent('page'),
			page.click(
				'a[href="https://github.com/dcmorales/digital-keyboard-tunes"]'
			),
		]);

		await expect(newPage).toHaveURL(
			'https://github.com/dcmorales/digital-keyboard-tunes'
		);

		await newPage.close();
	});
});
