import test, { expect, Page } from "@playwright/test";
import LoginPage from "@pages/LoginPage";



test.describe("Login Tests", () => {

    test("Correct username and password should go to inventory", async ({ page }: { page: Page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.login("standard_user", "secret_sauce");
    })


    test("incorrect username and password should show error message", async ({ page }: { page: Page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.login("wringname", "wrongpass");
    })
    test("one of the field is empty should show error message", async ({ page }: { page: Page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.loginWithOnlyUsername("wringname");
        // await loginpage.loginWithOnlyPassword("password");
    })

})
