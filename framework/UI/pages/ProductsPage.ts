import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly products: Locator;
  readonly productName: Locator;

  private readonly URL = '/inventory.html';

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.products = page.getByTestId('inventory-item');
    this.productName = page.getByTestId('inventory-item-name');
  }

  async goto() {
    await this.page.goto(this.URL);
  }

}