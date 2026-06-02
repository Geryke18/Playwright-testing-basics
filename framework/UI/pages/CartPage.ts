import { type Locator, type Page, expect } from '@playwright/test';
import { HeaderPage } from './HeaderPage';
import { ProductsPage } from './ProductsPage';


export class CartPage {
  readonly page: Page;
  readonly headerPage: HeaderPage;
  readonly productsPage: ProductsPage;
  readonly inventoryItems: Locator;
  readonly continueShoppingBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerPage = new HeaderPage(page);
    this.productsPage = new ProductsPage(page);
    this.inventoryItems =  page.getByTestId('inventory-item');
    this.continueShoppingBtn =  page.getByTestId('continue-shopping');
  }

  async addToCartAndCheck(productName: string) {
    const isBadgeVisible = await this.headerPage.shoppingCartBadge.isVisible();
    const currentCartBadgeNumber = isBadgeVisible ? Number(await this.headerPage.shoppingCartBadge.textContent()) : 0;
    const afterAddCartBadgeNumber = currentCartBadgeNumber + 1;

    await this.productsPage.products.filter({ hasText: productName }).getByText('Add to cart').click();
    await expect(this.productsPage.products.filter({ hasText: productName }).getByText('Remove')).toBeVisible();
    await expect(this.headerPage.shoppingCartBadge).toContainText(`${afterAddCartBadgeNumber}`);
    await this.headerPage.shoppingCartBtn.click();
    await expect(this.inventoryItems.filter({ hasText: productName })).toBeVisible();
    await expect(this.inventoryItems).toHaveCount(afterAddCartBadgeNumber);
  }

  async removeFromCartAndCheck(productName: string) {
    await expect(this.headerPage.shoppingCartBadge).toBeVisible();
    const currentCartBadgeNumber = Number(await this.headerPage.shoppingCartBadge.textContent());
    const afterRemoveCartBadgeNumber = currentCartBadgeNumber - 1;

    await this.productsPage.products.filter({ hasText: productName }).getByText('Remove').click();
    await expect(this.productsPage.products.filter({ hasText: productName }).getByText('Add to cart')).toBeVisible();
    if (afterRemoveCartBadgeNumber){
      await expect(this.headerPage.shoppingCartBadge).toContainText(`${afterRemoveCartBadgeNumber}`);
    } else {
      await expect(this.headerPage.shoppingCartBadge).not.toBeVisible();
    }
    await this.headerPage.shoppingCartBtn.click();
    await expect(this.inventoryItems.filter({ hasText: productName })).not.toBeVisible();
    await expect(this.inventoryItems).toHaveCount(afterRemoveCartBadgeNumber);
  }

}