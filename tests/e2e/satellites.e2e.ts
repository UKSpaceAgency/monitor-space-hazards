import { expect, test } from '@playwright/test';

test.describe('Satellites page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/satellites');
  });

  test('Search bar is working with click search button', async ({ page }) => {
    await page.getByPlaceholder('Search by common name or NORAD ID').fill('oneweb');
    await page.getByRole('button', { name: /Search/i }).click();

    await expect(page).toHaveURL(/.*search_like=oneweb/);
  });
});
