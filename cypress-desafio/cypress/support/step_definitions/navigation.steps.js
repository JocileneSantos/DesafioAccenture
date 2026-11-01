import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../pages/HomePage';

Given('que eu acesso a página inicial do demoqa', () => {
  HomePage.open();
});

When('eu escolho a opção {string} na página inicial', (card) => {
  HomePage.chooseCard(card);
});

When('eu clico no submenu {string}', (item) => {
  HomePage.openMenuItem(item);
  cy.get('h1').should('contain.text', item);
});
