import { type Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PaymentSetupPage extends BasePage {
  protected readonly path = "/onboarding/payment";

  // -- Locators -------------------------------------------------------------

  private get cardNumberInput(): Locator {
    return this.getByLabel(/card number/i);
  }

  private get expiryInput(): Locator {
    return this.getByLabel(/expiry|expiration/i);
  }

  private get cvcInput(): Locator {
    return this.getByLabel(/cvc|cvv|security code/i);
  }

  private get bankAccountInput(): Locator {
    return this.getByLabel(/bank account|account number/i);
  }

  private paymentMethodOption(method: string): Locator {
    return this.getByRole("radio", { name: new RegExp(method, "i") });
  }

  private get setupPaymentButton(): Locator {
    return this.getByRole("button", { name: /set\s?up payment|confirm payment/i });
  }

  // -- Actions --------------------------------------------------------------

  async fillCardNumber(number: string): Promise<void> {
    await this.cardNumberInput.fill(number);
  }

  async fillExpiry(expiry: string): Promise<void> {
    await this.expiryInput.fill(expiry);
  }

  async fillCvc(cvc: string): Promise<void> {
    await this.cvcInput.fill(cvc);
  }

  async fillBankAccount(account: string): Promise<void> {
    await this.bankAccountInput.fill(account);
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.paymentMethodOption(method).check();
  }

  async clickSetupPayment(): Promise<void> {
    await this.setupPaymentButton.click();
  }

  async fillCardDetails(card: {
    number: string;
    expiry: string;
    cvc: string;
  }): Promise<void> {
    await this.fillCardNumber(card.number);
    await this.fillExpiry(card.expiry);
    await this.fillCvc(card.cvc);
  }
}
