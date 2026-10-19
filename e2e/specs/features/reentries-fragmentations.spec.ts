import { expandAllSections, expect, expectDownload, openPage, resultRows, search, test, testData } from '../../support/helpers';

test.describe('re-entry events list', () => {
  test.beforeEach(async ({ page }) => {
    await openPage(page, '/re-entries?epoch=all');
  });

  test('shows alerts and events', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Upcoming re-entry alerts' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'All re-entry events' })).toBeVisible();
    await expect(resultRows(page).first()).toBeVisible();
  });

  test('search finds an event by ID', async ({ page }) => {
    const id = testData().reentry;
    await search(page, '#reentries_search_bar', id);

    await expect(page).toHaveURL(new RegExp(`search_like=${id}`));
    await expect(resultRows(page).first()).toContainText(id);
  });

  test('filters update the results', async ({ page }) => {
    await page.locator('select[name="epoch"]').selectOption('past');

    await expect(page).toHaveURL(/epoch=past/);

    await page.locator('#view_only').click();

    await expect(page).toHaveURL(/report=present/);
  });

  test('events download as CSV and JSON', async ({ page }) => {
    await expectDownload(page, () => page.locator('main button').filter({ hasText: /^CSV$/ }).last().click(), /\.csv$/);
    await expectDownload(page, () => page.locator('main button').filter({ hasText: /^JSON$/ }).last().click(), /\.json$/);
  });
});

test.describe('re-entry event page', () => {
  test.beforeEach(async ({ page }) => {
    await openPage(page, `/re-entries/${testData().reentry}`);
  });

  test('shows the summary and sections', async ({ page }) => {
    await expect(page.locator('main h1')).toHaveText(/^Re-entry event for /);

    for (const section of ['Re-entry event summary', 'Object data', 'Re-entry event history', 'Further information']) {
      await expect(page.locator('main').getByRole('heading', { name: section }).first()).toBeVisible();
    }
  });

  test('show all sections expands every section', async ({ page }) => {
    await expandAllSections(page);
  });

  test('event downloads as a PDF', async ({ page }) => {
    test.setTimeout(3 * 60 * 1000);

    await expectDownload(page, () => page.getByRole('button', { name: /Download event PDF/ }).click(), /\.pdf$/);
  });

  test('contact analyst link opens the support form', async ({ page }) => {
    await page.locator('main a[href^="/contact-analyst/reentries"]').first().click();

    await expect(page.locator('main h1')).toHaveText('Operations support - re-entry events');
  });
});

test.describe('re-entry alert pages (viewed, never saved or sent)', () => {
  test('alert page opens for an event with an alert', async ({ page }) => {
    const id = testData().reentryWithAlert;

    test.skip(!id, 'no re-entry alerts on this environment');

    await openPage(page, `/re-entries/${id}/alert`);

    await expect(page.locator('main h1')).toHaveText(/Re-entry alert for|Re-entry event for/);
  });

  test('edit alert form shows its fields', async ({ page }) => {
    await openPage(page, `/re-entries/${testData().reentry}/alert/edit`);
    for (const name of ['executive_summary_comment', 'immediate_response_comment', 'press_attention_comment']) {
      await expect(page.locator(`textarea[name="${name}"]`)).toBeVisible();
    }

    await expect(page.getByRole('button', { name: 'Review edit' })).toBeVisible();
  });

  test('send alert page opens for an event with an alert', async ({ page }) => {
    const id = testData().reentryWithAlert;

    test.skip(!id, 'no re-entry alerts on this environment');

    await openPage(page, `/re-entries/${id}/alert/send-alert`);

    await expect(page.locator('main h1')).toHaveText(/Send to additional recipients/);
  });
});

test.describe('fragmentation events', () => {
  test('list shows events, searches and downloads', async ({ page }) => {
    await openPage(page, '/fragmentations');

    await expect(resultRows(page).first()).toBeVisible();

    const id = testData().fragmentation;
    // The fragmentations page reuses the conjunctions search bar ID
    await search(page, 'main input.govuk-input', id);

    await expect(page).toHaveURL(new RegExp(id));
    await expect(resultRows(page).first()).toContainText(id);

    await expectDownload(page, () => page.locator('main button').filter({ hasText: /^CSV$/ }).last().click(), /\.csv$/);
  });

  test('event page shows sections and the fragment chart', async ({ page }) => {
    await openPage(page, `/fragmentations/${testData().fragmentation}`);

    await expect(page.locator('main h1')).toHaveText(/^Fragmentation event for /);

    for (const section of ['Event summary', 'Fragment data', 'Potential impact of event', 'Guidance']) {
      await expect(page.locator('main').getByRole('heading', { name: section }).first()).toBeVisible();
    }
    await page.getByRole('button', { name: /Fragment data/ }).first().click();

    await expect(page.locator('main canvas').first()).toBeVisible();
  });

  test('alert history downloads', async ({ page }) => {
    await openPage(page, `/fragmentations/${testData().fragmentation}`);
    await page.getByRole('button', { name: /Fragmentation event history/ }).first().click();
    await expectDownload(page, () => page.getByRole('button', { name: 'Fragmentation alert history csv download' }).click(), /\.csv$/);
  });

  test('edit link points at a valid URL', async ({ page }) => {
    await openPage(page, `/fragmentations/${testData().fragmentation}`);
    const href = await page.locator('main a[href*="edit"]').first().getAttribute('href');

    expect(href, 'edit link should not contain a double slash').not.toContain('//');
  });

  test('edit form shows its fields (not saved)', async ({ page }) => {
    await openPage(page, `/fragmentations/${testData().fragmentation}/edit`);

    await expect(page.locator('textarea[name="executive_summary_comment"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Review edit' })).toBeVisible();
  });

  test('send alert page shows distribution status (not sent)', async ({ page }) => {
    await openPage(page, `/fragmentations/${testData().fragmentation}/send-alert`);

    await expect(page.getByRole('heading', { name: 'Current distribution status' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Review' })).toBeVisible();
  });
});
