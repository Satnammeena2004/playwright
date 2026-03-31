import InventoryPage from "@pages/InventoryPage";
import LoginPage from "@pages/LoginPage";
import test from "@playwright/test";






test.describe("Inventory tests @smoke @regression", () => {
    test.beforeEach(async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.login("standard_user", "secret_sauce");
    })
    test("after login should load inventory", async ({ page }) => {
        // const loginpage = new LoginPage(page);
        // await loginpage.login("standard_user", "secret_sauce");
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.isInventoryLoaded();
    })

    test("should display products", async ({ page }) => {

        const inventoryPage = new InventoryPage(page);
        await inventoryPage.productShouldDisplay();
    })

    test("should add product to cart by name", async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addToCartByName("Sauce Labs Backpack");
    })
}) 