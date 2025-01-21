import { expect, test } from '@playwright/test';

test.describe('Manage incident banners page', () => {
  test('should render page', async ({ page }) => {
    await page.goto('/account/incident-banner');

    await expect(
      page.getByRole('heading', { name: 'Manage incident banners' }),
    ).toBeVisible();
  });

  test('should return to account page', async ({ page }) => {
    await page.goto('/account/incident-banner');

    await page.getByRole('button', { name: 'Return to account page' }).click();

    await page.waitForURL('/account');

    expect(page.url()).toContain('/account');
    expect(page.url()).not.toContain('/account/incident-banner');
  });

  test('should return to schedule page', async ({ page }) => {
    await page.goto('/account/incident-banner');

    await page.getByRole('button', { name: 'Set up new incident banner' }).click();

    await page.waitForURL('/account/incident-banner/schedule');

    expect(page.url()).toContain('/account/incident-banner/schedule');
  });
});
