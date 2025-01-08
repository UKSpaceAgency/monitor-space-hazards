import { expect, test } from '@playwright/test';

test.describe('Re-entry alert page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/re-entries/re-20250105-28773/alert');
  });

  test('should show page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Re-entry alert for ASTRO E2' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contact the UK Space Agency for more information' })).toBeVisible();
    await expect(page.locator('#additional_object_details')).toBeVisible();
    await expect(page.locator('#potential_impact_uk_nation')).toBeVisible();
    await expect(page.locator('#potential_impact_uk_region')).toBeVisible();
    await expect(page.locator('#potential_impact_overseas_territory')).toBeVisible();
    await expect(page.locator('#potential_impact_airspace_and_maritime')).toBeVisible();
    await expect(page.locator('#guidance_on_response')).toBeVisible();
    await expect(page.locator('#liability_for_damages')).toBeVisible();
    await expect(page.locator('#press_attention')).toBeVisible();
    await expect(page.locator('#alert_history')).toBeVisible();
    await expect(page.locator('#risk_thresholds')).toBeVisible();
    await expect(page.locator('#alerting_procedure')).toBeVisible();
    await expect(page.locator('#further_information')).toBeVisible();
  });

  test('should redirect to contact-analyst page', async ({ page }) => {
    await page.getByRole('button', { name: 'Contact the UK Space Agency for more information' }).click();

    await expect(page).toHaveURL(/.*contact-analyst/);
  });
});
