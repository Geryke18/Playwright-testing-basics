import { test as setup, expect } from "../../fixtures";

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, loginPage, productsPage}) => {
  await loginPage.goto();

  await loginPage.login('standard_user', 'secret_sauce');
  await expect(productsPage.title).toContainText('Products');

  await page.context().storageState({ path: authFile });
});