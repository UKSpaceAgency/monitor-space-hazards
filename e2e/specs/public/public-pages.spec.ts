import { expect, openPage, test, withoutServerWrites } from '../../support/helpers';

// Pages and behaviour available without signing in

test.describe('landing page', () => {
  test('shows the service name and a sign in button', async ({ page }) => {
    await openPage(page, '/');

    await expect(page).toHaveTitle(/Monitor Space Hazards/);
    await expect(page.locator('main h1')).toHaveText('Monitor Space Hazards');
    await expect(page.getByRole('img', { name: 'National Space Operations Centre' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('sign in button goes to the Auth0 login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(/auth0\.com\/u\/login/);
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('wrong details are rejected', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign in' }).click();
    // An address with no account, so failed attempts can't lock out a real test account
    await page.locator('input[name="username"]').fill('monitorspace+DevNoSuchUser@outlook.com');
    await page.locator('input[name="password"]').fill('not-the-password');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByText(/wrong (email|username) or password|incorrect/i)).toBeVisible();
    await expect(page).toHaveURL(/auth0\.com/);
  });
});

test.describe('signed-out access', () => {
  for (const path of ['/home', '/conjunctions', '/re-entries', '/satellites', '/account']) {
    test(`${path} sends you to sign in`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveURL(new RegExp(`callbackUrl=.*${encodeURIComponent(path)}`));
      await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    });
  }
});

test.describe('public information pages', () => {
  const pages: [string, RegExp][] = [
    ['/accessibility-statement', /Accessibility statement/],
    ['/cookies', /Cookies information/],
    ['/data-privacy-notice', /Data Privacy Notice/],
    ['/feedback', /Give feedback on Monitor Space Hazards/],
    ['/contact-analyst/conjunctions', /Operations support - conjunction events/],
    ['/contact-analyst/reentries', /Operations support - re-entry events/],
    ['/contact-analyst/fragmentations', /Operations support - fragmentation events/],
  ];
  for (const [path, heading] of pages) {
    test(`${path} loads`, async ({ page }) => {
      await openPage(page, path);

      await expect(page.locator('main h1')).toHaveText(heading);
    });
  }

  test('footer links work', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    for (const name of [/Accessibility/i, /Cookies/i, /privacy/i]) {
      await expect(footer.getByRole('link', { name }).first()).toBeVisible();
    }
    await footer.getByRole('link', { name: /Accessibility/i }).first().click();

    await expect(page.locator('main h1')).toHaveText(/Accessibility statement/);
  });
});

test.describe('cookie banner', () => {
  test('rejecting analytics cookies hides the banner and remembers the choice', async ({ page }) => {
    await page.goto('/');
    const banner = page.locator('.govuk-cookie-banner');

    await expect(banner).toBeVisible();

    await banner.getByRole('button', { name: /No, do not use analytics cookies/ }).click();

    await expect(banner).toContainText('You have rejected cookies');

    await banner.getByRole('button', { name: /Hide cookie message/ }).click();

    await expect(banner).toBeHidden();

    await page.reload();

    await expect(page.locator('.govuk-cookie-banner')).toBeHidden();
  });

  test('Google Analytics cookies are not set before consent', async ({ page, context }) => {
    await page.goto('/');
    // Give analytics scripts time to run before checking for their cookies
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle');
    const names = (await context.cookies()).map(c => c.name);

    expect(names.filter(n => n.startsWith('_ga'))).toEqual([]);
  });

  test('Google Analytics cookies are not set after rejecting', async ({ page, context }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /No, do not use analytics cookies/ }).click();
    await page.reload();
    // Give analytics scripts time to run before checking for their cookies
    // eslint-disable-next-line playwright/no-networkidle
    await page.waitForLoadState('networkidle');
    const names = (await context.cookies()).map(c => c.name);

    expect(names.filter(n => n.startsWith('_ga'))).toEqual([]);
  });
});

test.describe('form validation (nothing is submitted)', () => {
  test('feedback form shows errors when empty', async ({ page }) => {
    await page.goto('/feedback');
    await withoutServerWrites(page, async () => {
      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-summary')).toBeVisible();
    });
    const summary = page.locator('.govuk-error-summary');

    await expect(summary).toContainText('Enter an email address in the correct format');
    await expect(summary).toContainText('Select your satisfaction level');
    await expect(summary).toContainText('Enter your satisfaction details');
  });

  test('feedback form rejects a badly formatted email', async ({ page }) => {
    await page.goto('/feedback');
    await withoutServerWrites(page, async () => {
      await page.locator('input[name="email"]').fill('not-an-email');
      await page.locator('input[name="satisfaction"]').first().check();
      await page.locator('textarea[name="details"]').fill('Automated test - not submitted');
      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-summary')).toContainText('Enter an email address in the correct format');
    });
  });

  test('contact analyst form needs a message', async ({ page }) => {
    await page.goto('/contact-analyst/conjunctions');
    await withoutServerWrites(page, async () => {
      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-summary')).toContainText('Enter a message');
    });
  });

  test('contact analyst form limits messages to 2000 characters', async ({ page }) => {
    await page.goto('/contact-analyst/reentries');
    await withoutServerWrites(page, async () => {
      await page.locator('textarea[name="message_content"]').fill('x'.repeat(2001));
      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(page.locator('.govuk-error-summary')).toContainText('2000 characters or fewer');
    });
  });
});
