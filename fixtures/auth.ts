import { test as base, Page } from '@playwright/test';
import { users } from 'data/users';
import LoginPage from 'pages/LoginPage';


interface AuthFixtures {
  loggedInPage: Page;
}

export const test = base.extend<AuthFixtures>({

  loggedInPage: async ({ page }, use) => {
    // SETUP: Login as standard user
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await page.waitForURL(/inventory/);

    await use(page);

    await page.context().clearCookies();
  }

});

export const expect = test.expect;