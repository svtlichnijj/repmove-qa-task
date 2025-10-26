import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '~pages/common/BasePage.js';

export class LoginPage extends BasePage {
  readonly emailBlock: Locator;
  readonly emailInput: Locator;
  readonly emailValidationError: Locator;
  readonly passwordBlock: Locator;
  readonly passwordInput: Locator;
  readonly passwordValidationError: Locator;
  readonly loginButton: Locator;
  readonly loginButtonSpinner: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page, '/auth/sign-in');

    this.emailBlock = page.locator('app-input', { hasText: 'Email' });
    this.emailInput = this.emailBlock.locator('input');
    this.emailValidationError = this.emailBlock.locator(this.blockErrorMessageLocator);
    this.passwordBlock = page.locator('app-input', { hasText: 'Password' });
    this.passwordInput = this.passwordBlock.locator('input');
    this.passwordValidationError = this.passwordBlock.locator(this.blockErrorMessageLocator);
    this.loginButton = page.getByRole('button', { name: 'Sign In', exact: true });
    this.loginButtonSpinner = this.loginButton.locator('app-loading.__spinner');
    this.signUpLink = page.getByRole('link', { name: 'Sign Up Now' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async spinnerIsVisible(): Promise<void> {
    await expect(this.loginButtonSpinner).toBeVisible();
  }

  async spinnerIsNotVisible(): Promise<void> {
    await expect(this.loginButtonSpinner).not.toBeVisible({ timeout: Number(process.env.DEFAULT_TIMEOUT) || 15000 });
  }

  async dataHasBeenSent(): Promise<void> {
    await this.spinnerIsVisible();
    await this.spinnerIsNotVisible();
  }

  async expectEmailHaveErrorText(message: string): Promise<void> {
    await expect(this.emailBlock).toContainClass(this.blockInvalidClass);
    await expect(this.emailBlock).not.toContainClass(this.blockValidClass);
    await expect(this.emailValidationError).toBeVisible();
    await expect(this.emailValidationError).toHaveText(message);
  }

  async expectPasswordHaveErrorText(message: string): Promise<void> {
    await expect(this.passwordBlock).toContainClass(this.blockInvalidClass);
    await expect(this.passwordBlock).not.toContainClass(this.blockValidClass);
    await expect(this.passwordValidationError).toBeVisible();
    await expect(this.passwordValidationError).toHaveText(message);
  }

  async clickSignUpLink(): Promise<void> {
    await this.signUpLink.click();
  }
}
