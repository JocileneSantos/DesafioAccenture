// tira os anúncios que cobrem os botões
Cypress.Commands.add('removeAds', () => {
  cy.document().then((doc) => {
    const adSelectors = '#fixedban, footer, iframe[id^="google_ads"], [id^="Ad.Plus"], .Advertisement-Section';
    doc.querySelectorAll(adSelectors).forEach((ad) => ad.remove());
  });
});

// drag and drop nativo do HTML5, disparando os eventos na mão
// uso: cy.get('#origem').dragTo('#destino')
Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (source, targetSelector) => {
  const dataTransfer = new DataTransfer();

  cy.wrap(source).trigger('dragstart', { dataTransfer });
  cy.get(targetSelector).trigger('dragenter', { dataTransfer });
  cy.get(targetSelector).trigger('dragover', { dataTransfer });
  cy.get(targetSelector).trigger('drop', { dataTransfer });
  cy.wrap(source).trigger('dragend', { dataTransfer });
});
