// chamadas da API do demoqa
const json = { 'Content-Type': 'application/json' };
const bearer = (token) => ({ ...json, Authorization: `Bearer ${token}` });

// failOnStatusCode: false porque quem valida o status é o step
const request = (method, url, { headers, body } = {}) =>
  cy.request({ method, url, headers, body, failOnStatusCode: false });

export const BookStoreApi = {
  createUser: (userName, password) => request('POST', '/Account/v1/User', { headers: json, body: { userName, password } }),

  generateToken: (userName, password) =>
    request('POST', '/Account/v1/GenerateToken', { headers: json, body: { userName, password } }),

  authorized: (userName, password) =>
    request('POST', '/Account/v1/Authorized', { headers: json, body: { userName, password } }),

  listBooks: () => request('GET', '/BookStore/v1/Books'),

  addBooks: (userId, isbns, token) =>
    request('POST', '/BookStore/v1/Books', {
      headers: bearer(token),
      body: { userId, collectionOfIsbns: isbns.map((isbn) => ({ isbn })) },
    }),

  getUser: (userId, token) => request('GET', `/Account/v1/User/${userId}`, { headers: bearer(token) }),

  deleteUser: (userId, token) => request('DELETE', `/Account/v1/User/${userId}`, { headers: bearer(token) }),
};
