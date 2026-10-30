import fs from 'node:fs';
import path from 'node:path';

import type { Download, Page, Response } from '@playwright/test';
import { expect, test as base } from '@playwright/test';

import { AUTH_DIR } from './accounts';

export const password = () => {
  const value = process.env.E2E_PASSWORD;
  if (!value) {
    throw new Error('Set E2E_PASSWORD to the test accounts\' password');
  }
  return value;
};

/** Sign in through the real Auth0 universal login page. */
export async function signIn(page: Page, email: string) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(/auth0\.com/);
  await page.locator('input[name="username"]').fill(email);
  await page.locator('input[name="password"]').fill(password());
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.waitForURL(url => !url.hostname.includes('auth0.com'), { timeout: 60_000 });

  await expect(page).toHaveURL(/\/home/);
}

/** IDs of real records on the target environment, found by data.setup.ts. */
export type TestData = {
  conjunction: string;
  conjunctionWithAlert?: string;
  reentry: string;
  reentryWithAlert?: string;
  fragmentation: string;
  satellite: string;
  organisation: string;
  activity?: string;
};

export const TEST_DATA_PATH = path.join(AUTH_DIR, 'test-data.json');

export const testData = (): TestData => JSON.parse(fs.readFileSync(TEST_DATA_PATH, 'utf8'));

export const fillPath = (template: string, data: TestData) =>
  template.replace(/\{(\w+)\}/g, (_, key: keyof TestData) => {
    const value = data[key];
    if (!value) {
      throw new Error(`No ${key} found on this environment`);
    }
    return value;
  });

/** IDs linked from the main table on a list page, e.g. event IDs on /conjunctions. */
export async function linkIds(page: Page, url: string, prefix: string): Promise<string[]> {
  await goto(page, url);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  const hrefs = await page.locator(`main table a[href^="${prefix}/"]`).evaluateAll(
    links => links.map(a => a.getAttribute('href') ?? ''),
  );

  return [...new Set(hrefs.map(h => h.slice(prefix.length + 1).split(/[/?#]/)[0]!).filter(Boolean))];
}

const NOT_FOUND = /Page not found/i;
const FORBIDDEN = /403 - Forbidden/i;
const SERVER_ERROR = /Something went wrong/i;

/**
 * Navigate, retrying once if the load balancer returns a gateway error (502-504).
 * The retry is recorded on the test so outages still show up in the report.
 */
export async function goto(page: Page, url: string): Promise<Response | null> {
  const response = await page.goto(url);
  if (response && response.status() >= 502 && response.status() <= 504) {
    base.info().annotations.push({ type: 'warning', description: `${response.status()} from ${url}, retried` });
    await page.waitForTimeout(5_000);
    return page.goto(url);
  }

  return response;
}

/** Open a page and check the server rendered it without an error page. */
export async function openPage(page: Page, url: string): Promise<Response | null> {
  const response = await goto(page, url);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  const h1 = page.locator('main h1').first();

  await expect(h1, `${url} should render a page heading`).toBeVisible();
  await expect(h1, `${url} should not show the error page`).not.toHaveText(SERVER_ERROR);
  await expect(h1, `${url} should not show Page not found`).not.toHaveText(NOT_FOUND);
  await expect(h1, `${url} should not show 403 Forbidden`).not.toHaveText(FORBIDDEN);
  expect(response?.status() ?? 200, `${url} HTTP status`).toBeLessThan(400);

  return response;
}

/** Check a page is blocked for the current user (404 or redirected to /forbidden). */
export async function expectBlocked(page: Page, url: string) {
  await goto(page, url);
  const h1 = page.locator('main h1').first();

  await expect(h1).toHaveText(new RegExp(`${NOT_FOUND.source}|${FORBIDDEN.source}`, 'i'));
}

/** The last table on the page, which on list pages is the main results table. */
export const resultsTable = (page: Page) => page.locator('main table').last();

export const resultRows = (page: Page) => resultsTable(page).locator('tbody tr');

/**
 * Type into a search bar and submit. Retries because typing before React hydrates the
 * page is lost, which would otherwise make search tests flaky.
 */
export async function search(page: Page, input: string, term: string) {
  await expect(async () => {
    await page.locator(input).fill(term);

    await expect(page.locator(input)).toHaveValue(term);

    await page.locator(input).press('Enter');

    await expect(page).toHaveURL(/search_like=/, { timeout: 5_000 });
  }).toPass({ timeout: 45_000 });
}

/** Expand every accordion section on the page. */
export async function expandAllSections(page: Page) {
  const toggles = page.locator('.govuk-accordion__show-all');
  for (let i = 0; i < await toggles.count(); i++) {
    if (await toggles.nth(i).getAttribute('aria-expanded') !== 'true') {
      await toggles.nth(i).click();
    }

    await expect(toggles.nth(i)).toHaveAttribute('aria-expanded', 'true');
  }
}

/** Click a button that should start a file download, and check the file isn't empty. */
export async function expectDownload(page: Page, click: () => Promise<void>, filename: RegExp): Promise<Download> {
  const [download] = await Promise.all([page.waitForEvent('download', { timeout: 60_000 }), click()]);

  expect(download.suggestedFilename()).toMatch(filename);

  const file = await download.path();

  expect(fs.statSync(file).size, `${download.suggestedFilename()} should not be empty`).toBeGreaterThan(0);

  return download;
}

/**
 * Next.js server actions are POST requests with a `Next-Action` header. Reads use them too,
 * so they can't be blocked for a whole test. Wrap any form submit in this to make sure
 * nothing reaches the server: the test fails if a request is attempted.
 */
export async function withoutServerWrites(page: Page, action: () => Promise<void>) {
  const attempted: string[] = [];
  const handler = async (route: import('@playwright/test').Route) => {
    const request = route.request();
    if (request.method() !== 'GET' && request.headers()['next-action']) {
      attempted.push(`${request.method()} ${request.url()}`);
      return route.abort();
    }
    return route.fallback();
  };
  await page.route('**/*', handler);
  try {
    await action();
  } finally {
    await page.unroute('**/*', handler);
  }

  expect(attempted, 'form submit should have been stopped by validation').toEqual([]);
}

// React hydration mismatches (#418, #423, #425): React recovers, so these are reported, not failed
const HYDRATION_ERROR = /Minified React error #(?:418|423|425)/;

/** Fails the test if the page throws an uncaught JavaScript error. */
export const test = base.extend<{ failOnPageError: void }>({
  failOnPageError: [async ({ page }, use, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));

    await use();

    if (errors.length) {
      await testInfo.attach('page-errors', { body: errors.join('\n\n'), contentType: 'text/plain' });
    }
    const hydration = errors.filter(e => HYDRATION_ERROR.test(e));
    if (hydration.length) {
      testInfo.annotations.push({ type: 'warning', description: `React hydration mismatch on ${page.url()}` });
    }

    expect(errors.filter(e => !HYDRATION_ERROR.test(e)), 'uncaught errors in the browser').toEqual([]);
  }, { auto: true }],
});

export { expect };
