import { expect, test } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Index page', () => {
  test('should render index', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Monitor Space Hazards' }),
    ).toBeVisible();
  });

  test('should redirect to index if not logged in', async ({ page }) => {
    await page.goto('/dashboard');

    expect(page.url()).toMatch(/(\?|&)([^=]+)=([^&]+dashboard)/g);
  });

  test('should redirect to dashboard if logged in', async ({ browser }) => {
    const userContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
    const page = await userContext.newPage();

    await page.goto('/');

    expect(page.url()).toMatch(/dashboard/g);

    await userContext.close();
  });
});
