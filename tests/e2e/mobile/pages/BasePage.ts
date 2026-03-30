export class BasePage {
  async waitForScreen(screenTestId: string, timeout: number = 5000): Promise<void> {
    await waitFor(element(by.id(screenTestId)))
      .toBeVisible()
      .withTimeout(timeout);
  }

  async tapBackButton(): Promise<void> {
    await element(by.id('back-button')).tap();
  }

  async scrollDown(scrollViewId: string): Promise<void> {
    await element(by.id(scrollViewId)).scroll(300, 'down');
  }

  async scrollUp(scrollViewId: string): Promise<void> {
    await element(by.id(scrollViewId)).scroll(300, 'up');
  }

  async getToastMessage(): Promise<string> {
    const attrs = await element(by.id('toast-message')).getAttributes();
    return (attrs as { text: string }).text;
  }

  async dismissKeyboard(): Promise<void> {
    await device.pressBack();
  }

  async pullToRefresh(scrollViewId: string): Promise<void> {
    await element(by.id(scrollViewId)).scroll(200, 'down');
  }
}
