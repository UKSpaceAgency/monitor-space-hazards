import { expect, test } from '@playwright/test';

test.describe('Incident banners schedule page', () => {
  test('should render page', async ({ page }) => {
    await page.goto('/account/incident-banner/schedule');

    await expect(
      page.getByRole('heading', { name: 'Manage incident banners' }),
    ).toBeVisible();
  });

  test('should return to account page', async ({ page }) => {
    await page.goto('/account/incident-banner/schedule');

    await page.getByRole('button', { name: 'Return to account page' }).click();

    await page.waitForURL('/account');

    expect(page.url()).toContain('/account');
    expect(page.url()).not.toContain('/account/incident-banner/schedule');
  });

  test('should set initial radios', async ({ page }) => {
    await page.goto('/account/incident-banner/schedule');

    await expect(page.getByLabel('Major incidentIMPORTANTDue to')).toBeChecked();
    await expect(page.getByLabel('Activate incident banner now')).toBeChecked();
  });

  test('should be able to set dates and times', async ({ page }) => {
    await page.goto('/account/incident-banner/schedule');

    await page.getByLabel('Choose custom time period to').click();

    await expect(page.getByText('Enter start date')).toBeVisible();
    await expect(page.getByText('Enter start time')).toBeVisible();
    await expect(page.getByText('Enter end date')).toBeVisible();
    await expect(page.getByText('Enter end time')).toBeVisible();
  });
});
