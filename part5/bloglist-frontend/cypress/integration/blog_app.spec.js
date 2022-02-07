describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Charles de Gaulle',
      username: 'charles90',
      password: 'francelibre'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('charles90')
      cy.get('#password').type('francelibre')
      cy.contains('login').click()
      cy.contains('Charles de Gaulle logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('charles90')
      cy.get('#password').type('wrong password')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html')
        .should('not.contain', 'Charles de Gaulle logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'charles90', password: 'francelibre' })
    })

    it.only('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('My New Blog')
      cy.get('#author').type('Charles')
      cy.get('#url').type('https://example.com')
      cy.get('form > button').click()
      cy.get('#bloglist').contains('My New Blog Charles')
    })
  })
})