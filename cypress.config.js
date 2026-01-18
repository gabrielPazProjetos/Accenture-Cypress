const { defineConfig } = require("cypress");
const { faker } = require('@faker-js/faker'); // faker
const nomeFake = faker.person.fullName();
const emailFake = faker.internet.email();

module.exports = defineConfig({
  // report que registra os testes quando executados no terminal com cypress run
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: "https://coffee-cart.app/",

    setupNodeEvents(on, config) {
      const cucumber = require('cypress-cucumber-preprocessor').default;
      on('file:preprocessor', cucumber());

      // faker
      config.env.nome = nomeFake;
      config.env.email = emailFake;

      return config;
    },
  },
});
