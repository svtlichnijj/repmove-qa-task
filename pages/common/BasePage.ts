import { expect, Page } from '@playwright/test';
import { ToastNotification } from '~pages/common/ToastNotification.js';

export class BasePage {
  readonly page: Page;
  private readonly endpoint: string;
  readonly toastNotification: ToastNotification;

  protected readonly blockValidClass = 'ng-valid';
  protected readonly blockInvalidClass = 'ng-invalid';
  protected readonly blockErrorMessageLocator = '.__error > app-validation-message';

  constructor(page: Page, endpoint: string) {
    this.page = page;
    this.endpoint = endpoint;
    this.toastNotification = new ToastNotification(page);
  }

  async open(): Promise<void> {
    await this.page.goto(this.endpoint);
  }

  async expectUrlContains(part?: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(part === undefined ? this.endpoint : part));
  }
}
