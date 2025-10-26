import { Locator, Page } from '@playwright/test';

export class SelectPlanModal {
  readonly startFreeTrialButton: Locator;

  constructor(page: Page) {
    this.startFreeTrialButton = page.getByRole('button', { name: 'Start Free Trial' });
  }

  async clickFreeTrialButton() {
    await this.startFreeTrialButton.click();
  }

  async clickFreeTrialButtonIfExist() {
    if (await this.startFreeTrialButton.isVisible()) await this.clickFreeTrialButton();
  }
}
