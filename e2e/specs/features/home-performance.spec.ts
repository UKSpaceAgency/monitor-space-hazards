import { expandAllSections, expect, openPage, test } from '../../support/helpers';

test.describe('home page', () => {
  test('shows service cards that link to each service', async ({ page }) => {
    await openPage(page, '/home');

    await expect(page.locator('main').getByRole('heading', { name: 'Key services' })).toBeVisible();

    for (const href of ['/re-entries', '/fragmentations', '/conjunctions', '/performance-monitoring']) {
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
    }
    await page.locator('main a[href="/conjunctions"]').first().click();

    await expect(page.locator('main h1')).toHaveText('Track conjunction events');
  });

  test('service navigation moves between pages and marks the current one', async ({ page }) => {
    await openPage(page, '/home');
    const nav = page.locator('nav .govuk-service-navigation__list');
    for (const [name, heading] of [['Re-entries', 'Track re-entry events'], ['Satellites', 'UK-licensed satellites']] as const) {
      await nav.getByRole('link', { name }).click();

      await expect(page.locator('main h1')).toHaveText(heading);
      await expect(page.locator('.govuk-service-navigation__item--active')).toHaveText(name);
    }
    await nav.getByRole('link', { name: 'Account' }).click();

    await expect(page.locator('main h1')).toHaveText('Your account information');
  });

  test('unknown pages show Page not found', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');

    expect(response?.status()).toBe(404);
    await expect(page.locator('main h1')).toHaveText('Page not found');
  });

  for (const [slug, heading] of [
    ['definitions', 'Definitions'],
    ['conjunction-analysis-information', 'Conjunction event analysis information'],
    ['re-entry-analysis-information', /re-entry/i],
  ] as const) {
    test(`information page /page/${slug} loads`, async ({ page }) => {
      await openPage(page, `/page/${slug}`);

      await expect(page.locator('main h1')).toHaveText(heading);
      await expect(page.locator('main p').first()).toBeVisible();
    });
  }

  test('contact page lists NSpOC contacts', async ({ page }) => {
    await openPage(page, '/contact');

    await expect(page.locator('main').getByRole('heading', { name: 'Main point of contact' })).toBeVisible();
    await expect(page.locator('main table').first().locator('tbody tr').first()).toBeVisible();
  });
});

test.describe('performance monitoring', () => {
  test('shows each statistics section', async ({ page }) => {
    await openPage(page, '/performance-monitoring');
    for (const section of ['Data ingestion', 'Conjunction events', 'Re-entry events', 'Service usage']) {
      await expect(page.locator('main').getByRole('heading', { name: section }).first()).toBeVisible();
    }
  });

  test('sections expand and show their data', async ({ page }) => {
    test.setTimeout(3 * 60 * 1000);

    await openPage(page, '/performance-monitoring');

    await expect(page.locator('.govuk-accordion__show-all').first()).toBeVisible();

    await expandAllSections(page);

    await expect(page.locator('main canvas, main table').first()).toBeVisible();
  });
});
