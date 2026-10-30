import fs from 'node:fs';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import { PAGE_RULES } from '../../support/accounts';
import { EXCLUDED, normaliseRoute, TESTED_ELSEWHERE } from '../../support/coverage';

// Fails when a page is added to the app without being added to the suite (see support/coverage.ts)

const APP_DIR = path.resolve(__dirname, '../../../src/app');

function appRoutes(dir = APP_DIR, segments: string[] = []): string[] {
  const routes: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === 'page.tsx') {
      routes.push(`/${segments.join('/')}`);
    }
    // Skip parallel route slots like @breadcrumb and private folders like _components
    if (entry.isDirectory() && !entry.name.startsWith('@') && !entry.name.startsWith('_')) {
      // Route groups like (auth) don't appear in the URL
      const next = /^\(.*\)$/.test(entry.name) ? segments : [...segments, entry.name];
      routes.push(...appRoutes(path.join(dir, entry.name), next));
    }
  }

  return routes;
}

const routes = appRoutes();
const listed = new Map<string, string>([
  ...PAGE_RULES.map(r => [normaliseRoute(r.path), 'PAGE_RULES'] as const),
  ...Object.keys(TESTED_ELSEWHERE).map(r => [normaliseRoute(r), 'TESTED_ELSEWHERE'] as const),
  ...Object.keys(EXCLUDED).map(r => [normaliseRoute(r), 'EXCLUDED'] as const),
]);

test('finds the app routes', () => {
  expect(routes.length, `no page.tsx files found under ${APP_DIR}`).toBeGreaterThan(10);
});

test('every page in the app is tested or deliberately excluded', () => {
  const missing = routes.filter(r => !listed.has(normaliseRoute(r))).sort();

  expect(missing, 'Add these routes to PAGE_RULES (accounts.ts), or to TESTED_ELSEWHERE or EXCLUDED (coverage.ts)').toEqual([]);
});

test('every listed route still exists in the app', () => {
  const existing = new Set(routes.map(normaliseRoute));
  const stale = [...listed.keys()].filter(r => !existing.has(r)).sort();

  expect(stale, 'These routes were removed or renamed in the app; update the suite to match').toEqual([]);
});
