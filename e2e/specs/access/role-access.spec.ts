import type { Page } from '@playwright/test';

import { expectedNav, hasScopedData, LIST_PAGES, PAGE_RULES, selectedAccounts, storageStatePath } from '../../support/accounts';
import type { TestData } from '../../support/helpers';
import { expect, expectBlocked, fillPath, linkIds, openPage, test, testData } from '../../support/helpers';

// For every test account, check each page is open or blocked as the role rules say

/** Swap shared IDs for ones from this user's own list pages. Returns null if the user can see none. */
async function ownData(page: Page, template: string): Promise<TestData | null> {
  const data = { ...testData() };
  for (const [, key] of template.matchAll(/\{(\w+)\}/g)) {
    const source = LIST_PAGES[key!];
    if (!source) {
      continue;
    }
    const [id] = await linkIds(page, source.list, source.prefix);
    if (!id) {
      return null;
    }
    (data as Record<string, string>)[key!] = id;
  }

  return data;
}

for (const account of selectedAccounts()) {
  test.describe(`${account.key} (${account.role})`, () => {
    test.use({ storageState: storageStatePath(account.key) });

    test('service navigation shows the right links', async ({ page }) => {
      await openPage(page, '/home');
      const nav = page.locator('nav .govuk-service-navigation__list');
      const links = await nav.getByRole('link').allInnerTexts();

      expect(links.map(l => l.trim())).toEqual(expectedNav(account.role));
      await expect(nav.getByRole('button', { name: 'Sign out' })).toBeVisible();
    });

    for (const rule of PAGE_RULES) {
      const allowed = rule.allowed(account.role);

      test(`${allowed ? 'can' : 'cannot'} open ${rule.path}`, async ({ page }) => {
        if (!allowed) {
          await expectBlocked(page, fillPath(rule.path, testData()));
          return;
        }

        const data = rule.path.includes('{') && hasScopedData(account.role) ? await ownData(page, rule.path) : testData();

        test.skip(!data, `${account.key} has no records to open on this environment`);

        await openPage(page, fillPath(rule.path, data!));

        await expect(page.locator('main h1').first()).toHaveText(rule.heading);
      });
    }
  });
}
