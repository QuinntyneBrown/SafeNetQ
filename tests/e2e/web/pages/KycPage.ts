import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class KycPage extends BasePage {
  protected readonly path = "/onboarding/kyc";

  // -- Locators -------------------------------------------------------------

  private get idTypeSelect(): Locator {
    return this.getByLabel(/id type|identification type/i);
  }

  private get idUploadZone(): Locator {
    return this.getByTestId("id-upload-zone");
  }

  private get idFileInput(): Locator {
    return this.locator('input[type="file"][data-testid="id-document-input"]');
  }

  private get selfieButton(): Locator {
    return this.getByRole("button", { name: /take selfie|capture/i });
  }

  private get addressConfirmCheckbox(): Locator {
    return this.getByRole("checkbox", { name: /confirm.*address/i });
  }

  private get continueButton(): Locator {
    return this.getByRole("button", { name: /continue|next/i });
  }

  private get kycStatus(): Locator {
    return this.getByTestId("kyc-status");
  }

  private get kycCompleteIndicator(): Locator {
    return this.getByTestId("kyc-complete");
  }

  // -- Actions --------------------------------------------------------------

  async selectIdType(type: string): Promise<void> {
    await this.idTypeSelect.selectOption({ label: type });
  }

  async uploadIdDocument(filePath: string): Promise<void> {
    await this.idFileInput.setInputFiles(filePath);
  }

  async takeSelfie(): Promise<void> {
    await this.selfieButton.click();
    // Wait for camera capture to complete
    await this.getByTestId("selfie-preview").waitFor({ state: "visible" });
  }

  async confirmAddress(): Promise<void> {
    await this.addressConfirmCheckbox.check();
  }

  async clickUploadContinue(): Promise<void> {
    await this.continueButton.click();
  }

  // -- Queries --------------------------------------------------------------

  async getKycStatus(): Promise<string> {
    return this.kycStatus.innerText();
  }

  async isKycComplete(): Promise<boolean> {
    return this.kycCompleteIndicator.isVisible();
  }
}
