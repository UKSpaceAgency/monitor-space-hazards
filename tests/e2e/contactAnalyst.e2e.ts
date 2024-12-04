import { expect, test } from '@playwright/test';

test.describe('Contact Analyst page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/contact-analyst');

    await expect(
      page.getByRole('heading', { name: 'Contact a UKSA orbital analyst' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Submit' }),
    ).toBeVisible();
  });
});
