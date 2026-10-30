import { expandAllSections, expect, expectDownload, openPage, resultRows, search, test, testData } from '../../support/helpers';

test.describe('satellites', () => {
  test('list shows satellites and searches by NORAD ID', async ({ page }) => {
    await openPage(page, '/satellites');

    await expect(resultRows(page).first()).toBeVisible();

    const noradId = (await resultRows(page).first().locator('td').nth(1).textContent() ?? '').trim();
    await search(page, '#satellites_search_bar', noradId);

    await expect(page).toHaveURL(new RegExp(`search_like=${noradId}`));
    await expect(resultRows(page).first()).toContainText(noradId);
  });

  test('list sorts by common name', async ({ page }) => {
    await openPage(page, '/satellites');
    const header = page.locator('main th').filter({ hasText: 'Common name' }).first();
    const firstBefore = await resultRows(page).first().textContent();
    await header.getByRole('button').click();

    await expect.poll(() => resultRows(page).first().textContent()).not.toBe(firstBefore);
  });

  test('list downloads as CSV and JSON', async ({ page }) => {
    await openPage(page, '/satellites');
    await expectDownload(page, () => page.locator('main button').filter({ hasText: /^CSV$/ }).last().click(), /\.csv$/);
    await expectDownload(page, () => page.locator('main button').filter({ hasText: /^JSON$/ }).last().click(), /\.json$/);
  });

  test('satellite page shows information and related events', async ({ page }) => {
    await openPage(page, `/satellites/${testData().satellite}`);
    for (const section of ['Satellite information', 'Conjunction events', 'Re-entry events', 'Fragmentation events']) {
      await expect(page.locator('main').getByRole('heading', { name: section }).first()).toBeVisible();
    }
    await expandAllSections(page);
  });

  test('ephemeris upload page shows the form (not submitted)', async ({ page }) => {
    await openPage(page, `/satellites/${testData().satellite}/ephemeris-upload`);

    await expect(page.locator('main input[type="file"]')).toBeAttached();
    await expect(page.getByRole('button', { name: 'Upload' })).toBeVisible();
  });
});

test.describe('organisations', () => {
  test('list shows organisations, searches and downloads', async ({ page }) => {
    await openPage(page, '/organisations');
    const name = (await resultRows(page).first().locator('td').first().textContent() ?? '').trim();
    await search(page, '#organisations_search_bar', name);

    await expect(resultRows(page).first()).toContainText(name);

    await expectDownload(page, () => page.locator('main button').filter({ hasText: /^CSV$/ }).last().click(), /\.csv$/);
  });

  test('organisation page shows satellites and conjunction events', async ({ page }) => {
    await openPage(page, `/organisations/${testData().organisation}`);

    await expect(page.locator('main').getByRole('heading', { name: 'Operator summary' })).toBeVisible();
    await expect(page.locator('main').getByRole('heading', { name: 'Licensed satellites' }).first()).toBeVisible();
    await expect(page.locator('#organisation-satellites-search')).toBeAttached();
  });
});

test.describe('satellite activity', () => {
  test('list and flag page load', async ({ page }) => {
    await openPage(page, '/activity');
    const id = testData().activity;

    test.skip(!id, 'no activity flags on this environment');

    await page.locator(`main a[href="/activity/${id}"]`).first().click();

    await expect(page.locator('main h1')).toHaveText(`Activity flag ${id}`);
    await expect(page.locator('main').getByRole('heading', { name: 'Event summary' })).toBeVisible();
  });

  test('contact analyst link returns to the activity flag', async ({ page }) => {
    const id = testData().activity;

    test.skip(!id, 'no activity flags on this environment');

    await openPage(page, `/activity/${id}`);
    const href = await page.locator('main a[href^="/contact-analyst/"]').first().getAttribute('href');

    expect(decodeURIComponent(href ?? '')).toContain(`callback=/activity/${id}`);
  });
});
