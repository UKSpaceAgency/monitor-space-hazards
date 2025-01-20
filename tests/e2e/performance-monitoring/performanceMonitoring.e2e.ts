import { expect, test } from '@playwright/test';

test.describe('Performance monitoring page', () => {
  test('should render headings', async ({ page }) => {
    await page.goto('/performance-monitoring');

    await expect(
      page.getByRole('heading', { name: 'Performance monitoring and statistics' }),
    ).toBeVisible();

    await expect(page.locator('#performanceAccordionTitle')).toBeVisible();
    await expect(page.locator('#conjunctionAccordionTitle')).toBeVisible();

    await expect(page.locator('#conjunctionEventsByType')).toBeVisible();
    await expect(page.locator('#objectsCatalogued')).toBeVisible();
    await expect(page.locator('#conjunctionEventsByOrganisation')).toBeVisible();
    await expect(page.locator('#conjunctionEventsBySatellite')).toBeVisible();

    await expect(page.locator('#cdmIngests')).toBeVisible();
    await expect(page.locator('#objectDataIngests')).toBeVisible();
    await expect(page.locator('#notificationsSent')).toBeVisible();
    await expect(page.locator('#uksa')).toBeVisible();
  });
});
