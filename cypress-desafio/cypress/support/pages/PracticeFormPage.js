import BasePage from './BasePage';

const elements = {
  firstName: '#firstName',
  lastName: '#lastName',
  email: '#userEmail',
  mobile: '#userNumber',
  birthInput: '#dateOfBirthInput',
  monthSelect: '.react-datepicker__month-select',
  yearSelect: '.react-datepicker__year-select',
  subjects: '#subjectsInput',
  subjectOption: '.subjects-auto-complete__option',
  upload: '#uploadPicture',
  address: '#currentAddress',
  state: '#react-select-3-input',
  city: '#react-select-4-input',
  submit: '#submit',
  modal: '.modal-content',
  modalTitle: '#example-modal-sizes-title-lg',
  modalRows: '.modal-body table tbody tr',
};

class PracticeFormPage extends BasePage {
  fill(student, uploadFile) {
    cy.get(elements.firstName).type(student.firstName);
    cy.get(elements.lastName).type(student.lastName);
    cy.get(elements.email).type(student.email);
    cy.contains('#genterWrapper label', new RegExp(`^${student.gender}$`)).click();
    cy.get(elements.mobile).type(student.mobile);
    this.selectBirthDate(student.birthDay, student.birthMonth, student.birthYear);
    student.subjects.forEach((subject) => {
      cy.get(elements.subjects).type(subject);
      cy.contains(elements.subjectOption, subject).click();
    });
    student.hobbies.forEach((hobby) => cy.contains('#hobbiesWrapper label', hobby).click());
    cy.get(elements.upload).selectFile(uploadFile);
    cy.get(elements.address).type(student.address);
    // react-select: digita e ENTER (force porque o input fica atrás do placeholder)
    cy.get(elements.state).type(`${student.state}{enter}`, { force: true });
    cy.get(elements.city).type(`${student.city}{enter}`, { force: true });
  }

  selectBirthDate(day, month, year) {
    cy.get(elements.birthInput).click();
    cy.get(elements.monthSelect).select(month);
    cy.get(elements.yearSelect).select(String(year));
    // dia 7 = react-datepicker__day--007; o :not evita pegar dia de outro mês
    const dayClass = `.react-datepicker__day--${String(day).padStart(3, '0')}`;
    cy.get(`${dayClass}:not(.react-datepicker__day--outside-month)`).click();
  }

  submit() {
    cy.removeAds();
    cy.get(elements.submit).scrollIntoView().click();
  }

  modal() {
    return cy.get(elements.modal);
  }

  modalTitle() {
    return cy.get(elements.modalTitle);
  }

  modalValue(label) {
    return cy.contains(elements.modalRows, label).find('td').eq(1);
  }

  // bug do site: o Close do popup estoura "findDOMNode is not a function" e não fecha.
  // ESC funciona.
  closeModal() {
    cy.get('body').type('{esc}');
  }
}

export default new PracticeFormPage();
