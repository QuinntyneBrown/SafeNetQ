import { BasePage } from './BasePage';

export class RequestPage extends BasePage {
  private screenId = 'request-screen';
  private screenTitleId = 'request-screen-title';
  private stepIndicatorId = 'step-indicator';
  private categoryListId = 'category-list';
  private descriptionInputId = 'request-description-input';
  private uploadDocumentButtonId = 'upload-document-button';
  private continueButtonId = 'request-continue-button';
  private submitButtonId = 'request-submit-button';

  async isRequestScreenVisible(): Promise<void> {
    await this.waitForScreen(this.screenId);
  }

  async getScreenTitle(): Promise<string> {
    const attrs = await element(by.id(this.screenTitleId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async selectCategory(categoryName: string): Promise<void> {
    await element(by.text(categoryName)).tap();
  }

  async enterDescription(description: string): Promise<void> {
    await element(by.id(this.descriptionInputId)).clearText();
    await element(by.id(this.descriptionInputId)).typeText(description);
  }

  async tapUploadDocument(): Promise<void> {
    await element(by.id(this.uploadDocumentButtonId)).tap();
  }

  async tapContinue(): Promise<void> {
    await element(by.id(this.continueButtonId)).tap();
  }

  async tapSubmit(): Promise<void> {
    await element(by.id(this.submitButtonId)).tap();
  }

  async getCurrentStep(): Promise<string> {
    const attrs = await element(by.id(this.stepIndicatorId)).getAttributes();
    return (attrs as { text: string }).text;
  }

  async getStepIndicator(): Promise<Detox.NativeElement> {
    return element(by.id(this.stepIndicatorId));
  }

  async isCategoryVisible(categoryName: string): Promise<void> {
    await expect(element(by.text(categoryName))).toBeVisible();
  }

  async isContinueButtonVisible(): Promise<void> {
    await expect(element(by.id(this.continueButtonId))).toBeVisible();
  }

  async isDescriptionInputVisible(): Promise<void> {
    await expect(element(by.id(this.descriptionInputId))).toBeVisible();
  }

  async isBackButtonVisible(): Promise<void> {
    await expect(element(by.id('back-button'))).toBeVisible();
  }
}
