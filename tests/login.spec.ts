import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { DashboardPage } from '~pages/dashdoard/DashboardPage.js';
import { ForgotPage } from '~pages/dashdoard/ForgotPage.js';
import { LoginPage } from '~pages/LoginPage.js';

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

test.beforeAll(() => {
  if (!TEST_USER_EMAIL) throw new Error('"TEST_USER_EMAIL" is not defined in your `.env` file');
  if (!TEST_USER_PASSWORD) throw new Error('"TEST_USER_PASSWORD" is not defined in your `.env` file');
});

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

test.describe('Login Functionality', () => {
  test.describe.configure({ timeout: Number(process.env.LONG_TIMEOUT) || 30000 });

  test('Login-P1: Should allow a registered user to log in', async ({ page }) => {
    await loginPage.login(TEST_USER_EMAIL!, TEST_USER_PASSWORD!);
    await loginPage.dataHasBeenSent();

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectUrlContains();
    await dashboardPage.appDashboardBlockIsVisible();
  });

  test('Login-N1: Should show an error for invalid password', async () => {
    await loginPage.login(TEST_USER_EMAIL!, 'Invalid_Password123');
    await loginPage.dataHasBeenSent();

    await loginPage.toastNotification.expectErrorNotifyContainText('Invalid to login');
    await loginPage.expectUrlContains();
  });

  test('Login-E1: Should show validation errors for empty fields', async () => {
    await loginPage.loginButton.click();

    await loginPage.expectEmailHaveErrorText('Please, enter your email address');
    await loginPage.expectPasswordHaveErrorText('The Password is required');
    await loginPage.expectUrlContains();
  });

  test('Login-E2: Should show validation error for invalid email format', async () => {
    const email = faker.internet.email();
    const invalidEmail = email.replaceAll('@', '');
    await loginPage.login(invalidEmail, TEST_USER_PASSWORD!);

    await loginPage.expectEmailHaveErrorText('Invalid email address');
    await loginPage.expectUrlContains();

    await loginPage.emailInput.clear();
    const invalidEmailDomain = email.replaceAll('.', '');
    await loginPage.login(invalidEmailDomain, TEST_USER_PASSWORD!);
    await loginPage.dataHasBeenSent();

    await loginPage.toastNotification.expectErrorNotifyContainText('Invalid to login');
    await loginPage.expectUrlContains();
  });

  test('Login-E3: Should handle email with leading/trailing spaces', async ({ page }) => {
    const emailWithSpaces = `  ${TEST_USER_EMAIL!}  `;
    await loginPage.login(emailWithSpaces, TEST_USER_PASSWORD!);
    await loginPage.dataHasBeenSent();

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectUrlContains();
    await dashboardPage.appDashboardBlockIsVisible();
  });

  test('Login-A1: Should navigate to the Forgot Password page when link is clicked (Out-of-Scope check)', async ({
    page,
  }) => {
    await loginPage.clickForgotPasswordLink();

    const forgotPage = new ForgotPage(page);
    await forgotPage.expectUrlContains();
    await forgotPage.expectForgotFormBlockIsVisible();
  });
});
