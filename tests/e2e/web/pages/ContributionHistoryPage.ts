import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContributionHistoryPage extends BasePage {
  protected readonly path = "/contributions";

  // -- Locators -------------------------------------------------------------

  private get dateFromInput(): Locator {
    return this.getByLabel(/from date|start date/i);
  }

  private get dateToInput(): Locator {
    return this.getByLabel(/to date|end date/i);
  }

  private get statusFilter(): Locator {
    return this.getByLabel(/status/i);
  }

  private get contributionRows(): Locator {
    return this.getByTestId("contribution-row");
  }

  private get contributionCount(): Locator {
    return this.getByTestId("contribution-count");
  }

  private get exportCsvButton(): Locator {
    return this.getByRole("button", { name: /export.*csv/i });
  }

  private get tableHeaders(): Locator {
    return this.locator("table thead th, [data-testid='contribution-table'] [role='columnheader']");
  }

  // -- Actions --------------------------------------------------------------

  async filterByDateRange(from: string, to: string): Promise<void> {
    await this.dateFromInput.fill(from);
    await this.dateToInput.fill(to);
    // Trigger filter — may be auto or button-driven
    const applyButton = this.getByRole("button", { name: /apply|filter/i });
    if (await applyButton.isVisible()) {
      await applyButton.click();
    }
  }

  async filterByStatus(status: string): Promise<void> {
    await this.statusFilter.selectOption({ label: status });
  }

  async exportCsv(): Promise<void> {
    await this.exportCsvButton.click();
  }

  async downloadReceipt(rowIndex: number = 0): Promise<void> {
    const row = this.contributionRows.nth(rowIndex);
    await row.getByRole("button", { name: /receipt|download/i }).click();
  }

  // -- Queries --------------------------------------------------------------

  async getContributionRows(): Promise<Locator> {
    return this.contributionRows;
  }

  async getContributionCount(): Promise<number> {
    const text = await this.contributionCount.innerText();
    return parseInt(text.replace(/\D/g, ""), 10);
  }

  async getTableHeaderTexts(): Promise<string[]> {
    return this.tableHeaders.allInnerTexts();
  }
}
