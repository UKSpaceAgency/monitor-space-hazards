# End-to-end tests for the deployed site

A read-only [Playwright](https://playwright.dev) suite that signs in to a deployed environment (dev by default) as each test account and checks that the site's pages and features work.

This is separate from `tests/` and `playwright.config.ts`, which run against a local build.

## Run it from GitHub

1. Go to **Actions** > **End-to-end tests (deployed site)** > **Run workflow**.
2. Choose the site, browser, test accounts and which tests to run. The defaults test everything on dev in Chromium.
3. When it finishes, open the run. Its **Summary** page shows the results, including the role × page matrix.
4. For more detail, download the **playwright-report** artifact:
   - `matrix/index.html`: the same matrix and test lists. Select any result to open it in the full report
   - `deployed/index.html`: the full Playwright report, with screenshots and traces for each failure

   If anything failed, the **test-results** artifact also has the raw trace, screenshot and video for each failure. Open a trace with `npx playwright show-trace trace.zip`.

## Reading the results

The matrix has a row for each page and a column for each test account. Each cell says what the role should get, and an icon says whether that held:

| Cell | Meaning |
| --- | --- |
| ✅ Open | The role can open the page, as expected |
| ✅ Blocked | The role gets Page not found or 403, as expected |
| ❌ Open / ❌ Blocked | The role should get this result but didn't. Hover the cell (in the HTML version) for the error |
| ⚠️ | Failed, then passed on a retry. Worth watching |
| ⏭️ | Skipped, usually because the account has no records of that type on the site |
| ➖ | Didn't run, because a step it depends on (like signing in) failed |

The **Service navigation** row checks the menu each role sees. Below the matrix are the public, feature, coverage and sign-out tests, grouped by type.

The workflow uses the `dev` environment and needs one secret, `E2E_PASSWORD`: the shared password for the test accounts.

## Run it locally

```sh
pnpm install
pnpm exec playwright install chromium
E2E_PASSWORD='...' pnpm test:e2e:deployed
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `E2E_PASSWORD` | (required) | Password for the test accounts |
| `E2E_BASE_URL` | `https://www.dev.monitor-space-hazards.service.gov.uk` | Site to test |
| `E2E_ROLES` | `all` | Accounts for the role checks, e.g. `AgencySuperuser,SatelliteUser` |
| `E2E_BROWSER` | `chromium` | `chromium`, `firefox` or `webkit` |
| `E2E_WORKERS` | `3` | Tests run in parallel. More than 3 starts to cause 502 errors from dev |
| `E2E_BROWSER_PATH` | (none) | Use an already-installed browser, if Playwright's download is blocked |

Add `--project=coverage`, `--project=public`, `--project=access` or `--project=features` to run one group, or `--ui` to watch tests run. Results go to `playwright-report/matrix/index.html` and `playwright-report/deployed/index.html`.

## What's tested

| Group | Signed in as | Covers |
| --- | --- | --- |
| `coverage` | Nobody (reads the code, not the site) | Every route in `src/app` is tested or deliberately excluded. See below |
| `public` | Nobody | Landing page, sign-in page, redirects to sign in, public information pages, cookie banner and analytics cookies, form validation on feedback and contact-analyst forms |
| `access` | Each of the 14 test accounts | The service navigation each role sees, and which pages each role can or can't open, from the rules in `src/app/(auth)` and `src/utils/Roles.ts` |
| `features` | Agency Superuser | Search, filters, sorting, infinite scroll, CSV/JSON/PDF downloads, charts, accordions and links on the conjunction, re-entry, fragmentation, satellite, organisation, activity, performance and account pages |
| `sign-out` | Government User | Signing out ends the session. Runs last, in its own session |

Before the tests run, `auth.setup.ts` signs in each account and saves its session, and `data.setup.ts` finds real event, satellite and organisation IDs on the target site. No IDs are hardcoded, so the suite works on any environment with data.

The page rules live in `support/accounts.ts`. When a page's role check changes in the app, update `PAGE_RULES` to match.

## When you add a page

The `coverage` tests fail if a `page.tsx` in `src/app` isn't known to the suite, or if a listed route no longer exists. To fix it, add the route to one of:

- `PAGE_RULES` in `support/accounts.ts`, if every role should be checked against it. This is usually one line: the path, its heading and which roles can open it. It then appears as a row in the matrix
- `TESTED_ELSEWHERE` in `support/coverage.ts`, if you've written a public or feature test for it
- `EXCLUDED` in `support/coverage.ts`, with the reason it can't be opened safely (for example, it's only reached by submitting a form)

This catches new pages, not new features on an existing page. Those still need a feature test written for them.

## Keeping it read-only

The tests must never change data on the site. Follow these rules when adding tests:

- Never click a button that saves, sends, publishes, uploads, schedules or deletes. That includes **Save and continue**, **Add user**, **Upload**, **Confirm choices**, **Review edit** and every **Delete** link
- Only submit a form to check its validation errors, and wrap the submit in `withoutServerWrites()`. That fails the test if any request reaches the server
- Only submit forms that validate in the browser (feedback and contact analyst). The add-new-user form validates on the server, so don't submit it at all
- Don't open `/account/credentials`. Loading it calls `postUsersMeClientCredentials`, which creates credentials for the user

Server actions are POST requests whether they read or write, so a blanket network block isn't possible. These rules are what keep the suite safe.

## Test accounts

The suite uses the `monitorspace+Dev<Role>@outlook.com` accounts listed in `support/accounts.ts`. They must exist on the target site, have finished account setup and have no multi-factor authentication.
