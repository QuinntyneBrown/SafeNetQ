import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import {
  validRegistration,
  invalidRegistration,
  existingUserRegistration,
  validLoginCredentials,
  invalidLoginCredentials,
  adminCredentials,
} from "../fixtures/test-data";

test.describe("Registration", () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  test("should display registration form with all required fields", async ({ page }) => {
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/^password$/i)).toBeVisible();
    await expect(page.getByRole("checkbox", { name: /terms/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  });

  test("should show validation errors for invalid registration data", async () => {
    const data = invalidRegistration();
    await registerPage.fillRegistrationForm(data);
    await registerPage.clickCreateAccount();

    const errors = await registerPage.getValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
  });

  test("should register a new member successfully", async () => {
    const data = validRegistration();
    await registerPage.fillRegistrationForm(data);
    await registerPage.clickCreateAccount();

    expect(await registerPage.isRegistrationComplete()).toBe(true);
  });

  test("should show error for duplicate email registration", async () => {
    const data = existingUserRegistration();
    await registerPage.fillRegistrationForm(data);
    await registerPage.clickCreateAccount();

    const toast = await registerPage.getToastText();
    expect(toast).toContain("already registered");
  });
});

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("should login with valid credentials", async () => {
    const { email, password } = validLoginCredentials();
    await loginPage.login(email, password);

    expect(await loginPage.isLoggedIn()).toBe(true);
  });

  test("should show error for invalid credentials", async () => {
    const { email, password } = invalidLoginCredentials();
    await loginPage.login(email, password);

    const error = await loginPage.getLoginError();
    expect(error).toContain("Invalid email or password");
  });

  test("should enforce MFA for admin accounts", async () => {
    const admin = adminCredentials();
    await loginPage.login(admin.email, admin.password);

    // Should be prompted for MFA code, not redirected to dashboard
    await expect(loginPage["page"].getByLabel(/verification code|mfa code/i)).toBeVisible();
  });

  test("should reset password via email link", async ({ page }) => {
    await loginPage.clickForgotPassword();

    await expect(page).toHaveURL(/\/forgot-password/);
    await expect(page.getByLabel(/email/i)).toBeVisible();

    await page.getByLabel(/email/i).fill("thabo.mokoena@example.com");
    await page.getByRole("button", { name: /send.*reset|reset.*link/i }).click();

    await expect(page.getByText(/check your email|reset link sent/i)).toBeVisible();
  });

  test("should lock account after 5 failed login attempts", async () => {
    const { email } = validLoginCredentials();

    for (let i = 0; i < 5; i++) {
      await loginPage.login(email, "WrongPassword!");
      // Clear fields for next attempt (if the page doesn't auto-clear)
      if (i < 4) {
        await loginPage.navigate();
      }
    }

    expect(await loginPage.isAccountLocked()).toBe(true);
  });
});
