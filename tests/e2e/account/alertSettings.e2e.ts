import { expect, test } from '@playwright/test';

test.describe('Alert settings page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/alert-settings');

    await expect(
      page.getByRole('heading', { name: 'Edit your alert settings' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Save and continue' }),
    ).toBeVisible();

    await expect(
      page.getByText('Changing these settings is only recommended if advised by the UK Space Agency'),
    ).toBeVisible();
  });

  test('should show success page and back to accounts page', async ({ page }) => {
    await page.goto('/account/alert-settings');

    await page.getByRole('button', { name: 'Save and continue' }).click();

    await expect(
      page.getByRole('button', { name: 'Return to account page' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Return to account page' }).click();

    await page.waitForURL('/account');

    expect(page.url()).toContain('/account');
    expect(page.url()).not.toContain('/account/alert-settings');
  });
});
