import { expect, test } from '@playwright/test';

test.describe('Account page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account');

    await expect(
      page.getByRole('heading', { name: 'Your account information' }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'View your account details', exact: true }),
    ).toBeVisible();
  });

  test('should go back to /account/contact-and-organisation-information page', async ({ page }) => {
    await page.goto('/account');

    await page.getByRole('link', { name: 'Account details' }).click();

    await page.waitForURL('/account/contact-and-organisation-information');

    expect(page.url()).toContain('/account/contact-and-organisation-information');
  });
});
