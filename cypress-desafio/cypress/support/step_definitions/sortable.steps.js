import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import SortablePage from '../pages/SortablePage';

const ASCENDING = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
const toList = (text) => text.split(',').map((item) => item.trim());

// a lista já abre ordenada, então embaralho antes (também com drag and drop)
When('a lista está na ordem {string}', (order) => {
  SortablePage.openListTab();
  SortablePage.sortTo(toList(order));
  SortablePage.itemTexts().should('deep.equal', toList(order));
});

When('eu ordeno os elementos em ordem crescente usando drag and drop', () => {
  SortablePage.sortTo(ASCENDING);
});

Then('os elementos devem estar na ordem {string}', (order) => {
  SortablePage.itemTexts().should('deep.equal', toList(order));
});
