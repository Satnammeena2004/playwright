import { Page, Locator, expect } from '@playwright/test';

 class CartPage {
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(private page: Page) {
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
    }

    async assertItemCount(count: number): Promise<void> {
        await expect(this.cartItems).toHaveCount(count);
    }
    async assertCartIsLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/cart/i);
    }
    async assertProductInCart(productName: string): Promise<void> {
        await expect(
            this.page.locator('.cart_item').filter({ hasText: productName })
        ).toBeVisible();
    }

    async removeItem(productName: string): Promise<void> {
        const item = this.page.locator('.cart_item').filter({ hasText: productName });
        await item.getByRole('button', { name: /remove/i }).click();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}

export default CartPage;