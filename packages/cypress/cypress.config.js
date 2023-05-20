const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'yeodoh',
  viewportWidth: 1920,
  viewportHeight: 1080,
  experimentalStudio: true,
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--force-device-scale-factor=1');
        }
        return launchOptions;
      });
    },
  },
});
