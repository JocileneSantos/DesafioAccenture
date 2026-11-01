import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import BrowserWindowsPage from '../pages/BrowserWindowsPage';

When('eu clico no botão New Window', () => {
  BrowserWindowsPage.clickNewWindow();
});

Then('uma nova janela deve ser aberta com a mensagem {string}', (message) => {
  BrowserWindowsPage.openedWindowUrl().then((url) => {
    expect(url).to.contain('/sample');
    BrowserWindowsPage.visitOpenedWindow(url);
  });
  BrowserWindowsPage.sampleHeading().should('have.text', message);
});

When('eu fecho a nova janela', () => {
  BrowserWindowsPage.closeOpenedWindow();
});

Then('eu devo estar de volta na página {string}', (title) => {
  cy.location('pathname').should('eq', '/browser-windows');
  cy.get('h1').should('have.text', title);
});
