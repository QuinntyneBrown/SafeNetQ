import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RequestStatusPage extends BasePage {
  protected readonly path = "/requests";

  // -- Locators -------------------------------------------------------------

  private get requestId(): Locator {
    return this.getByTestId("request-id");
  }

  private get requestStatus(): Locator {
    return this.getByTestId("request-status");
  }

  private get timeline(): Locator {
    return this.getByTestId("request-timeline");
  }

  private get timelineSteps(): Locator {
    return this.timeline.locator('[data-testid="timeline-step"]');
  }

  private get currentTimelineStep(): Locator {
    return this.timeline.locator('[data-testid="timeline-step"][aria-current="true"]');
  }

  private get requestDetails(): Locator {
    return this.getByTestId("request-details");
  }

  private get uploadedDocuments(): Locator {
    return this.getByTestId("uploaded-documents").locator('[data-testid="document-item"]');
  }

  private get appealButton(): Locator {
    return this.getByRole("button", { name: /appeal/i });
  }

  // -- Actions --------------------------------------------------------------

  async navigateToRequest(id: string): Promise<void> {
    await this.page.goto(`/requests/${id}`);
    await this.waitForPageLoad();
  }

  async clickAppeal(): Promise<void> {
    await this.appealButton.click();
  }

  // -- Queries --------------------------------------------------------------

  async getRequestId(): Promise<string> {
    return this.requestId.innerText();
  }

  async getRequestStatus(): Promise<string> {
    return this.requestStatus.innerText();
  }

  async getTimelineSteps(): Promise<string[]> {
    return this.timelineSteps.allInnerTexts();
  }

  async getCurrentTimelineStep(): Promise<string> {
    return this.currentTimelineStep.innerText();
  }

  async getRequestDetails(): Promise<string> {
    return this.requestDetails.innerText();
  }

  async getUploadedDocuments(): Promise<string[]> {
    return this.uploadedDocuments.allInnerTexts();
  }

  async isAppealAvailable(): Promise<boolean> {
    return this.appealButton.isVisible();
  }
}
