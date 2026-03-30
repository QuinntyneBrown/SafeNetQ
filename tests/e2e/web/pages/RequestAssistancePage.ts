import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RequestAssistancePage extends BasePage {
  protected readonly path = "/request-assistance";

  // -- Locators -------------------------------------------------------------

  private get categorySelect(): Locator {
    return this.getByLabel(/category|emergency type/i);
  }

  private get descriptionInput(): Locator {
    return this.getByLabel(/description|details/i);
  }

  private get documentInput(): Locator {
    return this.locator('input[type="file"][data-testid="document-upload"]');
  }

  private get stepIndicator(): Locator {
    return this.getByTestId("step-indicator");
  }

  private get currentStep(): Locator {
    return this.locator('[data-testid="step-indicator"] [aria-current="step"]');
  }

  private get nextButton(): Locator {
    return this.getByRole("button", { name: /next|continue/i });
  }

  private get backButton(): Locator {
    return this.getByRole("button", { name: /back|previous/i });
  }

  private get submitButton(): Locator {
    return this.getByRole("button", { name: /submit/i });
  }

  private get eligibilityMessage(): Locator {
    return this.getByTestId("eligibility-message");
  }

  private get confirmationMessage(): Locator {
    return this.getByTestId("request-confirmation");
  }

  private get categoryOptions(): Locator {
    return this.categorySelect.locator("option");
  }

  // -- Actions --------------------------------------------------------------

  async selectCategory(category: string): Promise<void> {
    await this.categorySelect.selectOption({ label: category });
  }

  async fillDescription(text: string): Promise<void> {
    await this.descriptionInput.fill(text);
  }

  async uploadDocuments(filePaths: string[]): Promise<void> {
    await this.documentInput.setInputFiles(filePaths);
  }

  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  async clickBack(): Promise<void> {
    await this.backButton.click();
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  // -- Queries --------------------------------------------------------------

  async getCurrentStep(): Promise<string> {
    return this.currentStep.innerText();
  }

  async getEligibilityMessage(): Promise<string> {
    return this.eligibilityMessage.innerText();
  }

  async isConfirmationVisible(): Promise<boolean> {
    return this.confirmationMessage.isVisible();
  }

  async getCategoryOptions(): Promise<string[]> {
    return this.categoryOptions.allInnerTexts();
  }

  async isStepIndicatorVisible(): Promise<boolean> {
    return this.stepIndicator.isVisible();
  }
}
