import { expandAllSections, expect, expectDownload, openPage, resultRows, search, test, testData } from '../../support/helpers';

test.describe('conjunction events list', () => {
  test.beforeEach(async ({ page }) => {
    await openPage(page, '/conjunctions?epoch=all');
  });

  test('shows the summary, alerts and events tables', async ({ page }) => {
    await expect(page.locator('main h1')).toHaveText('Track conjunction events');
    await expect(page.getByText('Upcoming conjunction alerts')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'All conjunction events' })).toBeVisible();
    await expect(resultRows(page).first()).toBeVisible();

    for (const column of ['Event ID', 'Primary object', 'Secondary object', 'Total miss distance (m)']) {
      await expect(page.locator('main th').filter({ hasText: column }).first()).toBeVisible();
    }
  });

  test('search filters events by object name', async ({ page }) => {
    const firstObject = (await resultRows(page).first().locator('td').nth(2).textContent() ?? '').trim();
    const term = firstObject.split(/[\s-]/)[0]!;
    await search(page, '#conjunctions_search_bar', term);

    await expect(page).toHaveURL(new RegExp(`search_like=${encodeURIComponent(term)}`));
    await expect(resultRows(page).first()).toContainText(new RegExp(term, 'i'));
  });

  test('search with no matches shows a message', async ({ page }) => {
    await search(page, '#conjunctions_search_bar', 'zz-no-such-event-zz');

    await expect(page).toHaveURL(/search_like=zz-no-such-event-zz/);
    await expect(page.getByText('No events found')).toBeVisible();
  });

  test('time filter updates the results', async ({ page }) => {
    for (const epoch of ['future', 'past', 'all']) {
      await page.locator('select[name="epoch"]').selectOption(epoch);

      await expect(page).toHaveURL(new RegExp(`epoch=${epoch}`));
    }
  });

  test('"only alerts" filter updates the results', async ({ page }) => {
    await page.locator('#view_only').click();

    await expect(page).toHaveURL(/report=present/);

    await page.locator('#view_all').click();

    await expect(page).toHaveURL(/report=all/);
  });

  test('probability can be shown as a percentage', async ({ page }) => {
    await page.locator('#percentage').click();

    await expect(resultRows(page).first()).toContainText('%');

    await page.locator('#scientific').click();

    await expect(resultRows(page).first()).not.toContainText('%');
  });

  test('sorting by event ID reorders the table', async ({ page }) => {
    const ids = () => resultRows(page).locator('td:nth-child(2)').allInnerTexts();
    const header = page.locator('main th').filter({ hasText: 'Event ID' }).first();
    await header.getByRole('button').click();

    await expect(header).toHaveAttribute('aria-sort', /ascending|descending/);
    await expect.poll(async () => {
      const values = (await ids()).slice(0, 10);
      const sorted = [...values].sort();
      return values.join() === sorted.join() || values.join() === [...sorted].reverse().join();
    }).toBe(true);
  });

  test('scrolling loads more events', async ({ page }) => {
    const before = await resultRows(page).count();

    test.skip(before < 100, 'fewer than one page of events on this environment');

    await resultRows(page).last().scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 20000);

    await expect.poll(() => resultRows(page).count(), { timeout: 30_000 }).toBeGreaterThan(before);
  });

  test('events download as CSV and JSON', async ({ page }) => {
    await expectDownload(page, () => page.getByRole('button', { name: 'Conjunction events csv download' }).click(), /\.csv$/);
    await expectDownload(page, () => page.getByRole('button', { name: 'Conjunction events json download' }).click(), /\.json$/);
  });

  test('help section expands', async ({ page }) => {
    const details = page.locator('main details').filter({ hasText: 'Help with these tables' });
    await details.locator('summary').click();

    await expect(details).toHaveAttribute('open', '');
  });

  test('event links open the event page', async ({ page }) => {
    const link = resultRows(page).first().locator('a[href^="/conjunctions/"]').first();
    const id = (await link.textContent() ?? '').trim();
    await link.click();

    await expect(page.locator('main h1')).toHaveText(`Conjunction event ${id}`);
  });
});

