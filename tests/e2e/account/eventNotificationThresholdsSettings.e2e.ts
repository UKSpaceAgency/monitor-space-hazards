import { expect, test } from '@playwright/test';

test.describe('Conjunction event notification thresholds page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/event-notification-thresholds-settings');

    await expect(
      page.getByRole('heading', { name: 'Set your conjunction event notification thresholds' }),
    ).toBeVisible();
  });

  test('should validate fields', async ({ page }) => {
    await page.goto('/account/event-notification-thresholds-settings');

    page.locator('#poc_field').fill('150');

    page.getByRole('button', { name: 'Save and continue' }).click();

    await expect(page.getByText('Error:Must be between 0% and 100%')).toBeVisible();
    await expect(page.getByRole('link', { name: /.*Must be between 0% and 100%/ })).toBeVisible();
  });

  test('should submit form', async ({ page }) => {
    await page.goto('/account/event-notification-thresholds-settings');

    page.locator('#poc_field').fill('50');
    page.locator('#total_miss_distance').fill('50');
    page.locator('#total_radial_distance').fill('50');
    page.locator('#time_to_conjunction').fill('50');

    page.getByRole('button', { name: 'Save and continue' }).click();

    await expect(page.getByRole('heading', { name: 'SUCCESS' })).toBeVisible();
  });
});
