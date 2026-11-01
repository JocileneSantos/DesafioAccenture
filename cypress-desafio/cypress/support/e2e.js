import './commands';

// os scripts de anúncio do demoqa estouram erro e derrubam o teste à toa
Cypress.on('uncaught:exception', () => false);
