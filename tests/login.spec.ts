import { test } from '@playwright/test';
import { DashboardPage } from '~pages/dashdoard/DashboardPage.js';
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
});
