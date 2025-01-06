import { expect, test } from '@playwright/test';

test.describe('Dashboard page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/home');

    await expect(
      page.getByRole('heading', { name: 'Monitor Space Hazards' }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'National Space Operations Centre Warning and Protection Services' }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Upcoming events', exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Objects tracked', exact: true }),
    ).toBeVisible();
  });
});
