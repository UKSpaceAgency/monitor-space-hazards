import { ACCOUNTS, selectedAccounts, storageStatePath, SUPERUSER } from './support/accounts';
import { signIn, test } from './support/helpers';

// Feature tests always run as the superuser, so sign it in even when E2E_ROLES excludes it
const accounts = [...new Set([...selectedAccounts(), ACCOUNTS.find(a => a.key === SUPERUSER)!])];

test.describe.configure({ mode: 'parallel', retries: 2 });

for (const account of accounts) {
  test(`sign in as ${account.key}`, async ({ page }) => {
    await signIn(page, account.email);
    await page.context().storageState({ path: storageStatePath(account.key) });
  });
}
