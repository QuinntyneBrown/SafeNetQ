import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  private screenId = 'profile-screen';
  private userAvatarId = 'profile-user-avatar';
  private userNameId = 'profile-user-name';
  private userEmailId = 'profile-user-email';
  private statusBadgeId = 'profile-status-badge';
  private editProfileButtonId = 'profile-edit-button';
  private paymentMethodsItemId = 'profile-payment-methods';
  private notificationsItemId = 'profile-notifications';
  private languageItemId = 'profile-language';
  private privacyItemId = 'profile-privacy';
  private helpSupportItemId = 'profile-help-support';
  private logoutButtonId = 'profile-logout-button';
  private logoutConfirmButtonId = 'logout-confirm-button';
  private logoutCancelButtonId = 'logout-cancel-button';

  async isProfileScreenVisible(): Promise<void> {
    await this.waitForScreen(this.screenId);
  }

  async getUserName(): Promise<string> {
    const attrs = await element(by.id(this.userNameId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getUserEmail(): Promise<string> {
    const attrs = await element(by.id(this.userEmailId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getStatusBadge(): Promise<string> {
    const attrs = await element(by.id(this.statusBadgeId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async isAvatarVisible(): Promise<void> {
    await expect(element(by.id(this.userAvatarId))).toBeVisible();
  }

  async tapEditProfile(): Promise<void> {
    await element(by.id(this.editProfileButtonId)).tap();
  }

  async tapPaymentMethods(): Promise<void> {
    await element(by.id(this.paymentMethodsItemId)).tap();
  }

  async tapNotifications(): Promise<void> {
    await element(by.id(this.notificationsItemId)).tap();
  }

  async tapLanguage(): Promise<void> {
    await element(by.id(this.languageItemId)).tap();
  }

  async tapPrivacy(): Promise<void> {
    await element(by.id(this.privacyItemId)).tap();
  }

  async tapHelpSupport(): Promise<void> {
    await element(by.id(this.helpSupportItemId)).tap();
  }

  async tapLogout(): Promise<void> {
    await element(by.id(this.logoutButtonId)).tap();
  }

  async confirmLogout(): Promise<void> {
    await element(by.id(this.logoutConfirmButtonId)).tap();
  }

  async cancelLogout(): Promise<void> {
    await element(by.id(this.logoutCancelButtonId)).tap();
  }

  async isSettingsItemVisible(itemId: string): Promise<void> {
    await expect(element(by.id(itemId))).toBeVisible();
  }
}
