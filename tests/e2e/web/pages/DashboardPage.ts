import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
  protected readonly path = "/dashboard";

  // -- Locators -------------------------------------------------------------

  private get welcomeMessage(): Locator {
    return this.getByTestId("welcome-message");
  }

  private get totalContributed(): Locator {
    return this.getByTestId("total-contributed");
  }

  private get nextPaymentDate(): Locator {
    return this.getByTestId("next-payment-date");
  }

  private get payoutEligibility(): Locator {
    return this.getByTestId("payout-eligibility");
  }

  private get fundHealth(): Locator {
    return this.getByTestId("fund-health");
  }

  private get recentContributions(): Locator {
    return this.getByTestId("recent-contributions");
  }

  private get requestAssistanceButton(): Locator {
    return this.getByRole("link", { name: /request assistance/i });
  }

  // -- Actions --------------------------------------------------------------

  async clickRequestAssistance(): Promise<void> {
    await this.requestAssistanceButton.click();
  }

  // -- Queries --------------------------------------------------------------

  async getWelcomeMessage(): Promise<string> {
    return this.welcomeMessage.innerText();
  }

  async getTotalContributed(): Promise<string> {
    return this.totalContributed.innerText();
  }

  async getNextPaymentDate(): Promise<string> {
    return this.nextPaymentDate.innerText();
  }

  async getPayoutEligibility(): Promise<string> {
    return this.payoutEligibility.innerText();
  }

  async getFundHealth(): Promise<string> {
    return this.fundHealth.innerText();
  }

  async getRecentContributions(): Promise<Locator> {
    return this.recentContributions.locator("tr, [data-testid='contribution-row']");
  }
}
