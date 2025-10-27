import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '~pages/common/BasePage.js';
import { IRegisterData } from '~types/signup.js';

export class RegistrationPage extends BasePage {
  readonly signUpFormBlock: Locator;
  readonly firstNameBlock: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameBlock: Locator;
  readonly lastNameInput: Locator;
  readonly companyNameBlock: Locator;
  readonly companyNameInput: Locator;
  readonly industryDropdown: Locator;
  readonly emailBlock: Locator;
  readonly emailInput: Locator;
  readonly countryDropdown: Locator;
  readonly phoneBlock: Locator;
  readonly phoneInput: Locator;
  readonly passwordBlock: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly signUpButtonSpinner: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page, '/auth/sign-up');

    this.signUpFormBlock = page.locator('.__form app-sign-up');
    this.firstNameBlock = this.signUpFormBlock.locator('app-input', { hasText: 'First Name' });
    this.firstNameInput = this.firstNameBlock.locator('input');
    this.lastNameBlock = this.signUpFormBlock.locator('app-input', { hasText: 'Last Name' });
    this.lastNameInput = this.lastNameBlock.locator('input');
    this.companyNameBlock = this.signUpFormBlock.locator('app-input', { hasText: 'Company Name' });
    this.companyNameInput = this.companyNameBlock.locator('input');
    this.industryDropdown = this.signUpFormBlock.getByPlaceholder('Industry');
    this.emailBlock = this.signUpFormBlock.locator('app-input', { hasText: 'Email' });
    this.emailInput = this.emailBlock.locator('input');
    this.phoneBlock = this.signUpFormBlock.locator('app-phone-number', { hasText: 'Phone' });
    this.countryDropdown = this.phoneBlock.getByPlaceholder('Country');
    this.phoneInput = this.phoneBlock.locator('app-input input');
    this.passwordBlock = this.signUpFormBlock.locator('app-input', { hasText: 'Password' });
    this.passwordInput = this.passwordBlock.locator('input');
    this.signUpButton = this.signUpFormBlock.getByRole('button', { name: 'Sign Up', exact: true });
    this.signUpButtonSpinner = this.signUpButton.locator('app-loading.__spinner');
    this.loginLink = this.signUpFormBlock.getByRole('link', { name: 'Sign In' });
  }

  private async selectNgDropdownOption(dropdownLocator: Locator, optionText: string) {
    await dropdownLocator.click();
    await this.page.getByRole('listbox').getByText(optionText, { exact: true }).first().click();
  }

  async signUp(data: IRegisterData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyNameInput.fill(data.companyName);
    await this.selectNgDropdownOption(this.industryDropdown, data.industry);
    await this.emailInput.fill(data.email);
    await this.selectNgDropdownOption(this.countryDropdown, data.countryCode);
    await this.phoneInput.fill(data.phoneNumber);
    await this.passwordInput.fill(data.password);
    await this.signUpButton.click();
  }

  async spinnerIsVisible(): Promise<void> {
    await expect(this.signUpButtonSpinner).toBeVisible();
  }

  async spinnerIsNotVisible(): Promise<void> {
    await expect(this.signUpButtonSpinner).toBeVisible({
      timeout: Number(process.env.LONG_TIMEOUT) || 30000,
      visible: false,
    });
  }

  async dataHasBeenSent(): Promise<void> {
    await this.spinnerIsVisible();
    await this.spinnerIsNotVisible();
  }

  async fieldsHaveErrors(blocks: Locator[]): Promise<void> {
    for (const block of blocks) {
      await expect(block).toContainClass(this.blockInvalidClass);
      await expect(block).not.toContainClass(this.blockValidClass);

      if (block != this.industryDropdown) {
        await expect(block.locator(this.blockErrorMessageLocator)).toBeVisible();
      }
    }
  }

  async expectFieldHaveErrorText(block: Locator, message: string): Promise<void> {
    await expect(block).toContainClass(this.blockInvalidClass);
    await expect(block).not.toContainClass(this.blockValidClass);

    if (block != this.industryDropdown) {
      await expect(block.locator(this.blockErrorMessageLocator)).toBeVisible();
      await expect(block.locator(this.blockErrorMessageLocator)).toHaveText(message);
    }
  }
}
