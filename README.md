# Playwright  Assessment

## Framework Overview

- Language: TypeScript
- Tool: Playwright Test
- UI Demo: https://www.saucedemo.com
- API Demo: https://fakestoreapi.com

## Framework Architecture

| Layer        | Folder                   | Purpose                           |
| ------------ | ------------------------ | --------------------------------- |
| Tests        | `tests/ui/` `tests/api/` | Test specs only                   |
| Page Objects | `pages/`                 | Locators + actions per page       |
| Fixtures     | `fixtures/`              | Reusable login/logout setup       |
| Data         | `data/`                  | Typed test data                   |
| Utils        | `utils/`                 | Helper functions                  |
| Config       | `playwright.config.ts`   | Browser, reporter, timeout config |

## How to Run

```bash
# Install
pnpm install
pnpm exec playwright install

# Run all tests
pnpm run playwright test

# Run by tag
pnpm run playwright test --grep @smoke
pnpm run playwright test --grep @api

# Run specific file
pnpm exec playwright test tests/ui/login.spec.ts

# Debug mode
pnpm run playwright test --debug

# UI mode
pnpm run playwright test --ui

# View report
pnpm run playwright show-report
```

## Test Coverage

- Login — valid, invalid, locked, empty fields
- Add to cart — single, multiple products
- Remove from cart
- API — POST login, GET products
- POM — LoginPage, InventoryPage, CartPage
- Fixtures — loggedInPage with setup and teardown
- Screenshots on failure
- HTML report
- Trace viewer
- CI/CD — GitHub Actions

## Test Results Summary

| Suite    | Tests | Passed | Failed |
| -------- | ----- | ------ | ------ |
| Login UI | 4     | 4      | 0      |
| Cart UI  | 4     | 4      | 0      |
| API      | 4     | 4      | 0      |
