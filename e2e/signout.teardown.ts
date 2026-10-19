import { accountByKeyOrThrow } from './support/accounts';
import { expect, signIn, test } from './support/helpers';

// Runs after all other tests, with its own fresh session, so it can't sign anyone else out

test('sign out ends the session', async ({ page }) => {
  await signIn(page, accountByKeyOrThrow('GovernmentUser').email);
  await page.locator('nav').getByRole('button', { name: 'Sign out' }).click();

  // Sign out goes through Auth0's logout page and back to the landing page
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible({ timeout: 60_000 });
  await expect(page.locator('nav').getByRole('button', { name: 'Sign out' })).toBeHidden();

  await page.goto('/home');

  await expect(page).toHaveURL(/callbackUrl=/);
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
