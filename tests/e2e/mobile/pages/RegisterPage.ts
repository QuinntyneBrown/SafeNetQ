import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  private screenId = 'register-screen';
  private firstNameInputId = 'register-first-name-input';
  private lastNameInputId = 'register-last-name-input';
  private emailInputId = 'register-email-input';
  private phoneInputId = 'register-phone-input';
  private passwordInputId = 'register-password-input';
  private agreeTermsCheckboxId = 'agree-terms-checkbox';
  private createAccountButtonId = 'create-account-button';
  private validationErrorsId = 'register-validation-errors';

  async isRegisterScreenVisible(): Promise<void> {
    await this.waitForScreen(this.screenId);
  }

  async enterFirstName(firstName: string): Promise<void> {
    await element(by.id(this.firstNameInputId)).clearText();
    await element(by.id(this.firstNameInputId)).typeText(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await element(by.id(this.lastNameInputId)).clearText();
    await element(by.id(this.lastNameInputId)).typeText(lastName);
  }

  async enterEmail(email: string): Promise<void> {
    await element(by.id(this.emailInputId)).clearText();
    await element(by.id(this.emailInputId)).typeText(email);
  }

  async enterPhone(phone: string): Promise<void> {
    await element(by.id(this.phoneInputId)).clearText();
    await element(by.id(this.phoneInputId)).typeText(phone);
  }

  async enterPassword(password: string): Promise<void> {
    await element(by.id(this.passwordInputId)).clearText();
    await element(by.id(this.passwordInputId)).typeText(password);
  }

  async tapAgreeTerms(): Promise<void> {
    await element(by.id(this.agreeTermsCheckboxId)).tap();
  }

  async tapCreateAccount(): Promise<void> {
    await element(by.id(this.createAccountButtonId)).tap();
  }

  async getValidationErrors(): Promise<string> {
    const attrs = await element(by.id(this.validationErrorsId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPhone(phone);
    await this.enterPassword(password);
    await this.dismissKeyboard();
    await this.tapAgreeTerms();
  }
}
