import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FeedPage } from '../pages/FeedPage';

describe('Community Feed', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let feedPage: FeedPage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
    feedPage = new FeedPage();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await loginPage.loginWithCredentials(
      'testuser@safenetq.com',
      'SecurePass123!'
    );
    await dashboardPage.isDashboardVisible();
    await dashboardPage.tapBottomTab('feed');
    await feedPage.isFeedScreenVisible();
  });

  it('should display community feed items', async () => {
    const feedList = await feedPage.getFeedItems();
    await expect(feedList).toBeVisible();
    await expect(element(by.id('feed-item-0'))).toBeVisible();
  });

  it('should show category icons per feed item', async () => {
    await feedPage.getFeedItemCategoryIcon(0);
    await feedPage.getFeedItemCategoryIcon(1);
  });

  it('should show anonymized amount ranges', async () => {
    const amount = await feedPage.getFeedItemAmountRange(0);
    expect(amount).toMatch(/\$[\d,]+ - \$[\d,]+/);
  });

  it('should support pull to refresh', async () => {
    await feedPage.pullToRefresh();
    await feedPage.isFeedScreenVisible();
    const feedList = await feedPage.getFeedItems();
    await expect(feedList).toBeVisible();
  });

  it('should show members helped and total distributed', async () => {
    const membersHelped = await feedPage.getMembersHelped();
    expect(membersHelped).toBeTruthy();
    expect(Number(membersHelped.replace(/[^0-9]/g, ''))).toBeGreaterThan(0);

    const totalDistributed = await feedPage.getTotalDistributed();
    expect(totalDistributed).toBeTruthy();
    expect(totalDistributed).toContain('$');
  });
});
