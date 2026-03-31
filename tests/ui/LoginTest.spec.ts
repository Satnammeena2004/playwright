import test, { expect, Page } from "@playwright/test";
import { loginScenarios } from "data/users";
import LoginPage from "pages/LoginPage";




test.describe("Login Tests @smoke", () => {

    test("Correct username and password should go to inventory", async ({ page }: { page: Page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.login("standard_user", "secret_sauce");
    })


    test("incorrect username and password should show error message", async ({ page }: { page: Page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.login("wringname", "wrongpass");
    })
    // test("one of the field is empty should show error message", async ({ page }: { page: Page }) => {
    //     // test.skip(true)
    //     const loginpage = new LoginPage(page);
    //     await loginpage.loginWithOnlyUsername("standard_user");
    //     // await loginpage.loginWithOnlyPassword("password");
    // })

})

test.describe('Login - Data Driven @regression', () => {
    for (const scenario of loginScenarios) {
        test(`login as ${scenario.label}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login(scenario.user.username, scenario.user.password);

            if (scenario.shouldPass) {
                await loginPage.assertLoginSuccess();
            } else {
                await loginPage.assertionForErrorMessage(scenario.errorText!);
            }
        });
    }

});
