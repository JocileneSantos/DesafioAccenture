import BasePage from './BasePage';

// Cypress não troca de aba. Então faço stub no window.open, pego a URL
// que seria aberta e visito ela na mesma aba.
class BrowserWindowsPage extends BasePage {
  clickNewWindow() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('#windowButton').click();
  }

  openedWindowUrl() {
    cy.get('@windowOpen').should('have.been.calledOnce');
    return cy.get('@windowOpen').then((stub) => stub.args[0][0]);
  }

  visitOpenedWindow(url) {
    cy.visit(url);
  }

  sampleHeading() {
    return cy.get('#sampleHeading');
  }

  // simula o fechamento voltando pra página anterior
  closeOpenedWindow() {
    cy.go('back');
  }
}

export default new BrowserWindowsPage();
