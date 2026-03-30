import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TierSelectionPage extends BasePage {
  protected readonly path = "/onboarding/tier";

  // -- Locators -------------------------------------------------------------

  private tierCard(tier: string): Locator {
    return this.getByTestId(`tier-card-${tier.toLowerCase()}`);
  }

  private get selectedTierIndicator(): Locator {
    return this.locator('[data-testid^="tier-card-"][aria-selected="true"]');
  }

  private get tierPrice(): Locator {
    return this.selectedTierIndicator.locator('[data-testid="tier-price"]');
  }

  private get feeBreakdown(): Locator {
    return this.getByTestId("fee-breakdown");
  }

  private get continueButton(): Locator {
    return this.getByRole("button", { name: /continue|next/i });
  }

  // -- Actions --------------------------------------------------------------

  async selectTier(tier: string): Promise<void> {
    await this.tierCard(tier).click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  // -- Queries --------------------------------------------------------------

  async getSelectedTier(): Promise<string> {
    const testId = await this.selectedTierIndicator.getAttribute("data-testid");
    return testId?.replace("tier-card-", "") ?? "";
  }

  async getTierPrice(): Promise<string> {
    return this.tierPrice.innerText();
  }

  async getFeeBreakdown(): Promise<string> {
    await this.feeBreakdown.waitFor({ state: "visible" });
    return this.feeBreakdown.innerText();
  }

  async getTierCards(): Promise<Locator> {
    return this.locator('[data-testid^="tier-card-"]');
  }
}
