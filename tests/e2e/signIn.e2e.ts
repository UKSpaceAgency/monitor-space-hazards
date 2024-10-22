import { expect, test } from '@playwright/test';

test.describe('Sign in page', () => {
  test('should render page', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Monitor Space Hazards' }),
    ).toBeVisible();
  });

  test('should redirect to page if not logged in', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.url()).toMatch(/(\?|&)([^=]+)=([^&]+dashboard)/g);
  });
});
