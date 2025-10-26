import { Locator, Page } from '@playwright/test';

export class AppWelcomeModal {
  readonly appWelcomeModal: Locator;
  readonly welcomeToRepMoveHeader: Locator;
  readonly closeModalButton: Locator;

  constructor(page: Page) {
    this.appWelcomeModal = page.locator('ngb-modal-window.modal.rmv-modal-window-responsive.show app-welcome-modal');
    this.welcomeToRepMoveHeader = this.appWelcomeModal.getByText('Welcome to RepMove');
    this.closeModalButton = this.appWelcomeModal.locator('button.__close-btn');
  }

  async isAppWelcomeModalVisible(): Promise<boolean> {
    return (await this.appWelcomeModal.isVisible()) && (await this.welcomeToRepMoveHeader.isVisible());
  }

  async closeWelcomeModalIfExist(): Promise<void> {
    if ((await this.isAppWelcomeModalVisible()) && (await this.closeModalButton.isVisible())) {
      await this.closeModalButton.click();
    }
  }
}
