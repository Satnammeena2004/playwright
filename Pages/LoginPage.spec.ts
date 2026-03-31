import { expect, Locator, Page } from "@playwright/test";




class LoginPage {
  page: Page
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submitButton: Locator;
  readonly errorMessage: Locator;
  constructor(page: Page
  ) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.submitButton = page.locator("input[id='user-name']");
    this.errorMessage = page.locator('h3[data-test="error"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");

  }
  async submitForm(u_name: string, pass: string) {
    this.goto();
    this.username.fill(u_name);
    this.password.fill(pass);
    this.submitButton.click();
  }

  async assertion_WrongCrendentialsShouldShowErrorMessage(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }

  async assertion_AfterLoginShould_GotoInventory(): Promise<void> {
    await expect(this.page).toHaveURL(/Inventory/);
  }
}
