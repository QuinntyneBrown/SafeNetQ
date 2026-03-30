import { test, expect } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";
import { KycPage } from "../pages/KycPage";
import { TierSelectionPage } from "../pages/TierSelectionPage";
import { PaymentSetupPage } from "../pages/PaymentSetupPage";
import { DashboardPage } from "../pages/DashboardPage";
import { validRegistration, TIER_OPTIONS } from "../fixtures/test-data";

test.describe("Onboarding flow", () => {
  test("should complete full onboarding flow (register -> verify -> KYC -> tier -> payment -> done)", async ({
    page,
  }) => {
    // Step 1: Register
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillRegistrationForm(validRegistration());
    await registerPage.clickCreateAccount();
    expect(await registerPage.isRegistrationComplete()).toBe(true);

    // Step 2: KYC
    const kycPage = new KycPage(page);
    await kycPage.navigate();
    await kycPage.selectIdType("National ID");
    await kycPage.uploadIdDocument("fixtures/sample-id.jpg");
    await kycPage.confirmAddress();
    await kycPage.clickUploadContinue();
    expect(await kycPage.isKycComplete()).toBe(true);

    // Step 3: Select Tier
    const tierPage = new TierSelectionPage(page);
    await tierPage.navigate();
    await tierPage.selectTier("Standard");
    await tierPage.clickContinue();

    // Step 4: Payment
    const paymentPage = new PaymentSetupPage(page);
    await paymentPage.navigate();
    await paymentPage.selectPaymentMethod("Credit Card");
    await paymentPage.fillCardDetails({
      number: "4242424242424242",
      expiry: "12/28",
      cvc: "123",
    });
    await paymentPage.clickSetupPayment();

    // Step 5: Arrive at dashboard
    const dashboardPage = new DashboardPage(page);
    await expect(page).toHaveURL(/\/dashboard/);
    const welcome = await dashboardPage.getWelcomeMessage();
    expect(welcome).toBeTruthy();
  });

  test("should show progress indicator during onboarding", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();

    const progressBar = page.getByTestId("onboarding-progress");
    await expect(progressBar).toBeVisible();
  });

  test("should allow selecting ID type during KYC", async ({ page }) => {
    const kycPage = new KycPage(page);
    await kycPage.navigate();

    const idTypeSelect = page.getByLabel(/id type|identification type/i);
    await expect(idTypeSelect).toBeVisible();

    await kycPage.selectIdType("Passport");
    await expect(idTypeSelect).toHaveValue(/passport/i);
  });

  test("should show upload zone for ID document", async ({ page }) => {
    const kycPage = new KycPage(page);
    await kycPage.navigate();

    const uploadZone = page.getByTestId("id-upload-zone");
    await expect(uploadZone).toBeVisible();
  });

  test("should display three contribution tiers with correct pricing", async ({ page }) => {
    const tierPage = new TierSelectionPage(page);
    await tierPage.navigate();

    for (const tier of TIER_OPTIONS) {
      const card = page.getByTestId(`tier-card-${tier.name.toLowerCase()}`);
      await expect(card).toBeVisible();
      await expect(card).toContainText(String(tier.monthlyAmount));
    }
  });

  test("should show fee breakdown when tier is selected", async ({ page }) => {
    const tierPage = new TierSelectionPage(page);
    await tierPage.navigate();

    await tierPage.selectTier("Standard");

    const breakdown = await tierPage.getFeeBreakdown();
    expect(breakdown).toBeTruthy();
    expect(breakdown).toContain("150");
  });

  test("should accept credit card payment setup", async ({ page }) => {
    const paymentPage = new PaymentSetupPage(page);
    await paymentPage.navigate();

    await paymentPage.selectPaymentMethod("Credit Card");
    await paymentPage.fillCardDetails({
      number: "4242424242424242",
      expiry: "12/28",
      cvc: "123",
    });
    await paymentPage.clickSetupPayment();

    await expect(page.getByText(/payment.*set\s?up|success/i)).toBeVisible();
  });
});
