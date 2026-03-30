import { type Page, type Locator, expect } from "@playwright/test";

export abstract class BasePage {
  protected readonly page: Page;

  /** Subclasses must declare the path used by navigate(). */
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
  }

  // -- Navigation -----------------------------------------------------------

  async navigate(): Promise<void> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  // -- Common queries -------------------------------------------------------

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  getToastMessage(): Locator {
    return this.page.locator('[role="alert"], [data-testid="toast"]');
  }

  async getToastText(): Promise<string> {
    const toast = this.getToastMessage();
    await toast.waitFor({ state: "visible", timeout: 5_000 });
    return toast.innerText();
  }

  async dismissToast(): Promise<void> {
    const close = this.page.locator(
      '[data-testid="toast-close"], [role="alert"] button[aria-label="Close"]',
    );
    if (await close.isVisible()) {
      await close.click();
    }
  }

  async isLoaded(): Promise<boolean> {
    try {
      await this.page.waitForLoadState("domcontentloaded", { timeout: 5_000 });
      return true;
    } catch {
      return false;
    }
  }

  // -- Helpers --------------------------------------------------------------

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  protected getByRole(
    role: Parameters<Page["getByRole"]>[0],
    options?: Parameters<Page["getByRole"]>[1],
  ): Locator {
    return this.page.getByRole(role, options);
  }

  protected getByText(text: string | RegExp): Locator {
    return this.page.getByText(text);
  }

  protected getByLabel(label: string | RegExp): Locator {
    return this.page.getByLabel(label);
  }

  protected getByPlaceholder(placeholder: string | RegExp): Locator {
    return this.page.getByPlaceholder(placeholder);
  }
}
