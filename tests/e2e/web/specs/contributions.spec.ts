import { test, expect } from "@playwright/test";
import { ContributionHistoryPage } from "../pages/ContributionHistoryPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { validLoginCredentials } from "../fixtures/test-data";

test.describe("Contribution management", () => {
  let contributionPage: ContributionHistoryPage;

  test.beforeEach(async ({ page }) => {
    // Login first
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const { email, password } = validLoginCredentials();
    await loginPage.login(email, password);
    await page.waitForURL("**/dashboard");

    // Navigate to contributions
    contributionPage = new ContributionHistoryPage(page);
    await contributionPage.navigate();
  });

  test("should display contribution history with all columns", async () => {
    const headers = await contributionPage.getTableHeaderTexts();

    expect(headers).toContain("Date");
    expect(headers).toContain("Amount");
    expect(headers).toContain("Tier");
    expect(headers).toContain("Status");
  });

  test("should filter contributions by date range", async ({ page }) => {
    await contributionPage.filterByDateRange("2024-10-01", "2024-11-30");

    const rows = await contributionPage.getContributionRows();
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should filter contributions by status", async ({ page }) => {
    await contributionPage.filterByStatus("Completed");

    const rows = await contributionPage.getContributionRows();
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    // All visible rows should have "Completed" status
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      await expect(row).toContainText("Completed");
    }
  });

  test("should show correct contribution amounts and tiers", async ({ page }) => {
    const rows = await contributionPage.getContributionRows();
    const firstRow = rows.first();

    // Each row should display an amount with currency
    await expect(firstRow).toContainText(/R\s?\d+/);
    // Each row should display a tier name
    await expect(firstRow).toContainText(/Basic|Standard|Premium/);
  });

  test("should allow exporting history as CSV", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await contributionPage.exportCsv();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/contributions.*\.csv$/i);
  });

  test("should display monthly contribution receipt", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await contributionPage.downloadReceipt(0);
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/receipt.*\.pdf$/i);
  });
});
