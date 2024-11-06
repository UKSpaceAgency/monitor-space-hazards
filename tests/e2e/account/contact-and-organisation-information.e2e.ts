import { expect, test } from '@playwright/test';

test.describe('Contact and organisation information page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/contact-and-organisation-information');

    await expect(
      page.getByRole('heading', { name: 'View your account details' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Return to account page' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Return to account page' }),
    ).toBeVisible();
  });

  test('should go back to /account page', async ({ page }) => {
    await page.goto('/account/contact-and-organisation-information');

    await page.getByRole('button', { name: 'Return to account page' }).click();

    await page.waitForURL('/account');

    expect(page.url()).toContain('/account');
    expect(page.url()).not.toContain('/account/contact-and-organisation-information');
  });
});
