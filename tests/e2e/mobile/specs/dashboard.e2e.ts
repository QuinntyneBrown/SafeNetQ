import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

describe('Dashboard', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await loginPage.loginWithCredentials(
      'testuser@safenetq.com',
      'SecurePass123!'
    );
    await dashboardPage.isDashboardVisible();
  });

  it('should display welcome message with user name', async () => {
    const welcomeMsg = await dashboardPage.getWelcomeMessage();
    expect(welcomeMsg).toContain('Welcome');
  });

  it('should show four stat cards with correct data', async () => {
    await expect(element(by.id('stat-total-contributed'))).toBeVisible();
    await expect(element(by.id('stat-next-payment'))).toBeVisible();
    await expect(element(by.id('stat-payout-status'))).toBeVisible();
    await expect(element(by.id('stat-fund-health'))).toBeVisible();

    const totalContributed = await dashboardPage.getTotalContributed();
    expect(totalContributed).toBeTruthy();

    const nextPayment = await dashboardPage.getNextPayment();
    expect(nextPayment).toBeTruthy();

    const payoutStatus = await dashboardPage.getPayoutStatus();
    expect(payoutStatus).toBeTruthy();

    const fundHealth = await dashboardPage.getFundHealth();
    expect(fundHealth).toBeTruthy();
  });

  it('should display recent activity list', async () => {
    const activityList = await dashboardPage.getRecentActivityItems();
    await expect(activityList).toBeVisible();
    await expect(element(by.id('view-all-activity-link'))).toBeVisible();
  });

  it('should navigate to request assistance', async () => {
    await dashboardPage.tapRequestAssistance();
    await expect(element(by.id('request-screen'))).toBeVisible();
  });

  it('should pull to refresh dashboard data', async () => {
    await dashboardPage.pullToRefresh();
    await dashboardPage.isDashboardVisible();
    await expect(element(by.id('stat-total-contributed'))).toBeVisible();
  });

  it('should show bottom tab navigation with 5 tabs', async () => {
    await dashboardPage.getBottomTabCount();
    await expect(element(by.id('tab-home'))).toBeVisible();
    await expect(element(by.id('tab-feed'))).toBeVisible();
    await expect(element(by.id('tab-request'))).toBeVisible();
    await expect(element(by.id('tab-activity'))).toBeVisible();
    await expect(element(by.id('tab-profile'))).toBeVisible();
  });
});
