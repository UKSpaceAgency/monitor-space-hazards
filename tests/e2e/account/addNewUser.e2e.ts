import { expect, test } from '@playwright/test';

test.describe('Add new user page', () => {
  test('should render', async ({ page }) => {
    await page.goto('/account/add-new-user');

    await expect(
      page.getByRole('heading', { name: 'Add a new user' }),
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Add user' }),
    ).toBeVisible();

    await expect(
      page.getByText('What can these accounts do?'),
    ).toBeVisible();
  });

  test('should fill form and show error with already exists user', async ({ page }) => {
    await page.goto('/account/add-new-user');

    await page.getByLabel('First name').fill('John');
    await page.getByLabel('Last name').fill('Doe');
    await page.getByLabel('Email address').fill('2@2.com');
    await page.getByLabel('Phone number').fill('7985559984');
    await page.getByLabel('Agency Admin').check();

    await page.getByRole('button', { name: 'Add user' }).first().click();

    await expect(
      page.getByText('Email address: User already exists'),
    ).toBeVisible();
  });

  test('should show all errors', async ({ page }) => {
    await page.goto('/account/add-new-user');

    await page.getByLabel('Phone number').fill('123');

    await page.getByRole('button', { name: 'Add user' }).first().click();

    await expect(
      page.getByText('Email address: Must be correct email format'),
    ).toBeVisible();
    await expect(
      page.getByText('First name: Field is required'),
    ).toBeVisible();
    await expect(
      page.getByText('Last name: Field is required'),
    ).toBeVisible();
    await expect(
      page.getByText('Role: Field is required'),
    ).toBeVisible();
    await expect(
      page.getByText('Phone number: Invalid phone number'),
    ).toBeVisible();
  });
});
