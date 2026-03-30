import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CommunityFeedPage extends BasePage {
  protected readonly path = "/community";

  // -- Locators -------------------------------------------------------------

  private get feedItems(): Locator {
    return this.getByTestId("feed-item");
  }

  private get membersHelpedCount(): Locator {
    return this.getByTestId("members-helped-count");
  }

  private get totalDistributed(): Locator {
    return this.getByTestId("total-distributed");
  }

  private get loadMoreTrigger(): Locator {
    return this.getByTestId("load-more-trigger");
  }

  // -- Actions --------------------------------------------------------------

  async scrollToLoadMore(): Promise<void> {
    await this.loadMoreTrigger.scrollIntoViewIfNeeded();
    // Wait for new items to appear
    const countBefore = await this.feedItems.count();
    await this.page.waitForFunction(
      (prevCount) => {
        const items = document.querySelectorAll('[data-testid="feed-item"]');
        return items.length > prevCount;
      },
      countBefore,
      { timeout: 10_000 },
    );
  }

  // -- Queries --------------------------------------------------------------

  async getFeedItems(): Promise<Locator> {
    return this.feedItems;
  }

  async getFeedItemCount(): Promise<number> {
    return this.feedItems.count();
  }

  async getMembersHelpedCount(): Promise<string> {
    return this.membersHelpedCount.innerText();
  }

  async getTotalDistributed(): Promise<string> {
    return this.totalDistributed.innerText();
  }

  async getFeedItemCategories(): Promise<string[]> {
    return this.locator('[data-testid="feed-item"] [data-testid="category-icon"]')
      .allInnerTexts();
  }

  async getFeedItemAmounts(): Promise<string[]> {
    return this.locator('[data-testid="feed-item"] [data-testid="amount-range"]')
      .allInnerTexts();
  }

  async getThankYouMessages(): Promise<string[]> {
    return this.locator('[data-testid="feed-item"] [data-testid="thank-you-message"]')
      .allInnerTexts();
  }
}
