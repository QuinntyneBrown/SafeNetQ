import { BasePage } from './BasePage';

export class FeedPage extends BasePage {
  private screenId = 'feed-screen';
  private scrollViewId = 'feed-scroll-view';
  private feedListId = 'feed-list';
  private feedItemPrefix = 'feed-item-';
  private membersHelpedId = 'members-helped-stat';
  private totalDistributedId = 'total-distributed-stat';

  async isFeedScreenVisible(): Promise<void> {
    await this.waitForScreen(this.screenId);
  }

  async getFeedItems(): Promise<Detox.NativeElement> {
    return element(by.id(this.feedListId));
  }

  async getFeedItemCount(): Promise<void> {
    await expect(element(by.id(this.feedListId))).toBeVisible();
  }

  async getFeedItemAtIndex(index: number): Promise<Detox.NativeElement> {
    return element(by.id(`${this.feedItemPrefix}${index}`));
  }

  async getFeedItemCategoryIcon(index: number): Promise<void> {
    await expect(
      element(by.id(`feed-item-category-icon-${index}`))
    ).toBeVisible();
  }

  async getFeedItemAmountRange(index: number): Promise<string> {
    const attrs = await element(
      by.id(`feed-item-amount-${index}`)
    ).getAttributes();
    return (attrs as { text: string }).text;
  }

  async pullToRefresh(): Promise<void> {
    await super.pullToRefresh(this.scrollViewId);
  }

  async getMembersHelped(): Promise<string> {
    const attrs = await element(by.id(this.membersHelpedId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getTotalDistributed(): Promise<string> {
    const attrs = await element(
      by.id(this.totalDistributedId)
    ).getAttributes();
    return (attrs as { text: string }).text;
  }
}
