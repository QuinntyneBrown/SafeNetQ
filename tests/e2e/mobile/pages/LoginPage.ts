import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private screenId = 'login-screen';
  private emailInputId = 'login-email-input';
  private passwordInputId = 'login-password-input';
  private loginButtonId = 'login-button';
  private registerLinkId = 'register-link';
  private forgotPasswordLinkId = 'forgot-password-link';
  private biometricToggleId = 'biometric-toggle';
  private errorMessageId = 'login-error-message';

  async isLoginScreenVisible(): Promise<void> {
    await this.waitForScreen(this.screenId);
  }

  async enterEmail(email: string): Promise<void> {
    await element(by.id(this.emailInputId)).clearText();
    await element(by.id(this.emailInputId)).typeText(email);
  }

  async enterPassword(password: string): Promise<void> {
    await element(by.id(this.passwordInputId)).clearText();
    await element(by.id(this.passwordInputId)).typeText(password);
  }

  async tapLogin(): Promise<void> {
    await element(by.id(this.loginButtonId)).tap();
  }

  async tapRegister(): Promise<void> {
    await element(by.id(this.registerLinkId)).tap();
  }

  async tapForgotPassword(): Promise<void> {
    await element(by.id(this.forgotPasswordLinkId)).tap();
  }

  async tapUseBiometric(): Promise<void> {
    await element(by.id(this.biometricToggleId)).tap();
  }

  async getErrorMessage(): Promise<string> {
    const attrs = await element(by.id(this.errorMessageId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.dismissKeyboard();
    await this.tapLogin();
  }
}
