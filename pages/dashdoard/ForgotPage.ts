import { BasePage } from '~pages/common/BasePage.js';
import { expect, Locator, Page } from '@playwright/test';

export class ForgotPage extends BasePage {
  readonly forgotFormBlock: Locator;

  constructor(page: Page) {
    super(page, '/auth/forgot-password');

    this.forgotFormBlock = page.locator('.__form app-forgot-password');
  }

  async expectForgotFormBlockIsVisible(): Promise<void> {
    await this.forgotFormBlock.waitFor({ state: 'visible' });
    await expect(this.forgotFormBlock).toBeVisible();
  }
}
