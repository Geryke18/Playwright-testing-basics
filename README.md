# Playwright-testing-basics
Building the fundation of a UI and API testing system using Playwright.

## Requirements:
nodeJS v20.x - https://nodejs.org/en/download/prebuilt-installer

### VS Code Playwright Extension:
If you use VS Code, I highly recommend downloading and using this extension. It provides an excellent development experience for writing, running, and debugging tests.

## Usage:
After cloning the repository go to the project's root directory (Playwright-testing-basics) and run the following commands from the command line
```
npm install

npx playwright install
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