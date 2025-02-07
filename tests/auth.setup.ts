import path from 'node:path';

import { test as setup } from '@playwright/test';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');

  const navigationPromise = page.waitForURL(/auth0.com/g);

  await page.getByText('Sign in').click();

  await navigationPromise;

  await page.getByLabel('Email address').fill(process.env.TEST_USERNAME as string);
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD as string);
  await page.getByRole('button', { name: 'Continue' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/home');

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
