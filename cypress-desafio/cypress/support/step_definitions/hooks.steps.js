import { AfterStep } from '@badeball/cypress-cucumber-preprocessor';

let contador = 0;

AfterStep(({ pickleStep }) => {
  contador += 1;
  const numero = String(contador).padStart(3, '0');
  cy.screenshot(`${numero} - ${pickleStep.text}`, { capture: 'viewport' });
});