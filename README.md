# Playwright-testing-basics
Building the fundation of a UI and API testing system using Playwright.

## Requirements:
nodeJS v20.x - https://nodejs.org/en/download/prebuilt-installer

### VS Code Playwright Extension:
If you use VS Code, I highly recommend downloading and using this extension. It provides an excellent development experience for writing, running, and debugging tests.

## Installation & Usage:
After cloning/downloading the repository go to the project's root directory (playwright-test-assessment) in the command line
```bash
cd playwright-test-assessment
```

Run the following command to install dependencies:
```bash
npm install
```

In case of any browser related issue:
```bash
npx playwright install --with-deps
```

Run all the tests:
```
npx playwright test
```


Run only the UI tests:
```
npx playwright test tests/UI
```

Run only the invalid login UI tests:
```
npx playwright test --grep @invalidLogins
```


Run only the API tests:
```
npx playwright test tests/API
```

Run only the invalid API tests:
```
npx playwright test --grep "@invalidCreate|@invalidGet"
```
