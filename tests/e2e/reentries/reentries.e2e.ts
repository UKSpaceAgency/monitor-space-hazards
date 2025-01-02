import { expect, test } from '@playwright/test';

test.describe('Re-entries page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/re-entries');
  });

  test('Search bar is working with click search button', async ({ page }) => {
    await page.getByPlaceholder('Search by event ID, object ID or object name').fill('starlink');
    await page.getByRole('button', { name: /Search/i }).click();

    await expect(page).toHaveURL(/.*search_like=starlink/);
  });

  test('should steer re-entries have reports or not', async ({ page }) => {
    await page.locator('#applySummary').click();
    await page.locator('#viewOnly').click();

    await expect(page).toHaveURL(/.*report=present/);
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
