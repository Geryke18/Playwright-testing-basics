import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly products: Locator;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.products = page.locator('[data-test="inventory-item"]');
    this.productName = page.locator('[data-test="inventory-item-name"]');
  }

}