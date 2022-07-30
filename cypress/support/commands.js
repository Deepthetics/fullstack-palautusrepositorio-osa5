Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then(response => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    cy.visit('localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ url, title, author }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { url, title, author },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
