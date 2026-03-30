import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CommitteeReviewPage extends BasePage {
  protected readonly path = "/admin/committee-review";

  // -- Locators -------------------------------------------------------------

  private get pendingRequests(): Locator {
    return this.getByTestId("pending-request");
  }

  private get requestDetailPanel(): Locator {
    return this.getByTestId("request-detail-panel");
  }

  private get documentViewer(): Locator {
    return this.getByTestId("document-viewer");
  }

  private get approveButton(): Locator {
    return this.getByRole("button", { name: /approve/i });
  }

  private get denyButton(): Locator {
    return this.getByRole("button", { name: /deny|reject/i });
  }

  private get justificationInput(): Locator {
    return this.getByLabel(/justification|reason/i);
  }

  private get voteCount(): Locator {
    return this.getByTestId("vote-count");
  }

  // -- Actions --------------------------------------------------------------

  async openRequest(index: number = 0): Promise<void> {
    await this.pendingRequests.nth(index).click();
    await this.requestDetailPanel.waitFor({ state: "visible" });
  }

  async viewDocuments(): Promise<void> {
    await this.getByRole("button", { name: /view documents/i }).click();
    await this.documentViewer.waitFor({ state: "visible" });
  }

  async castVote(decision: "approve" | "deny"): Promise<void> {
    if (decision === "approve") {
      await this.approveButton.click();
    } else {
      await this.denyButton.click();
    }
  }

  async addJustification(text: string): Promise<void> {
    await this.justificationInput.fill(text);
  }

  // -- Queries --------------------------------------------------------------

  async getPendingRequests(): Promise<Locator> {
    return this.pendingRequests;
  }

  async getPendingRequestCount(): Promise<number> {
    return this.pendingRequests.count();
  }

  async getVoteCount(): Promise<string> {
    return this.voteCount.innerText();
  }

  async isRequestDetailVisible(): Promise<boolean> {
    return this.requestDetailPanel.isVisible();
  }
}
