import fs from 'node:fs';

import type { TestData } from './support/helpers';
import { expect, linkIds, test, TEST_DATA_PATH } from './support/helpers';

// Find real records on the target environment, so tests don't depend on hardcoded IDs

test('find test data', async ({ page }) => {
  test.setTimeout(5 * 60 * 1000);

  const conjunctions = await linkIds(page, '/conjunctions?epoch=all', '/conjunctions');
  const conjunctionsWithAlert = await linkIds(page, '/conjunctions?epoch=all&report=present', '/conjunctions');
  const reentries = await linkIds(page, '/re-entries?epoch=all', '/re-entries');
  const reentriesWithAlert = await linkIds(page, '/re-entries?epoch=all&report=present', '/re-entries');
  const fragmentations = await linkIds(page, '/fragmentations', '/fragmentations');
  const satellites = await linkIds(page, '/satellites', '/satellites');
  const organisations = await linkIds(page, '/organisations', '/organisations');
  const activities = await linkIds(page, '/activity', '/activity');

  // The fragmentation edit page needs a published report, shown as an edit link
  let fragmentation: string | undefined;
  for (const id of fragmentations.slice(0, 5)) {
    await page.goto(`/fragmentations/${id}`);
    if (await page.locator(`main a[href*="/fragmentations/${id}"][href*="edit"]`).count()) {
      fragmentation = id;
      break;
    }
  }

  const data: TestData = {
    conjunction: conjunctions[0]!,
    conjunctionWithAlert: conjunctionsWithAlert[0],
    reentry: reentries[0]!,
    reentryWithAlert: reentriesWithAlert[0],
    fragmentation: fragmentation ?? fragmentations[0]!,
    satellite: satellites[0]!,
    organisation: organisations[0]!,
    activity: activities[0],
  };

  for (const key of ['conjunction', 'reentry', 'fragmentation', 'satellite', 'organisation'] as const) {
    expect(data[key], `no ${key} records found on this environment`).toBeTruthy();
  }

  fs.writeFileSync(TEST_DATA_PATH, JSON.stringify(data, null, 2));

  await test.info().attach('test-data', { body: JSON.stringify(data, null, 2), contentType: 'application/json' });
});
