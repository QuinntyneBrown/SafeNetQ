import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { RequestPage } from '../pages/RequestPage';

describe('Request Assistance', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let requestPage: RequestPage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
    requestPage = new RequestPage();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await loginPage.loginWithCredentials(
      'testuser@safenetq.com',
      'SecurePass123!'
    );
    await dashboardPage.isDashboardVisible();
    await dashboardPage.tapRequestAssistance();
    await requestPage.isRequestScreenVisible();
  });

  it('should display back button and title', async () => {
    await requestPage.isBackButtonVisible();
    const title = await requestPage.getScreenTitle();
    expect(title).toBe('Request Assistance');
  });

  it('should show step indicator', async () => {
    const stepIndicator = await requestPage.getStepIndicator();
    await expect(stepIndicator).toBeVisible();
    const currentStep = await requestPage.getCurrentStep();
    expect(currentStep).toContain('Step 1');
  });

  it('should display all emergency categories', async () => {
    await requestPage.isCategoryVisible('Medical Emergency');
    await requestPage.isCategoryVisible('Housing');
    await requestPage.isCategoryVisible('Food & Essentials');
    await requestPage.isCategoryVisible('Utilities');
    await requestPage.isCategoryVisible('Education');
    await requestPage.isCategoryVisible('Other');
  });

  it('should allow selecting a category', async () => {
    await requestPage.selectCategory('Medical Emergency');
    await expect(
      element(by.id('category-medical-emergency-selected'))
    ).toBeVisible();
  });

  it('should show description input field', async () => {
    await requestPage.selectCategory('Medical Emergency');
    await requestPage.tapContinue();
    await requestPage.isDescriptionInputVisible();
  });

  it('should have a continue button', async () => {
    await requestPage.isContinueButtonVisible();
  });

  it('should navigate through all steps', async () => {
    // Step 1: Select category
    await requestPage.selectCategory('Medical Emergency');
    await requestPage.tapContinue();

    // Step 2: Enter description
    const step2 = await requestPage.getCurrentStep();
    expect(step2).toContain('Step 2');
    await requestPage.enterDescription(
      'Need assistance with medical bills after an emergency visit.'
    );
    await requestPage.dismissKeyboard();
    await requestPage.tapContinue();

    // Step 3: Upload documents
    const step3 = await requestPage.getCurrentStep();
    expect(step3).toContain('Step 3');
    await expect(element(by.id('upload-document-button'))).toBeVisible();
    await requestPage.tapContinue();

    // Step 4: Review and submit
    const step4 = await requestPage.getCurrentStep();
    expect(step4).toContain('Step 4');
    await expect(element(by.id('request-submit-button'))).toBeVisible();
  });
});
