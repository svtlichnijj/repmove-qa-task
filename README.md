# RepMove QA Task - Playwright E2E Tests

This repository contains E2E tests for the RepMove Enterprise application ([https://dev-repmove-enterprise.web.app](https://dev-repmove-enterprise.web.app)), developed using <ins>Playwright</ins> and <ins>TypeScript</ins>. The project adheres to the principles of the Page Object Model, SOLID, and generally accepted best practices in test automation.

## Quick start

To run tests locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/svtlichnijj/repmove-qa-task.git
cd repmove-qa-task
```

### 2. Setup environments

```shell 
npm install
npx playwright install --with-deps chromium
```

### 3. Set up environment variables
Create a file in the root of your project by copying `.env.example`: `.env`

```shell
cp .env.example .env
```

Open and fill in the required data. At a minimum, you will need `BASE_URL`. For login tests, you will need `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`.

```dotenv
BASE_URL=https://dev-repmove-enterprise.web.app
TEST_USER_EMAIL=your_test_email@example.com
TEST_USER_PASSWORD=your_test_password
DEFAULT_TIMEOUT=30000
VISIBLE_TIMEOUT=5000
LONG_TIMEOUT=30000
```

### 4. Run tests

* Run all tests:
```shell
npm test
```

* Run tests in headed mode (visible browser):
```shell
npm run test:headed
```

* Run a single test in headed mode:
```shell
npm run test:one
```

This will run all E2E tests defined in the project.

### 5. Show results

```shell
npm run test:report
```

This automatically opens the HTML report page in the browser.

## Project structure

```
repmove-qa-task/
├── pages/                   # Page Object Model for UI Pages
│   ├── common/              # Common page components
│   │   ├── BasePage.ts      # Base page class with common functionality
│   │   └── ToastNotification.ts # Toast notification component
│   ├── dashdoard/           # Dashboard page objects
│   │   ├── DashboardPage.ts # User dashboard page
│   │   ├── ForgotPage.ts    # Forgot password page
│   │   └── modal/           # Dashboard modal components
│   │       ├── AppWelcomeModal.ts
│   │       └── SelectPlanModal.ts
│   ├── LoginPage.ts         # Login page object
│   └── RegistrationPage.ts  # Registration page object
├── tests/                   # Test files
│   ├── login.spec.ts        # Login functionality tests
│   └── registration.spec.ts # Registration functionality tests
├── utils/                   # Utility functions
│   ├── constants.ts         # Test constants and mappings
│   ├── dataHelper.ts        # Test data generation utilities
├── types/                   # TypeScript type definitions
│   └── signup.d.ts          # Signup data interface
├── playwright-report/       # Playwright HTML Reports
├── test-results/            # Test artifacts and results after running tests
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint configuration
└── README.md                # This file
```

## Test Coverage

### Login Functionality Tests
- **Login-P1**: Successful login with valid credentials
- **Login-N1**: Error handling for invalid password
- **Login-E1**: Validation errors for empty fields
- **Login-E2**: Validation error for invalid email format
- **Login-E3**: Handling email with leading/trailing spaces
- **Login-A1**: Navigation to Forgot Password page

### Registration Functionality Tests
- **Registration-P1**: Successful user registration
- **Registration-N1**: Error handling for duplicate email registration
- **Registration-E1**: Validation errors for empty fields
- **Registration-E2**: Validation error for invalid email format
- **Registration-E3**: Validation error for too short password
- **Registration-A1**: Redirect to Sign In page when accessing Dashboard while logged out

## Features

- **Page Object Model**: Clean separation of test logic and page interactions
- **Data Generation**: Automated test data generation using Faker.js with localized data
- **Multi-browser Support**: Tests run on Chromium, Firefox, and WebKit
- **Comprehensive Validation**: Tests cover positive, negative, and edge cases
- **Toast Notifications**: Automated verification of success/error messages
- **Modal Handling**: Automated handling of welcome modals and overlays
- **Environment Configuration**: Flexible environment-based configuration

## Available Scripts

- `npm test` - Run all tests
- `npm run test:one` - Run a single test in headed mode
- `npm run test:headed` - Run all tests in headed mode (visible browser)
- `npm run test:report` - Show HTML test report
- `npm run lint:check` - Check code with ESLint
- `npm run lint:fix` - Fix ESLint issues automatically

## Reports
After running the tests, the following reports will be generated:
- **HTML Report:** Open in your browser after running locally. `playwright-report/index.html`
- **Test Results:** Test artifacts and screenshots. `test-results/`

## Technologies
- **Language:** TypeScript
- **Test Framework:** Playwright Test
- **Package Manager:** npm
- **Lint/Formatting:** ESLint + Prettier
- **Data Generation:** @faker-js/faker
- **Environment Management:** dotenv

## Author
[Taras Svitlychnyi](https://github.com/svtlichnijj)

## Test-plan
[Функціонал Входу та Реєстрації RepMove](https://docs.google.com/document/d/1PqZUzOhcmHHsl82pkkO9sdTWM2HpSnXYi4GvF-2ja-U/edit?usp=sharing)
