import { expect, test } from '@playwright/test';

test.describe('Manoeuvre support upload logs page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/manoeuvre-support-upload-log');

    await expect(
      page.getByRole('heading', { name: 'Manoeuvre support uploads' }),
    ).toBeVisible();
  });

  test('should show banner when delete', async ({ page }) => {
    await page.goto('/account/manoeuvre-support-upload-log');

    await page.getByRole('link', { name: 'Delete' }).first().click();

    await expect(
      page.getByRole('button', { name: 'Yes, delete' }),
    ).toBeVisible();
  });
});
