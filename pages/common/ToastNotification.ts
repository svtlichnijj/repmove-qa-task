import { expect, Locator, Page } from '@playwright/test';

export class ToastNotification {
  readonly errorMessageNotify: Locator;

  constructor(page: Page) {
    this.errorMessageNotify = page.locator('.toast-error .toast-message');
  }

  async expectErrorNotifyContainText(text: string): Promise<void> {
    await expect(this.errorMessageNotify).toBeEnabled({ timeout: Number(process.env.DEFAULT_TIMEOUT) || 15000 });
    await expect(this.errorMessageNotify).toBeVisible();
    await expect(this.errorMessageNotify).toContainText(text);
  }
}
