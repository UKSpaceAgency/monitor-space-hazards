import { expandAllSections, expect, openPage, resultRows, test, testData } from '../../support/helpers';

// Every form here is only viewed. Nothing is saved, deleted, uploaded or scheduled.

test.describe('account', () => {
  test('account page links to each account area', async ({ page }) => {
    await openPage(page, '/account');
    for (const href of [
      '/account/contact-and-organisation-information',
      '/account/credentials',
      '/account/notification-settings',
      '/account/event-notification-thresholds-settings',
      '/account/organisations',
      '/account/add-new-user',
      '/account/distribution-list',
      '/account/terms-and-conditions',
      '/account/analysis-upload-log',
    ]) {
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
    }
  });

  test('contact and organisation details show the signed-in user', async ({ page }) => {
    await openPage(page, '/account/contact-and-organisation-information');

    await expect(page.locator('main')).toContainText(/monitorspace\+DevAgencySuperuser@outlook\.com/i);
  });

  test('terms and conditions show every section and download', async ({ page }) => {
    await openPage(page, '/account/terms-and-conditions');

    await expect(page.locator('main').getByRole('heading', { name: '1. General' })).toBeVisible();
    await expect(page.locator('main').getByRole('heading', { name: '11. Law' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download Terms and Conditions' })).toBeVisible();
  });

  test('notification settings show a choice for each notification', async ({ page }) => {
    await openPage(page, '/account/notification-settings');
    for (const name of ['on_event_created', 'on_event_updated', 'on_analysis_uploaded']) {
      await expect(page.locator(`input[type="checkbox"][name="${name}"]`)).toHaveCount(2);
    }

    await expect(page.getByRole('button', { name: 'Save and continue' })).toBeVisible();
  });

  test('conjunction thresholds show numeric fields', async ({ page }) => {
    await openPage(page, '/account/event-notification-thresholds-settings');
    for (const name of ['PROBABILITY_OF_COLLISION', 'TOTAL_MISS_DISTANCE', 'MEAN_RADIAL_MISS_DISTANCE', 'TIME_TO_EVENT']) {
      await expect(page.locator(`input[name="${name}"]`)).toHaveAttribute('type', 'number');
    }
  });

  test('communication settings sections expand', async ({ page }) => {
    await openPage(page, '/account/alert-settings');
    await expandAllSections(page);

    await expect(page.locator('input[name="reEntryAlerts"]').first()).toBeVisible();
  });

  test('add new user form shows every field and account type', async ({ page }) => {
    await openPage(page, '/account/add-new-user');
    for (const name of ['first_name', 'last_name', 'email', 'phone_number']) {
      await expect(page.locator(`input[name="${name}"]`)).toBeVisible();
    }

    expect(await page.locator('select[name="organization_id"] option').count()).toBeGreaterThan(1);
    expect(await page.locator('input[name="role"]').count()).toBe(14);
  });
});

test.describe('organisation administration', () => {
  test('organisations list opens an organisation and a user', async ({ page }) => {
    await openPage(page, '/account/organisations');

    await expect(resultRows(page).first()).toBeVisible();

    await resultRows(page).first().locator('a').first().click();

    await expect(page.locator('main').getByRole('heading', { name: 'Registered users' })).toBeVisible();

    const userLink = page.locator('main a[href^="/account/organisations/"]').filter({ hasText: 'Edit' }).first();

    test.skip(!(await userLink.count()), 'organisation has no users');

    await userLink.click();

    await expect(page.locator('main h1')).toHaveText('User account details');
    await expect(page.getByRole('button', { name: 'Delete user' })).toBeVisible();
  });

  test('user detail change forms show the current values (not saved)', async ({ page }) => {
    await openPage(page, `/account/organisations/${testData().organisation}`);
    const userLink = page.locator('main a[href^="/account/organisations/"]').filter({ hasText: 'Edit' }).first();

    test.skip(!(await userLink.count()), 'organisation has no users');

    const userPath = await userLink.getAttribute('href');
    for (const [suffix, heading, field] of [
      ['email', 'Change user\'s email address', 'input[name="email"]'],
      ['phone', 'Change user\'s phone number', 'input[name="phone"]'],
      ['type', 'Change user\'s account type', 'input[name="role"]'],
    ] as const) {
      await openPage(page, `${userPath}/${suffix}`);

      await expect(page.locator('main h1')).toHaveText(heading);
      await expect(page.locator(field).first()).toBeAttached();
      await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    }
  });

  test('distribution lists show each event type', async ({ page }) => {
    await openPage(page, '/account/distribution-list');
    for (const heading of ['Distribution lists for re-entry events', 'Distribution lists for fragmentation events', 'Distribution lists for conjunction events']) {
      await expect(page.locator('main').getByRole('heading', { name: heading })).toBeVisible();
    }
  });

  test('distribution list links open a user\'s communication settings (not saved)', async ({ page }) => {
    await openPage(page, '/account/distribution-list');
    await expandAllSections(page);
    const href = await page.locator('main a[href^="/account/alert-settings/"]').first().getAttribute('href');
    await openPage(page, href!);

    await expect(page.locator('main h1')).toHaveText(/Edit .+ communication settings/);
    await expect(page.locator('input[name="reEntryAlerts"]').first()).toBeAttached();
  });

  test('incident banner schedule page shows the banner choices (not confirmed)', async ({ page }) => {
    await openPage(page, '/account/incident-banner');
    await page.locator('main a[href="/account/incident-banner/schedule"]').click();

    await expect(page.locator('input[name="message_id"]').first()).toBeAttached();
    await expect(page.getByRole('button', { name: 'Confirm choices' })).toBeVisible();
  });
});

test.describe('upload logs (never deleted)', () => {
  for (const [path, heading] of [
    ['/account/analysis-upload-log', 'NSpOC analysis uploads'],
    ['/account/manoeuvre-support-upload-log', 'Manoeuvre support uploads'],
    ['/account/ephemeris-upload-log', 'Ephemeris uploads'],
  ] as const) {
    test(`${heading} log loads`, async ({ page }) => {
      await openPage(page, path);

      await expect(page.locator('main h1')).toHaveText(heading);

      const rows = await resultRows(page).count();
      if (rows) {
        const firstEvent = resultRows(page).first().locator('a[href^="/conjunctions/"]').first();
        if (await firstEvent.count()) {
          await expect(firstEvent).toHaveAttribute('href', /\/conjunctions\/[\w-]+$/);
        }
      }
    });
  }
});
