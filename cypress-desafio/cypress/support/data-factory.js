import { faker } from '@faker-js/faker';

export const uniqueUsername = () => `qa_user_${Date.now()}_${faker.number.int({ min: 100, max: 999 })}`;

// demoqa exige maiúscula, minúscula, número, especial e 8+ caracteres
export const strongPassword = () =>
  `${faker.string.alpha({ length: 4, casing: 'upper' })}${faker.string.alpha({ length: 4, casing: 'lower' })}${faker.string.numeric(3)}@`;

export const student = () => {
  const birth = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    mobile: faker.string.numeric({ length: 10, allowLeadingZeros: false }),
    birthDay: birth.getDate(),
    birthMonth: birth.toLocaleString('en-US', { month: 'long' }),
    birthYear: birth.getFullYear(),
    subjects: faker.helpers.arrayElements(['Maths', 'English', 'Physics', 'Chemistry', 'History'], 2),
    hobbies: faker.helpers.arrayElements(['Sports', 'Reading', 'Music'], { min: 1, max: 3 }),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
    state: 'NCR',
    city: faker.helpers.arrayElement(['Delhi', 'Gurgaon', 'Noida']),
  };
};

export const webTableRecord = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  age: String(faker.number.int({ min: 18, max: 70 })),
  salary: String(faker.number.int({ min: 1000, max: 20000 })),
  department: faker.helpers.arrayElement(['QA', 'Engineering', 'Legal', 'Finance', 'Compliance']),
});
