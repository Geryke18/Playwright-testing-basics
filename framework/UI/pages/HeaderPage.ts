import { type Locator, type Page } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly shoppingCartBtn: Locator;
  readonly shoppingCartBadge: Locator;
  readonly menuBtn: Locator;
  readonly logoutBtn: Locator;
  readonly goToProductsBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBtn = page.getByTestId('shopping-cart-link');
    this.shoppingCartBadge =  page.getByTestId('shopping-cart-badge');
    this.menuBtn =  page.getByRole('button', { name: 'Open Menu' });
    this.logoutBtn =  page.getByTestId('logout-sidebar-link');
    this.goToProductsBtn =  page.getByTestId('inventory-sidebar-link');
  }

  async logout(){
    await this.menuBtn.click();
    await this.logoutBtn.click();
  }

  async goToProducts(){
    await this.menuBtn.click();
    await this.goToProductsBtn.click();
  }
}