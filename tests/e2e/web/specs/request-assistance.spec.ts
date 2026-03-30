import { test, expect } from "@playwright/test";
import { RequestAssistancePage } from "../pages/RequestAssistancePage";
import { RequestStatusPage } from "../pages/RequestStatusPage";
import { LoginPage } from "../pages/LoginPage";
import {
  validLoginCredentials,
  sampleAssistanceRequest,
  EMERGENCY_CATEGORIES,
} from "../fixtures/test-data";

test.describe("Assistance requests", () => {
  let requestPage: RequestAssistancePage;

  test.beforeEach(async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const { email, password } = validLoginCredentials();
    await loginPage.login(email, password);
    await page.waitForURL("**/dashboard");

    requestPage = new RequestAssistancePage(page);
    await requestPage.navigate();
  });

  test("should show all emergency categories", async () => {
    const categories = await requestPage.getCategoryOptions();

    for (const expected of EMERGENCY_CATEGORIES) {
      expect(categories).toContain(expected);
    }
  });

  test("should validate eligibility before allowing submission", async () => {
    const message = await requestPage.getEligibilityMessage();
    expect(message).toBeTruthy();
  });

  test("should show step progress indicator", async () => {
    expect(await requestPage.isStepIndicatorVisible()).toBe(true);
  });

  test("should allow selecting emergency category", async () => {
    await requestPage.selectCategory("Medical Emergency");

    const step = await requestPage.getCurrentStep();
    expect(step).toBeTruthy();
  });

  test("should require description text", async () => {
    await requestPage.selectCategory("Medical Emergency");
    await requestPage.clickNext();
    // Leave description empty and try to proceed
    await requestPage.clickNext();

    // Should show validation or remain on same step
    const step = await requestPage.getCurrentStep();
    expect(step).toContain("Description");
  });

  test("should support document upload (PDF, JPG, PNG)", async ({ page }) => {
    await requestPage.selectCategory("Medical Emergency");
    await requestPage.clickNext();
    await requestPage.fillDescription("Emergency surgery required");
    await requestPage.clickNext();

    // Upload zone should accept the specified file types
    const fileInput = page.locator('input[type="file"][data-testid="document-upload"]');
    await expect(fileInput).toHaveAttribute("accept", /\.pdf|\.jpg|\.png/);
  });

  test("should submit request and show confirmation", async () => {
    const data = sampleAssistanceRequest();

    await requestPage.selectCategory(data.category);
    await requestPage.clickNext();
    await requestPage.fillDescription(data.description);
    await requestPage.clickNext();
    // Skip document upload for this test
    await requestPage.clickNext();
    await requestPage.clickSubmit();

    expect(await requestPage.isConfirmationVisible()).toBe(true);
  });

  test("should display request timeline with status tracking", async ({ page }) => {
    const statusPage = new RequestStatusPage(page);
    await statusPage.navigateToRequest("REQ-001");

    const steps = await statusPage.getTimelineSteps();
    expect(steps.length).toBeGreaterThanOrEqual(3);

    const currentStep = await statusPage.getCurrentTimelineStep();
    expect(currentStep).toBeTruthy();
  });

  test("should show request details after submission", async ({ page }) => {
    const statusPage = new RequestStatusPage(page);
    await statusPage.navigateToRequest("REQ-001");

    const requestId = await statusPage.getRequestId();
    expect(requestId).toMatch(/REQ-\d+/);

    const status = await statusPage.getRequestStatus();
    expect(status).toBeTruthy();

    const details = await statusPage.getRequestDetails();
    expect(details).toBeTruthy();
  });

  test("should allow appeal within 14 days of denial", async ({ page }) => {
    const statusPage = new RequestStatusPage(page);
    // Navigate to a denied request
    await statusPage.navigateToRequest("REQ-DENIED-001");

    expect(await statusPage.isAppealAvailable()).toBe(true);
    await statusPage.clickAppeal();

    await expect(page.getByText(/appeal|reason for appeal/i)).toBeVisible();
  });
});
