import BasePage from './BasePage';

const elements = {
  addButton: '#addNewRecordButton',
  searchBox: '#searchBox',
  modal: '.modal-content',
  submitButton: '#submit',
  tableRows: 'table tbody tr',
  editButton: 'span[title="Edit"]',
  deleteButton: 'span[title="Delete"]',
};

// campos do modal
const formFields = {
  firstName: '#firstName',
  lastName: '#lastName',
  email: '#userEmail',
  age: '#age',
  salary: '#salary',
  department: '#department',
};

// ordem das colunas
const columns = ['firstName', 'lastName', 'age', 'email', 'salary', 'department'];

class WebTablesPage extends BasePage {
  add(record) {
    cy.get(elements.addButton).click();
    this.fillFormAndSubmit(record);
  }

  edit(email, newData) {
    this.search(email);
    this.rowWithEmail(email).find(elements.editButton).click();
    this.fillFormAndSubmit(newData);
    this.clearSearch();
  }

  delete(email) {
    this.search(email);
    this.rowWithEmail(email).find(elements.deleteButton).click();
    this.clearSearch();
  }

  // bug do site: deletar um registro novo apaga todos os que foram adicionados na sessão,
  // então na hora de deletar em lote o registro pode já ter sumido
  deleteIfPresent(email) {
    this.search(email);
    cy.get('table tbody').then(($tableBody) => {
      if ($tableBody.text().includes(email)) {
        this.rowWithEmail(email).find(elements.deleteButton).click();
      }
    });
    this.clearSearch();
  }

  readRecord(email) {
    this.search(email);
    return this.rowWithEmail(email)
      .find('td')
      .then(($cells) => {
        const record = {};
        columns.forEach((column, index) => {
          record[column] = $cells.eq(index).text().trim();
        });
        return record;
      });
  }

  shouldNotHaveRecord(email) {
    this.search(email);
    cy.contains(elements.tableRows, email).should('not.exist');
    this.clearSearch();
  }

  fillFormAndSubmit(data) {
    cy.get(elements.modal).should('be.visible');
    Object.keys(data).forEach((field) => {
      cy.get(formFields[field]).clear().type(data[field]);
    });
    cy.get(elements.submitButton).click();
    cy.get(elements.modal).should('not.exist');
  }

  search(text) {
    cy.get(elements.searchBox).clear().type(text);
  }

  clearSearch() {
    cy.get(elements.searchBox).clear();
  }

  rowWithEmail(email) {
    return cy.contains(elements.tableRows, email);
  }
}

export default new WebTablesPage();
