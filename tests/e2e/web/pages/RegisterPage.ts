import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  protected readonly path = "/register";

  // -- Locators -------------------------------------------------------------

  private get firstNameInput(): Locator {
    return this.getByLabel(/first name/i);
  }

  private get lastNameInput(): Locator {
    return this.getByLabel(/last name/i);
  }

  private get emailInput(): Locator {
    return this.getByLabel(/email/i);
  }

  private get phoneInput(): Locator {
    return this.getByLabel(/phone/i);
  }

  private get passwordInput(): Locator {
    return this.getByLabel(/^password$/i);
  }

  private get termsCheckbox(): Locator {
    return this.getByRole("checkbox", { name: /terms/i });
  }

  private get createAccountButton(): Locator {
    return this.getByRole("button", { name: /create account/i });
  }

  private get validationErrors(): Locator {
    return this.locator('[data-testid="validation-error"], [role="alert"].field-error');
  }

  private get successMessage(): Locator {
    return this.getByTestId("registration-success");
  }

  // -- Actions --------------------------------------------------------------

  async fillFirstName(name: string): Promise<void> {
    await this.firstNameInput.fill(name);
  }

  async fillLastName(name: string): Promise<void> {
    await this.lastNameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async checkTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    acceptTerms: boolean;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    await this.fillPhone(data.phone);
    await this.fillPassword(data.password);
    if (data.acceptTerms) {
      await this.checkTerms();
    }
  }

  // -- Queries --------------------------------------------------------------

  async getValidationErrors(): Promise<string[]> {
    const errors = await this.validationErrors.allInnerTexts();
    return errors;
  }

  async isRegistrationComplete(): Promise<boolean> {
    return this.successMessage.isVisible();
  }
}