test.describe('conjunction event page', () => {
  test.beforeEach(async ({ page }) => {
    await openPage(page, `/conjunctions/${testData().conjunction}`);
  });

  test('shows the summary and all sections', async ({ page }) => {
    await expect(page.locator('main h1')).toHaveText(/^Conjunction event /);

    for (const section of ['Conjunction event summary', 'Evolution of collision probability', 'Evolution of miss distance', 'Object data', 'Conjunction event history', 'Further information']) {
      await expect(page.locator('main').getByRole('heading', { name: section }).first()).toBeVisible();
    }
  });

  test('contents links jump to sections', async ({ page }) => {
    await page.locator('main a[href="#furtherInformation"]').click();

    await expect(page.locator('#furtherInformation')).toBeInViewport();
  });

  test('show all sections expands every section', async ({ page }) => {
    await expandAllSections(page);
  });

  test('charts render and switch between linear and log scales', async ({ page }) => {
    await expandAllSections(page);

    await expect(page.locator('main canvas').first()).toBeVisible();

    await page.locator('#poc-chart-log').click();

    await expect(page.locator('#poc-chart-log')).toBeChecked();

    await page.locator('#poc-chart-linear').click();

    await expect(page.locator('#poc-chart-linear')).toBeChecked();
  });

  test('chart and history data download', async ({ page }) => {
    await expandAllSections(page);
    await expectDownload(page, () => page.getByRole('button', { name: 'Poc chart csv download' }).click(), /\.csv$/);
    await expectDownload(page, () => page.getByRole('button', { name: 'Poc chart json download' }).click(), /\.json$/);
    await expectDownload(page, () => page.getByRole('button', { name: 'Conjunction event history csv download' }).click(), /\.csv$/);
  });

  test('event downloads as a PDF', async ({ page }) => {
    test.setTimeout(3 * 60 * 1000);

    await expectDownload(page, () => page.getByRole('button', { name: /^Download event PDF/ }).click(), /\.pdf$/);
  });

  test('contact analyst link opens the support form for this event', async ({ page }) => {
    await page.locator('main a[href^="/contact-analyst/conjunctions"]').first().click();

    await expect(page.locator('main h1')).toHaveText('Operations support - conjunction events');
    await expect(page.locator('textarea[name="message_content"]')).toBeVisible();
  });

  test('organisation link has text and opens the operator page', async ({ page }) => {
    await expandAllSections(page);
    const link = page.locator('main a[href^="/organisations/"]').first();

    await expect(link, 'organisation link should have visible text').toHaveText(/\S/);

    await link.click();

    await expect(page).toHaveURL(/\/organisations\//);
    await expect(page.locator('main h1')).toBeVisible();
  });
});

test.describe('conjunction alert page', () => {
  test('opens for an event with an alert', async ({ page }) => {
    const id = testData().conjunctionWithAlert;

    test.skip(!id, 'no conjunction alerts on this environment');

    await openPage(page, `/conjunctions/${id}/alert`);

    await expect(page.locator('main h1')).toHaveText(/Conjunction alert for/);
    await expect(page.locator(`main a[href="/conjunctions/${id}/alert/edit"]`)).toBeVisible();
    await expect(page.locator(`main a[href="/conjunctions/${id}/alert/send-alert"]`)).toBeVisible();
  });

  test('contact analyst link returns to this alert', async ({ page }) => {
    const id = testData().conjunctionWithAlert;

    test.skip(!id, 'no conjunction alerts on this environment');

    await openPage(page, `/conjunctions/${id}/alert`);
    const href = await page.locator('main a[href^="/contact-analyst/"]').first().getAttribute('href');

    expect(decodeURIComponent(href ?? ''), 'callback should be a real page').toMatch(new RegExp(`callback=/conjunctions/${id}`));
  });

  test('edit alert form shows its fields (not saved)', async ({ page }) => {
    const id = testData().conjunctionWithAlert;

    test.skip(!id, 'no conjunction alerts on this environment');

    await openPage(page, `/conjunctions/${id}/alert/edit`);

    await expect(page.locator('main h1')).toHaveText(/Edit conjunction event for/);
    await expect(page.locator('textarea[name="executive_summary_comment"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Review edit' })).toBeVisible();
  });

  test('send alert page shows the recipient choices (not sent)', async ({ page }) => {
    const id = testData().conjunctionWithAlert;

    test.skip(!id, 'no conjunction alerts on this environment');

    await openPage(page, `/conjunctions/${id}/alert/send-alert`);

    await expect(page.locator('main h1')).toHaveText('Send to additional recipients');
    await expect(page.locator('input[name="isStandard"]')).toBeAttached();
    await expect(page.getByRole('button', { name: 'Review' })).toBeVisible();
  });

  test('NSpOC analysis upload page shows the form (not submitted)', async ({ page }) => {
    await openPage(page, `/conjunctions/${testData().conjunction}/analysis-upload`);

    await expect(page.locator('main input[type="file"]')).toBeAttached();
    await expect(page.getByRole('button', { name: 'Upload analysis' })).toBeVisible();
  });
});
