import { expect, test } from '@playwright/test';

test.describe('Keyboard Selections', () => {
	test('correctly output selected notes based on updated settings', async ({
		page,
	}) => {
		await page.goto(process.env.STAGING_URL!); // home page

		// open settings
		await page.click('button[aria-label="Open keyboard settings"]');
		await expect(page.locator('div[class*="keyboardSettings"]')).toBeVisible();

		// update dropdown selections
		await page.selectOption('select[name="key"]', {
			label: 'F',
		});

		await page.selectOption('select[name="octave"]', {
			label: '3',
		});

		await page.selectOption('select[name="scale"]', {
			label: 'major',
		});

		await page.selectOption('select[name="order"]', {
			label: 'descending',
		});

		await page.selectOption('select[name="total-notes"]', {
			label: '4',
		});

		await page.selectOption('select[name="repeat-num"]', {
			label: '2',
		});

		// updated settings
		await expect(page.locator('select[name="key"]')).toHaveValue('F');
		await expect(page.locator('select[name="octave"]')).toHaveValue('3');
		await expect(page.locator('select[name="scale"]')).toHaveValue('major');
		await expect(page.locator('select[name="order"]')).toHaveValue(
			'descending'
		);
		await expect(page.locator('select[name="total-notes"]')).toHaveValue('4');
		await expect(page.locator('select[name="repeat-num"]')).toHaveValue('2');

		// no notes are displayed before playing the scale
		const notesDisplay = page.locator('section[class*="notesDisplay"]');
		await expect(notesDisplay).not.toBeVisible();

		await page.click('button[aria-label="Play the scale"]');

		// notes display once the scale is played
		await expect(notesDisplay).toBeVisible();

		const expectedNotesDisplay = 'F4 - E4 - D4 - C4 x 3';
		await expect(notesDisplay).toContainText(expectedNotesDisplay);
	});
});
