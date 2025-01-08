import { expect, test } from '@playwright/test';

test.describe('Re-entry page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/re-entries/re-20241218-61067');
  });

  test('show show page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Re-entry event for STARLINK-32368' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contact the UK Space Agency for more information' })).toBeVisible();
    await expect(page.locator('#object_data')).toBeVisible();
    await expect(page.locator('#history')).toBeVisible();
    await expect(page.locator('#further_information')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download event PDF' })).toBeVisible();
  });
});
