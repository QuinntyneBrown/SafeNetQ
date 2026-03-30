import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LandingPage extends BasePage {
  protected readonly path = "/";

  // -- Locators -------------------------------------------------------------

  private get heroSection(): Locator {
    return this.getByTestId("hero-section");
  }

  private get heroTitle(): Locator {
    return this.heroSection.locator("h1");
  }

  private get getStartedButton(): Locator {
    return this.getByRole("link", { name: /get started/i });
  }

  private get loginButton(): Locator {
    return this.getByRole("link", { name: /log\s?in/i });
  }

  private get howItWorksLink(): Locator {
    return this.getByRole("link", { name: /how it works/i });
  }

  // -- Actions --------------------------------------------------------------

  async clickGetStarted(): Promise<void> {
    await this.getStartedButton.click();
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async clickHowItWorks(): Promise<void> {
    await this.howItWorksLink.click();
  }

  // -- Queries --------------------------------------------------------------

  async getHeroTitle(): Promise<string> {
    return this.heroTitle.innerText();
  }

  async isHeroVisible(): Promise<boolean> {
    return this.heroSection.isVisible();
  }
}
