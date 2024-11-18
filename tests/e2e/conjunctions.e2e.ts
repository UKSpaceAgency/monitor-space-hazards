import { expect, test } from '@playwright/test';

test.describe('Conjunctions page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/conjunctions');
  });

  test('Search bar is working with click search button', async ({ page }) => {
    await page.getByPlaceholder('Search by event or object ID').fill('oneweb');
    await page.getByRole('button', { name: /Search/i }).click();

    await expect(page).toHaveURL(/.*search_like=oneweb/);
  });

  test('should steer conjunctions have reports or not', async ({ page }) => {
    await page.locator('#applySummary').click();
    await page.locator('#viewOnly').click();

    await expect(page).toHaveURL(/.*has_report=yes/);
  });

  test('should filter past epoch', async ({ page }) => {
    await page.locator('#applySummary').click();
    await page.locator('#epoch').selectOption('past');

    await expect(page).toHaveURL(/.*epoch=past/);
  });

  test('should filter all epoch', async ({ page }) => {
    await page.locator('#applySummary').click();
    await page.locator('#epoch').selectOption('all');

    await expect(page).toHaveURL(/.*epoch=all/);
  });
});
