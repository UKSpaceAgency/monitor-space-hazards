import { expect, test } from '@playwright/test';

test.describe('Distribution List page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/distribution-list');

    await expect(
      page.getByRole('heading', { name: 'View distribution lists' }),
    ).toBeVisible();

    await expect(
      page.getByText('Distribution lists for conjunction events'),
    ).toBeVisible();

    await expect(
      page.getByText('Distribution lists for re-entry events'),
    ).toBeVisible();
  });
});
