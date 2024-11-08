import { expect, test } from 'playwright-ssr';

test.describe('Credentials page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/credentials');

    await expect(
      page.getByRole('heading', { name: 'Credentials for API authentication' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Copy Client ID to clipboard' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Copy Client Secret to clipboard' }),
    ).toBeVisible();
  });
});
