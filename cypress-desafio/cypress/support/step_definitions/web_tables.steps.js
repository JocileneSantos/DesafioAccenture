import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import WebTablesPage from '../pages/WebTablesPage';
import { webTableRecord } from '../data-factory';

let record;
let records = []; // bônus

When('eu crio um novo registro', () => {
  record = webTableRecord();
  WebTablesPage.add(record);
});

Then('o novo registro deve aparecer na tabela', () => {
  WebTablesPage.readRecord(record.email).should('deep.equal', record);
});

When('eu edito o novo registro criado', () => {
  const newData = { firstName: 'Editado', age: '33', salary: '9999', department: 'QA Automation' };
  WebTablesPage.edit(record.email, newData);
  record = { ...record, ...newData };
});

Then('a tabela deve exibir os dados editados', () => {
  WebTablesPage.readRecord(record.email).should('deep.equal', record);
});

When('eu deleto o novo registro criado', () => {
  WebTablesPage.delete(record.email);
});

Then('o novo registro não deve mais aparecer na tabela', () => {
  WebTablesPage.shouldNotHaveRecord(record.email);
});

// bônus
When('eu crio {int} novos registros', (quantity) => {
  records = [];
  for (let i = 0; i < quantity; i++) {
    const newRecord = webTableRecord();
    records.push(newRecord);
    WebTablesPage.add(newRecord);
  }
});

Then('os {int} novos registros devem aparecer na tabela', (quantity) => {
  expect(records).to.have.length(quantity);
  records.forEach((item) => {
    WebTablesPage.readRecord(item.email).should('deep.equal', item);
  });
});

When('eu deleto todos os novos registros criados', () => {
  records.forEach((item) => WebTablesPage.deleteIfPresent(item.email));
});

Then('nenhum dos novos registros deve aparecer na tabela', () => {
  records.forEach((item) => WebTablesPage.shouldNotHaveRecord(item.email));
});
