const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  defaultBrowser: 'chrome',
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.feature',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 120000,
    video: false,
    screenshotOnRunFailure: true,
    // anúncios deixam a página lenta e cobrem botão
    blockHosts: [
      '*googlesyndication.com',
      '*doubleclick.net',
      '*googletagservices.com',
      '*googletagmanager.com',
      '*google-analytics.com',
      '*adservice.google.com',
      '*adplus*',
    ],
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },
});
