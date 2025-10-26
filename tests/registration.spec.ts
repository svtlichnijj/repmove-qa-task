import { test } from '@playwright/test';
import { RegistrationPage } from '~pages/RegistrationPage.js';
import { DashboardPage } from '~pages/dashdoard/DashboardPage.js';
import { generateRegisterData } from '~utils/dataHelper.js';

test.describe('Registration Functionality', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.open();
  });

  test.describe.serial('Registering twice in a row', () => {
    test.describe.configure({ retries: 2 });
    const registrationData = generateRegisterData();

    test('Registration-P1: Should allow a new user to register successfully', async ({ page }) => {
      await registrationPage.signUp(registrationData);
      await registrationPage.dataHasBeenSent();
      const dashboardPage = new DashboardPage(page);

      await dashboardPage.expectUrlContains();

      await dashboardPage.closeWelcomeModals();
      await dashboardPage.appDashboardBlockIsVisible();
    });

    test('Registration-N1: Should show an error for duplicate email registration', async () => {
      await registrationPage.signUp(registrationData);
      await registrationPage.dataHasBeenSent();
      await registrationPage.toastNotification.expectErrorNotifyContainText('Invalid to sign up');

      await registrationPage.expectUrlContains();
    });
  });

  test('Registration-E1: Should show validation errors for empty fields', async () => {
    await registrationPage.signUpButton.click();
    await registrationPage.fieldsHaveErrors([
      registrationPage.firstNameBlock,
      registrationPage.lastNameBlock,
      registrationPage.companyNameBlock,
      registrationPage.industryDropdown,
      registrationPage.emailBlock,
      registrationPage.phoneBlock,
      registrationPage.passwordBlock,
    ]);
    await registrationPage.expectUrlContains();
  });
});
