import { test, expect } from "@playwright/test";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { CommitteeReviewPage } from "../pages/CommitteeReviewPage";
import { LoginPage } from "../pages/LoginPage";
import { adminCredentials } from "../fixtures/test-data";

test.describe("Admin features", () => {
  let adminDashboard: AdminDashboardPage;

  test.beforeEach(async ({ page }) => {
    // Login as admin with MFA
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const admin = adminCredentials();
    await loginPage.login(admin.email, admin.password);
    await loginPage.enterMfaCode("123456"); // Placeholder MFA code
    await page.waitForURL("**/admin/**");

    adminDashboard = new AdminDashboardPage(page);
  });

  test("should display fund health dashboard with key metrics", async ({ page }) => {
    await adminDashboard.navigate();

    await expect(page.getByTestId("trust-balance")).toBeVisible();
    await expect(page.getByTestId("reserve-balance")).toBeVisible();
    await expect(page.getByTestId("reserve-ratio")).toBeVisible();
    await expect(page.getByTestId("monthly-inflow")).toBeVisible();
  });

  test("should show trust, reserve, and operating account balances", async () => {
    await adminDashboard.navigate();

    const trust = await adminDashboard.getTrustBalance();
    expect(trust).toMatch(/R[\d,]+/);

    const reserve = await adminDashboard.getReserveBalance();
    expect(reserve).toMatch(/R[\d,]+/);

    const ratio = await adminDashboard.getReserveRatio();
    expect(ratio).toMatch(/\d+(\.\d+)?%/);
  });

  test("should display member management table", async ({ page }) => {
    await adminDashboard.navigate();

    const table = await adminDashboard.getMemberTable();
    await expect(table).toBeVisible();
  });

  test("should allow searching and filtering members", async ({ page }) => {
    await adminDashboard.navigate();
    await adminDashboard.searchMembers("Thabo");

    // Wait for filtered results
    await page.waitForTimeout(500);
    const table = await adminDashboard.getMemberTable();
    await expect(table).toContainText("Thabo");
  });

  test("should show pending committee review requests", async ({ page }) => {
    const reviewPage = new CommitteeReviewPage(page);
    await reviewPage.navigate();

    const count = await reviewPage.getPendingRequestCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should allow casting approval or denial votes", async ({ page }) => {
    const reviewPage = new CommitteeReviewPage(page);
    await reviewPage.navigate();

    await reviewPage.openRequest(0);
    expect(await reviewPage.isRequestDetailVisible()).toBe(true);

    await reviewPage.addJustification("Verified documentation supports the claim.");
    await reviewPage.castVote("approve");

    const voteCount = await reviewPage.getVoteCount();
    expect(voteCount).toBeTruthy();
  });

  test("should display audit trail entries", async ({ page }) => {
    await adminDashboard.navigate();

    const entries = await adminDashboard.getAuditTrailEntries();
    const count = await entries.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should generate financial reports", async ({ page }) => {
    await adminDashboard.navigate();

    const downloadPromise = page.waitForEvent("download");
    await adminDashboard.clickGenerateReport();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/report.*\.(pdf|csv|xlsx)$/i);
  });
});
