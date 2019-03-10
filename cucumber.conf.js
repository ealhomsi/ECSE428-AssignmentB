const { After, Before, setDefaultTimeout, AfterAll, BeforeAll } = require('cucumber');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({ env: process.env.browser || 'chromeHeadless' });
});

AfterAll(async () => {
  await stopWebDriver();
});

Before(async () => {
  await createSession();
});

After(async () => {
  await closeSession();
});