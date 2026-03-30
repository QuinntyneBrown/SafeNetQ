import { test, expect } from "@playwright/test";
import { CommunityFeedPage } from "../pages/CommunityFeedPage";
import { LoginPage } from "../pages/LoginPage";
import { validLoginCredentials } from "../fixtures/test-data";

test.describe("Community feed", () => {
  let feedPage: CommunityFeedPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    const { email, password } = validLoginCredentials();
    await loginPage.login(email, password);
    await page.waitForURL("**/dashboard");

    feedPage = new CommunityFeedPage(page);
    await feedPage.navigate();
  });

  test("should display anonymized feed entries", async ({ page }) => {
    const count = await feedPage.getFeedItemCount();
    expect(count).toBeGreaterThan(0);

    // Entries should NOT contain real names — check for anonymized pattern
    const items = await feedPage.getFeedItems();
    const firstItemText = await items.first().innerText();
    expect(firstItemText).not.toMatch(
      /[A-Z][a-z]+ [A-Z][a-z]+.*@.*\.(com|co\.za)/,
    );
  });

  test("should show category icons for different emergency types", async () => {
    const categories = await feedPage.getFeedItemCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  test("should display amount ranges (not exact amounts)", async () => {
    const amounts = await feedPage.getFeedItemAmounts();
    expect(amounts.length).toBeGreaterThan(0);

    // Amounts should be displayed as ranges, e.g., "R5,000 - R10,000"
    for (const amount of amounts) {
      expect(amount).toMatch(/R[\d,]+\s*[-–]\s*R[\d,]+/);
    }
  });

  test("should show members helped count and total distributed", async () => {
    const membersHelped = await feedPage.getMembersHelpedCount();
    expect(membersHelped).toMatch(/\d+/);

    const totalDistributed = await feedPage.getTotalDistributed();
    expect(totalDistributed).toMatch(/R[\d,]+/);
  });

  test("should support infinite scroll loading", async () => {
    const initialCount = await feedPage.getFeedItemCount();
    expect(initialCount).toBeGreaterThan(0);

    await feedPage.scrollToLoadMore();

    const newCount = await feedPage.getFeedItemCount();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test("should display thank-you messages from members", async () => {
    const messages = await feedPage.getThankYouMessages();
    expect(messages.length).toBeGreaterThan(0);

    for (const msg of messages) {
      expect(msg.length).toBeGreaterThan(0);
    }
  });
});
