import { expect, test } from '@playwright/test';

test.describe('Data Privacy Notice page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/data-privacy-notice');

    await expect(
      page.getByRole('heading', { name: 'Data Privacy Notice' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Download data privacy notice' }),
    ).toBeVisible();
  });

  test('should download privacy notice pdf', async ({ page }) => {
    await page.goto('/data-privacy-notice');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download data privacy notice' }).click();
    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    expect(fileName).toEqual('Monitor Space Hazards Privacy Notice.pdf');
  });
});
