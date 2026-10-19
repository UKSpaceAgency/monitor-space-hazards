import { defineConfig, devices } from '@playwright/test';

import { storageStatePath, SUPERUSER } from './e2e/support/accounts';

/**
 * Read-only end-to-end suite that runs against a deployed environment (dev by default).
 * See e2e/README.md. Run with: pnpm test:e2e:deployed
 */
const baseURL = process.env.E2E_BASE_URL || 'https://www.dev.monitor-space-hazards.service.gov.uk';
const browser = process.env.E2E_BROWSER || 'chromium';
const device = {
  chromium: devices['Desktop Chrome'],
  firefox: devices['Desktop Firefox'],
  webkit: devices['Desktop Safari'],
}[browser] ?? devices['Desktop Chrome'];

export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results/deployed',
  timeout: 90 * 1000,
  expect: { timeout: 20 * 1000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // More than 3 parallel browsers starts to cause 502s from dev
  workers: process.env.E2E_WORKERS ? Number(process.env.E2E_WORKERS) : 3,
  reporter: [
    ...(process.env.CI ? [['github'] as const] : []),
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report/deployed' }],
    // Role × page matrix: playwright-report/matrix/index.html, and the GitHub run summary
    ['./e2e/support/matrix-reporter.ts', { outputFolder: 'playwright-report/matrix', htmlReport: '../deployed/index.html' }],
  ],
  use: {
    ...device,
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    acceptDownloads: true,
    navigationTimeout: 60 * 1000,
    actionTimeout: 20 * 1000,
    // Local runs only: use an already-installed browser instead of Playwright's download
    launchOptions: process.env.E2E_BROWSER_PATH ? { executablePath: process.env.E2E_BROWSER_PATH } : {},
  },
  projects: [
    { name: 'coverage', testMatch: /specs\/coverage\/.*\.spec\.ts/ },
    { name: 'auth', testMatch: /auth\.setup\.ts/ },
    { name: 'data', testMatch: /data\.setup\.ts/, dependencies: ['auth'], teardown: 'sign-out', use: { storageState: storageStatePath(SUPERUSER) } },
    { name: 'public', testMatch: /specs\/public\/.*\.spec\.ts/ },
    { name: 'access', testMatch: /specs\/access\/.*\.spec\.ts/, dependencies: ['data'] },
    { name: 'features', testMatch: /specs\/features\/.*\.spec\.ts/, dependencies: ['data'], use: { storageState: storageStatePath(SUPERUSER) } },
    // Runs after everything else, so signing out cannot affect other tests' sessions
    { name: 'sign-out', testMatch: /signout\.teardown\.ts/ },
  ],
});
