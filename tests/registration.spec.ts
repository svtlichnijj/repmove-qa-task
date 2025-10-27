import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '~pages/LoginPage.js';
import { RegistrationPage } from '~pages/RegistrationPage.js';
import { DashboardPage } from '~pages/dashdoard/DashboardPage.js';
import { generateRegisterData } from '~utils/dataHelper.js';

test.describe('Registration Functionality', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.open();
  });

  test.describe('With sending data', () => {
    test.describe.configure({ retries: 2 });
    test.describe.serial('Registering twice in a row', () => {
      test.describe.configure({ timeout: Number(process.env.LONG_TIMEOUT) || 30000 });
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

    test('Registration-E2: Should show validation error for invalid email format', async () => {
      const validData = generateRegisterData();

      const invalidData = JSON.parse(JSON.stringify(validData));
      invalidData.email = invalidData.email.replaceAll('@', '');
      await registrationPage.signUp(invalidData);
      await registrationPage.expectFieldHaveErrorText(registrationPage.emailBlock, 'Invalid email address');
      await registrationPage.expectUrlContains();

      await registrationPage.emailInput.clear();

      await registrationPage.emailInput.fill(validData.email.replaceAll('.', ''));
      await registrationPage.signUpButton.click();
      await registrationPage.dataHasBeenSent();

      await registrationPage.toastNotification.expectErrorNotifyContainText('Invalid to sign up');
      await registrationPage.expectUrlContains();
    });

    test('Registration-E3: Should show validation error for too short password', async () => {
      const shortPasswordData = generateRegisterData();
      shortPasswordData.password = faker.internet.password({ length: 4 });

      await registrationPage.signUp(shortPasswordData);

      await registrationPage.expectFieldHaveErrorText(registrationPage.passwordBlock, 'Min length for Password is 5');
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

  test('Registration-A1: Should redirect to Sign In page when trying to access Dashboard while logged out', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.open();

    const loginPage = new LoginPage(page);
    await loginPage.expectUrlContains();
    await expect(loginPage.emailInput).toBeVisible();
  });
});
