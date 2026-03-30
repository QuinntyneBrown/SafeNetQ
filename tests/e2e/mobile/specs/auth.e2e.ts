import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';

describe('Authentication', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let dashboardPage: DashboardPage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    registerPage = new RegisterPage();
    dashboardPage = new DashboardPage();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Login Screen', () => {
    it('should display login screen on first launch', async () => {
      await loginPage.isLoginScreenVisible();
      await expect(element(by.id('login-email-input'))).toBeVisible();
      await expect(element(by.id('login-password-input'))).toBeVisible();
      await expect(element(by.id('login-button'))).toBeVisible();
    });

    it('should show validation for empty fields', async () => {
      await loginPage.isLoginScreenVisible();
      await loginPage.tapLogin();
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain('required');
    });

    it('should login with valid credentials', async () => {
      await loginPage.isLoginScreenVisible();
      await loginPage.loginWithCredentials(
        'testuser@safenetq.com',
        'SecurePass123!'
      );
      await dashboardPage.isDashboardVisible();
    });

    it('should show error for invalid credentials', async () => {
      await loginPage.isLoginScreenVisible();
      await loginPage.loginWithCredentials(
        'invalid@safenetq.com',
        'WrongPassword'
      );
      const errorMsg = await loginPage.getErrorMessage();
      expect(errorMsg).toContain('Invalid email or password');
    });

    it('should navigate to registration from login', async () => {
      await loginPage.isLoginScreenVisible();
      await loginPage.tapRegister();
      await registerPage.isRegisterScreenVisible();
    });

    it('should support biometric login toggle', async () => {
      await loginPage.isLoginScreenVisible();
      await expect(element(by.id('biometric-toggle'))).toBeVisible();
      await loginPage.tapUseBiometric();
      await expect(element(by.id('biometric-toggle'))).toHaveToggleValue(true);
    });
  });

  describe('Registration', () => {
    beforeEach(async () => {
      await loginPage.isLoginScreenVisible();
      await loginPage.tapRegister();
      await registerPage.isRegisterScreenVisible();
    });

    it('should complete registration form', async () => {
      await registerPage.fillRegistrationForm(
        'Jane',
        'Doe',
        'jane.doe@safenetq.com',
        '+1234567890',
        'SecurePass123!'
      );
      await registerPage.tapCreateAccount();
      await dashboardPage.isDashboardVisible();
    });
  });
});
