import BasePage from './BasePage';

class HomePage extends BasePage {
  open() {
    this.visit('/');
  }

  chooseCard(name) {
    cy.contains('.top-card h5', name).scrollIntoView().click();
    cy.removeAds();
  }
}

export default new HomePage();
