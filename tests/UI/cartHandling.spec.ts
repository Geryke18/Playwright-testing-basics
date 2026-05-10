import { test, expect } from '../../fixtures';
import products from '../../data/souceDemoProducts.json';

test('add than remove all items', async ({ cartPage }) => {
  for (const product of products.inventory) {
    await cartPage.addToCartAndCheck(product.name);
    await cartPage.continueShoppingBtn.click();
  }
  for (const product of products.inventory) {
    await cartPage.removeFromCartAndCheck(product.name);
    await cartPage.continueShoppingBtn.click();
  }
});

test('product remains in cart after logout', async ({ cartPage, headerPage, loginPage }) => {
  const productName = products.inventory[0].name;

  await cartPage.addToCartAndCheck(productName);
  await headerPage.logout();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(headerPage.shoppingCartBadge).toHaveText('1');
  await headerPage.shoppingCartBtn.click();
  await expect(cartPage.inventoryItems.filter({ hasText: productName })).toBeVisible();
});