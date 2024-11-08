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

    await expect(page.getByText('Must be between 0% and 100%.', { exact: true })).toBeVisible();
    await expect(page.getByText('Probability of collision is above (percent): Enter a positive number.', { exact: true })).toBeVisible();
  });
});
