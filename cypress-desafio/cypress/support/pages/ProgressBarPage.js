import BasePage from './BasePage';

const elements = {
  startStopButton: '#startStopButton',
  resetButton: '#resetButton',
  progressBar: '#progressBar [role="progressbar"]',
};

class ProgressBarPage extends BasePage {
  value() {
    return cy.get(elements.progressBar).invoke('attr', 'aria-valuenow').then(Number);
  }

  startStopButton() {
    return cy.get(elements.startStopButton);
  }

  clickStartStop() {
    cy.get(elements.startStopButton).click();
  }

  waitAtLeast(value) {
    cy.get(elements.progressBar, { timeout: 30000 }).should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.gte(value);
    });
  }

  waitExactly(value) {
    cy.get(elements.progressBar, { timeout: 30000 }).should('have.attr', 'aria-valuenow', String(value));
  }

  // a barra continua andando depois do reset, então aceito um valor perto do início
  waitAtMost(value) {
    cy.get(elements.progressBar).should(($bar) => {
      expect(Number($bar.attr('aria-valuenow'))).to.be.lte(value);
    });
  }

  reset() {
    cy.get(elements.resetButton).click();
  }
}

export default new ProgressBarPage();
