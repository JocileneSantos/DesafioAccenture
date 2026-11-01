export default class BasePage {
  visit(path = '/') {
    cy.visit(path);
    cy.removeAds();
  }

  openMenuItem(name) {
    cy.removeAds();
    cy.contains('.left-pannel span.text', new RegExp(`^${name}$`)).scrollIntoView().click();
    cy.removeAds();
  }
}
