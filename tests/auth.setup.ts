import path from 'node:path';

import { expect, test as setup } from '@playwright/test';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');

  const navigationPromise = page.waitForURL(/auth0.com/g);

  await page.getByText('Sign in').click();

  await navigationPromise;

  await page.getByLabel('Email address').fill('nowakf@gmail.com');
  await page.getByLabel('Password').fill('Pipass12#');
  await page.getByRole('button', { name: 'Continue' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/dashboard');

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText('nowakf@gmail.com')).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
