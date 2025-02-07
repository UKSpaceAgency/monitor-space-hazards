import { expect, test } from '@playwright/test';

test.describe('Terms and conditions page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/terms-and-conditions');

    await expect(
      page.getByRole('heading', { name: 'View Terms and Conditions' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Download Terms and Conditions' }),
    ).toBeVisible();
  });

  test('should download terms and conditions pdf', async ({ page }) => {
    await page.goto('/account/terms-and-conditions');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download Terms and Conditions' }).click();
    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    expect(fileName).toEqual('Monitor Space Hazards Terms and Conditions.pdf');
  });
});
