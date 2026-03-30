import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  protected readonly path = "/login";

  // -- Locators -------------------------------------------------------------

  private get emailInput(): Locator {
    return this.getByLabel(/email/i);
  }

  private get passwordInput(): Locator {
    return this.getByLabel(/password/i);
  }

  private get loginButton(): Locator {
    return this.getByRole("button", { name: /log\s?in/i });
  }

  private get forgotPasswordLink(): Locator {
    return this.getByRole("link", { name: /forgot password/i });
  }

  private get mfaCodeInput(): Locator {
    return this.getByLabel(/verification code|mfa code/i);
  }

  private get loginError(): Locator {
    return this.getByTestId("login-error");
  }

  private get accountLockedMessage(): Locator {
    return this.getByTestId("account-locked");
  }

  // -- Actions --------------------------------------------------------------

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async enterMfaCode(code: string): Promise<void> {
    await this.mfaCodeInput.fill(code);
    await this.getByRole("button", { name: /verify/i }).click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  // -- Queries --------------------------------------------------------------

  async getLoginError(): Promise<string> {
    await this.loginError.waitFor({ state: "visible" });
    return this.loginError.innerText();
  }

  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForURL("**/dashboard", { timeout: 10_000 });
    return this.page.url().includes("/dashboard");
  }

  async isAccountLocked(): Promise<boolean> {
    return this.accountLockedMessage.isVisible();
  }
}
