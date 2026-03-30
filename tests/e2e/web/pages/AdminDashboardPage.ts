import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AdminDashboardPage extends BasePage {
  protected readonly path = "/admin/dashboard";

  // -- Locators -------------------------------------------------------------

  private get trustBalance(): Locator {
    return this.getByTestId("trust-balance");
  }

  private get reserveBalance(): Locator {
    return this.getByTestId("reserve-balance");
  }

  private get reserveRatio(): Locator {
    return this.getByTestId("reserve-ratio");
  }

  private get monthlyInflow(): Locator {
    return this.getByTestId("monthly-inflow");
  }

  private get recentPayouts(): Locator {
    return this.getByTestId("recent-payout");
  }

  private get generateReportButton(): Locator {
    return this.getByRole("button", { name: /generate report/i });
  }

  private get memberTable(): Locator {
    return this.getByTestId("member-table");
  }

  private get memberSearchInput(): Locator {
    return this.getByPlaceholder(/search members/i);
  }

  private get auditTrailEntries(): Locator {
    return this.getByTestId("audit-entry");
  }

  // -- Actions --------------------------------------------------------------

  async clickGenerateReport(): Promise<void> {
    await this.generateReportButton.click();
  }

  async searchMembers(query: string): Promise<void> {
    await this.memberSearchInput.fill(query);
  }

  // -- Queries --------------------------------------------------------------

  async getTrustBalance(): Promise<string> {
    return this.trustBalance.innerText();
  }

  async getReserveBalance(): Promise<string> {
    return this.reserveBalance.innerText();
  }

  async getReserveRatio(): Promise<string> {
    return this.reserveRatio.innerText();
  }

  async getMonthlyInflow(): Promise<string> {
    return this.monthlyInflow.innerText();
  }

  async getRecentPayouts(): Promise<Locator> {
    return this.recentPayouts;
  }

  async getMemberTable(): Promise<Locator> {
    return this.memberTable;
  }

  async getAuditTrailEntries(): Promise<Locator> {
    return this.auditTrailEntries;
  }
}
