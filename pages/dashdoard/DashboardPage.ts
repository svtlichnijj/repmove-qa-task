import { Locator, Page } from '@playwright/test';
import { BasePage } from '~pages/common/BasePage.js';
import { AppWelcomeModal } from '~pages/dashdoard/modal/AppWelcomeModal.js';
import { SelectPlanModal } from '~pages/dashdoard/modal/SelectPlanModal.js';

export class DashboardPage extends BasePage {
  readonly selectPlanModal: SelectPlanModal;
  readonly appWelcomeModal: AppWelcomeModal;
  readonly appDashboardBlock: Locator;

  constructor(page: Page) {
    super(page, '/dashboard');

    this.selectPlanModal = new SelectPlanModal(page);
    this.appWelcomeModal = new AppWelcomeModal(page);
    this.appDashboardBlock = page.locator('app-dashboard ');
  }

  async closeWelcomeModals() {
    await this.selectPlanModal.clickFreeTrialButtonIfExist();
    await this.appWelcomeModal.closeWelcomeModalIfExist();
  }

  async appDashboardBlockIsVisible() {
    return this.appDashboardBlock.isVisible({ timeout: Number(process.env.LONG_TIMEOUT) || 30000 });
  }
}
