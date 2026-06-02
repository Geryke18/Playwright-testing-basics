import { test, expect } from '../../fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test('valid login', async ({ loginPage, productsPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toContainText('Products');
});

test.describe('group', {
  tag: '@invalidLogins'
}, () => {
  test('wrong username', async ({ loginPage }) => {
    await loginPage.login('wrong_username', 'secret_sauce');
    await expect(loginPage.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('wrong password', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('missing username and password', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.error).toHaveText('Epic sadface: Username is required');
  });

  test('missing password', async ({ loginPage }) => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.error).toHaveText('Epic sadface: Password is required');
  });
});