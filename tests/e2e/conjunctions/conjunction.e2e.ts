import { expect, test } from '@playwright/test';

test.describe('Conjunction page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/conjunctions/dgglpwr-vdwdxlz-lwzrqn');
  });

  test('should render conjunction page', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Conjunction event dgglpwr-vdwdxlz-lwzrqn' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Upload event analysis' }).click();
    await page.getByRole('button', { name: 'Contact a UKSA orbital analyst' }).click();
  });
});
