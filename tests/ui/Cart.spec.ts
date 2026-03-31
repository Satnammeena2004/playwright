import CartPage from "@pages/CartPage";
import InventoryPage from "@pages/InventoryPage";
import { takeScreenshot } from "@utils/screenshots";
import { expect, test } from "fixtures/auth";

test.describe('Cart Tests @regression', () => {

    test('add single product to cart', async ({ loggedInPage }) => {
        const inventory = new InventoryPage(loggedInPage);
        const cart = new CartPage(loggedInPage);

        await inventory.isInventoryLoaded();

        await inventory.addToCartByName('Sauce Labs Backpack');

        const count = await inventory.getCartItemCount();
        expect(count).toBe(1);

        await inventory.goToCart();
        await takeScreenshot(loggedInPage, 'cart-with-item');
    })

    test('add multiple products to cart', async ({ loggedInPage }) => {
        const inventory = new InventoryPage(loggedInPage);
        const cart = new CartPage(loggedInPage);

        await inventory.addToCartByName('Sauce Labs Backpack');
        await inventory.addToCartByName('Sauce Labs Bike Light');

        const count = await inventory.getCartItemCount();
        expect(count).toBe(2);

        await inventory.goToCart();
        await cart.assertItemCount(2);
    });

    test('remove product from cart', async ({ loggedInPage }) => {
        const inventory = new InventoryPage(loggedInPage);
        const cart = new CartPage(loggedInPage);

        await inventory.addToCartByName('Sauce Labs Backpack');
        await inventory.goToCart();
        await cart.assertItemCount(1);
        await cart.removeItem('Sauce Labs Backpack');
        await cart.assertItemCount(0);
    });


    test('sort products low to high price', async ({ loggedInPage }) => {
        const inventory = new InventoryPage(loggedInPage);

        await inventory.sortBy('lohi');

        const names = await inventory.getProductNames();
        expect(names.length).toBeGreaterThan(0);
    });
})