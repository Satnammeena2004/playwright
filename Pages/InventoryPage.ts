import { expect, Locator, Page } from "@playwright/test";





class InventoryPage {
    private readonly productList: Locator;
    private readonly sortDropdown: Locator;
    private readonly cartBadge: Locator;

    constructor(private page: Page) {
        this.productList = page.locator(".inventory_item");
        this.sortDropdown = page.locator("//select[@class='product_sort_container']");
        this.cartBadge = page.locator("//a[@class='shopping_cart_link']");
    }



    async addToCartByName(productName: string): Promise<void> {
        const product = this.page.locator('.inventory_item')
            .filter({ hasText: productName });

        await product.getByRole('button', { name: /add to cart/i }).click();
    }
    async isInventoryLoaded() {
        await expect(this.page).toHaveURL(/inventory/i);
    }

    async getProductNames(): Promise<string[]> {
        const names = await this.page
            .locator('.inventory_item_name')
            .allTextContents();
        return names;
    }

    async goToCart(): Promise<void> {
        await this.cartBadge.click();
        await expect(this.page).toHaveURL(/cart/i);
    }
    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    async productShouldDisplay() {
        const count = await this.productList.count();
        await expect(count).toBeGreaterThan(0);
    }

    async addFirstProduct(): Promise<void> {
        await this.page
            .locator('[data-test^="add-to-cart"]')
            .first()
            .click();
    }




}

export default InventoryPage;