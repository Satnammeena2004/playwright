import { expect, Locator, type Page } from "@playwright/test";




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
    this.submitButton = page.locator("#login-button");
    this.errorMessage = page.locator('h3[data-test="error"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");

  }
  async login(u_name: string, pass: string) {
    await this.goto();
    await this.enterUsername(u_name);
    await this.enterPassword(pass);
    await this.clickLogin();
  }

  async clickLogin() {
    await this.submitButton.click();

  }

  async wrongCrendentialsShouldShowErrorMessage(u_name: string, pass: string): Promise<void> {
    await this.login(u_name, pass);
    await expect(this.errorMessage).toBeVisible();
  }

  async asswerionForErrorMessage() {

    await expect(this.errorMessage).toBeVisible();
  }

  async loginWithOnlyUsername(u_name: string) {
    await this.enterUsername(u_name)
    await this.clickLogin();
    await this.asswerionForErrorMessage()


  }
  async loginWithOnlyPassword(pass: string) {
    await this.enterPassword(pass)
    await this.clickLogin();
    await this.asswerionForErrorMessage()


  }

  async enterUsername(username: string) {
    await this.username.fill(username);

  }
  async enterPassword(password: string) {
    await this.password.fill(password);

  }

  async correctCrendentialsLoginShould_GotoInventory(u_name: string, pass: string): Promise<void> {
    await this.login(u_name, pass);
    await expect(this.page).toHaveURL(/inventory/i);
  }

}

export default LoginPage;
