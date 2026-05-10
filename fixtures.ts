import { expect, test as base } from '@playwright/test';
import { LoginPage } from './framework/UI/pages/LoginPage';
import { ProductsPage } from './framework/UI/pages/ProductsPage';
import { CartPage } from './framework/UI/pages/CartPage';
import { HeaderPage } from './framework/UI/pages/HeaderPage';
import { PetController } from './framework/API/PetController';

type PageFixtures = {
  loginTesting: LoginPage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  headerPage: HeaderPage;
  petController: PetController;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  loginTesting: async ({ loginPage }, use) => {
    await loginPage.goto();
    await use(loginPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  cartPage: async ({ page, loginPage, productsPage }, use) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(productsPage.title).toContainText('Products');
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  headerPage: async ({ page }, use) => {
    const headerPage = new HeaderPage(page);
    await use(headerPage);
  },
  petController: async ({ request }, use) => {
    const petController = new PetController(request);
    await use(petController);
  },
});

export { expect } from '@playwright/test';