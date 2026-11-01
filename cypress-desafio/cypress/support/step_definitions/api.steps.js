import { After, Before, Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { BookStoreApi } from '../api/bookstore-api';
import { strongPassword, uniqueUsername } from '../data-factory';

let ctx;

Before({ tags: '@api' }, () => {
  ctx = { userName: uniqueUsername(), password: strongPassword() };
});

// não deixa usuário sobrando no demoqa
After({ tags: '@api' }, () => {
  if (ctx.userId && ctx.token) BookStoreApi.deleteUser(ctx.userId, ctx.token);
});

Given('que eu crio um novo usuário', () => {
  BookStoreApi.createUser(ctx.userName, ctx.password).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.username).to.eq(ctx.userName);
    expect(res.body.userID).to.be.a('string').and.not.be.empty;
    expect(res.body.books).to.be.an('array').that.is.empty;
    ctx.userId = res.body.userID;
  });
});

When('eu gero um token de acesso', () => {
  BookStoreApi.generateToken(ctx.userName, ctx.password).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.status).to.eq('Success');
    expect(res.body.result).to.eq('User authorized successfully.');
    expect(res.body.token).to.be.a('string').and.not.be.empty;
    ctx.token = res.body.token;
  });
});

Then('o usuário criado deve estar autorizado', () => {
  BookStoreApi.authorized(ctx.userName, ctx.password).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.eq(true);
  });
});

When('eu listo os livros disponíveis', () => {
  BookStoreApi.listBooks().then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.books).to.be.an('array').with.length.greaterThan(1);
    res.body.books.forEach((book) => expect(book).to.include.all.keys('isbn', 'title', 'author'));
    ctx.books = res.body.books;
  });
});

When('eu alugo dois livros da lista', () => {
  ctx.chosenBooks = Cypress._.sampleSize(ctx.books, 2);
  const isbns = ctx.chosenBooks.map((book) => book.isbn);
  BookStoreApi.addBooks(ctx.userId, isbns, ctx.token).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.books.map((book) => book.isbn)).to.have.members(isbns);
  });
});

Then('os detalhes do usuário devem conter os dois livros alugados', () => {
  BookStoreApi.getUser(ctx.userId, ctx.token).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.userId).to.eq(ctx.userId);
    expect(res.body.username).to.eq(ctx.userName);
    expect(res.body.books).to.have.length(2);
    expect(res.body.books.map((book) => book.isbn)).to.have.members(ctx.chosenBooks.map((book) => book.isbn));
    expect(res.body.books.map((book) => book.title)).to.have.members(ctx.chosenBooks.map((book) => book.title));
    cy.log(`Livros alugados: ${res.body.books.map((book) => book.title).join(' | ')}`);
  });
});
