import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  protected readonly path = "/profile";

  // -- Locators -------------------------------------------------------------

  private get firstNameInput(): Locator {
    return this.getByLabel(/first name/i);
  }

  private get lastNameInput(): Locator {
    return this.getByLabel(/last name/i);
  }

  private get phoneInput(): Locator {
    return this.getByLabel(/phone/i);
  }

  private get saveButton(): Locator {
    return this.getByRole("button", { name: /save|update/i });
  }

  private get languageSelect(): Locator {
    return this.getByLabel(/language/i);
  }

  private get emailNotificationsToggle(): Locator {
    return this.getByRole("switch", { name: /email notifications/i });
  }

  private get smsNotificationsToggle(): Locator {
    return this.getByRole("switch", { name: /sms notifications/i });
  }

  private get downloadDataButton(): Locator {
    return this.getByRole("button", { name: /download.*data/i });
  }

  private get deleteAccountButton(): Locator {
    return this.getByRole("button", { name: /delete account/i });
  }

  // -- Actions --------------------------------------------------------------

  async updateName(first: string, last: string): Promise<void> {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.saveButton.click();
  }

  async updatePhone(phone: string): Promise<void> {
    await this.phoneInput.fill(phone);
    await this.saveButton.click();
  }

  async updateNotificationPreferences(prefs: {
    email?: boolean;
    sms?: boolean;
  }): Promise<void> {
    if (prefs.email !== undefined) {
      const isChecked = await this.emailNotificationsToggle.isChecked();
      if (isChecked !== prefs.email) {
        await this.emailNotificationsToggle.click();
      }
    }
    if (prefs.sms !== undefined) {
      const isChecked = await this.smsNotificationsToggle.isChecked();
      if (isChecked !== prefs.sms) {
        await this.smsNotificationsToggle.click();
      }
    }
  }

  async changeLanguage(language: string): Promise<void> {
    await this.languageSelect.selectOption({ label: language });
  }

  async downloadPersonalData(): Promise<void> {
    await this.downloadDataButton.click();
  }

  async requestAccountDeletion(): Promise<void> {
    await this.deleteAccountButton.click();
    // Confirm the deletion dialog
    await this.getByRole("button", { name: /confirm.*delete/i }).click();
  }
}
