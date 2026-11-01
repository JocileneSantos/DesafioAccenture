import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import PracticeFormPage from '../pages/PracticeFormPage';
import { student as buildStudent } from '../data-factory';

const UPLOAD_FILE = 'cypress/fixtures/upload.txt';
let student;

When('eu preencho todo o formulário com valores aleatórios', () => {
  student = buildStudent();
  PracticeFormPage.fill(student, UPLOAD_FILE);
});

When('eu submeto o formulário', () => {
  PracticeFormPage.submit();
});

Then('um popup deve ser aberto com os dados enviados', () => {
  PracticeFormPage.modal().should('be.visible');
  PracticeFormPage.modalTitle().should('have.text', 'Thanks for submitting the form');

  const birthDate = `${String(student.birthDay).padStart(2, '0')} ${student.birthMonth},${student.birthYear}`;
  const expected = {
    'Student Name': `${student.firstName} ${student.lastName}`,
    'Student Email': student.email,
    Gender: student.gender,
    Mobile: student.mobile,
    'Date of Birth': birthDate,
    Picture: 'upload.txt',
    Address: student.address,
    'State and City': `${student.state} ${student.city}`,
  };
  Object.entries(expected).forEach(([label, value]) => PracticeFormPage.modalValue(label).should('have.text', value));
  student.subjects.forEach((subject) => PracticeFormPage.modalValue('Subjects').should('contain.text', subject));
  student.hobbies.forEach((hobby) => PracticeFormPage.modalValue('Hobbies').should('contain.text', hobby));
});

When('eu fecho o popup', () => {
  PracticeFormPage.closeModal();
});

Then('o popup não deve mais ser exibido', () => {
  PracticeFormPage.modal().should('not.exist');
});
