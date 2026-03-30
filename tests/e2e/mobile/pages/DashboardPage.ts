import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  private screenId = 'dashboard-screen';
  private scrollViewId = 'dashboard-scroll-view';
  private welcomeMessageId = 'dashboard-welcome-message';
  private totalContributedId = 'stat-total-contributed';
  private nextPaymentId = 'stat-next-payment';
  private payoutStatusId = 'stat-payout-status';
  private fundHealthId = 'stat-fund-health';
  private recentActivityListId = 'recent-activity-list';
  private requestAssistanceButtonId = 'request-assistance-button';
  private viewAllActivityLinkId = 'view-all-activity-link';
  private bottomTabBarId = 'bottom-tab-bar';

  async isDashboardVisible(): Promise<void> {
    await this.waitForScreen(this.screenId);
  }

  async getWelcomeMessage(): Promise<string> {
    const attrs = await element(by.id(this.welcomeMessageId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getTotalContributed(): Promise<string> {
    const attrs = await element(by.id(this.totalContributedId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getNextPayment(): Promise<string> {
    const attrs = await element(by.id(this.nextPaymentId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getPayoutStatus(): Promise<string> {
    const attrs = await element(by.id(this.payoutStatusId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getFundHealth(): Promise<string> {
    const attrs = await element(by.id(this.fundHealthId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getRecentActivityItems(): Promise<Detox.NativeElement> {
    return element(by.id(this.recentActivityListId));
  }

  async tapRequestAssistance(): Promise<void> {
    await element(by.id(this.requestAssistanceButtonId)).tap();
  }

  async tapViewAllActivity(): Promise<void> {
    await element(by.id(this.viewAllActivityLinkId)).tap();
  }

  async pullToRefresh(): Promise<void> {
    await super.pullToRefresh(this.scrollViewId);
  }

  async getBottomTabCount(): Promise<void> {
    await expect(element(by.id(this.bottomTabBarId))).toBeVisible();
  }

  async tapBottomTab(tabName: string): Promise<void> {
    await element(by.id(`tab-${tabName.toLowerCase()}`)).tap();
  }
}
