// playwright.config.js
// @ts-check
const { devices } = require("@playwright/test");
/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 3 : 3,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        trace: "on-first-retry",
        ...devices["Desktop Chrome"],
        headless: false,
        screenshot: "on",
        launchOptions: {
          args: ["--no-sandbox"],
        },
        locale: 'de-DE'
      },
    },
    {
      name: "mobile",
      use: {
        viewport: { width: 414, height: 896 },
        headless: false,
        screenshot: "on",
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        headless: true,
        screenshot: "on",
      },
    },
  ],
};
module.exports = config;
