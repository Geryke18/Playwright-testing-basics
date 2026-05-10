import { test, expect } from '../../fixtures';

test('valid login', async ({ loginTesting, productsPage }) => {
  await loginTesting.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toContainText('Products');
});

test.describe('group', {
  tag: '@invalidLogins'
}, () => {
  test('wrong username', async ({ loginTesting }) => {
    await loginTesting.login('wrong_username', 'secret_sauce');
    await expect(loginTesting.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('wrong password', async ({ loginTesting }) => {
    await loginTesting.login('standard_user', 'wrong_password');
    await expect(loginTesting.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('missing username and password', async ({ loginTesting }) => {
    await loginTesting.login('', '');
    await expect(loginTesting.error).toHaveText('Epic sadface: Username is required');
  });

  test('missing password', async ({ loginTesting }) => {
    await loginTesting.login('standard_user', '');
    await expect(loginTesting.error).toHaveText('Epic sadface: Password is required');
  });
});