import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ProfilePage } from '../pages/ProfilePage';

describe('Profile', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let profilePage: ProfilePage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
    profilePage = new ProfilePage();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await loginPage.loginWithCredentials(
      'testuser@safenetq.com',
      'SecurePass123!'
    );
    await dashboardPage.isDashboardVisible();
    await dashboardPage.tapBottomTab('profile');
    await profilePage.isProfileScreenVisible();
  });

  it('should display user avatar and name', async () => {
    await profilePage.isAvatarVisible();
    const userName = await profilePage.getUserName();
    expect(userName).toBeTruthy();
  });

  it('should show Active and Verified badges', async () => {
    await expect(element(by.text('Active'))).toBeVisible();
    await expect(element(by.text('Verified'))).toBeVisible();
  });

  it('should display settings menu items', async () => {
    await profilePage.isSettingsItemVisible('profile-edit-button');
    await profilePage.isSettingsItemVisible('profile-payment-methods');
    await profilePage.isSettingsItemVisible('profile-notifications');
    await profilePage.isSettingsItemVisible('profile-language');
    await profilePage.isSettingsItemVisible('profile-privacy');
    await profilePage.isSettingsItemVisible('profile-help-support');
  });

  it('should navigate to each settings section', async () => {
    await profilePage.tapEditProfile();
    await expect(element(by.id('edit-profile-screen'))).toBeVisible();
    await profilePage.tapBackButton();

    await profilePage.tapPaymentMethods();
    await expect(element(by.id('payment-methods-screen'))).toBeVisible();
    await profilePage.tapBackButton();

    await profilePage.tapNotifications();
    await expect(element(by.id('notifications-screen'))).toBeVisible();
    await profilePage.tapBackButton();

    await profilePage.tapLanguage();
    await expect(element(by.id('language-screen'))).toBeVisible();
    await profilePage.tapBackButton();

    await profilePage.tapPrivacy();
    await expect(element(by.id('privacy-screen'))).toBeVisible();
    await profilePage.tapBackButton();

    await profilePage.tapHelpSupport();
    await expect(element(by.id('help-support-screen'))).toBeVisible();
    await profilePage.tapBackButton();
  });

  it('should show logout button', async () => {
    await expect(element(by.id('profile-logout-button'))).toBeVisible();
  });

  it('should confirm logout action', async () => {
    await profilePage.tapLogout();
    await expect(element(by.text('Are you sure you want to log out?'))).toBeVisible();
    await expect(element(by.id('logout-confirm-button'))).toBeVisible();
    await expect(element(by.id('logout-cancel-button'))).toBeVisible();

    await profilePage.confirmLogout();
    await loginPage.isLoginScreenVisible();
  });
});
