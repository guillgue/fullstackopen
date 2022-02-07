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

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('My New Blog')
      cy.get('#author').type('Charles')
      cy.get('#url').type('https://example.com')
      cy.get('form > button').click()
      cy.get('#bloglist').contains('My New Blog Charles')
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog 1',
          author: 'Author 1',
          url: 'https://blog1.example.com'
        })
        cy.createBlog({
          title: 'Blog 2',
          author: 'Author 2',
          url: 'https://blog2.example.com'
        })
        cy.createBlog({
          title: 'Blog 3',
          author: 'Author 3',
          url: 'https://blog3.example.com'
        })
      })

      it.only('one of those can be liked', function() {
        cy.contains('Blog 2').parent().as('blog2')
        cy.get('@blog2').contains('view').click()
        cy.get('@blog2').contains('likes 0')
        cy.get('@blog2').find('.likes > button').click()
        cy.get('@blog2').contains('likes 1')
        cy.get('@blog2').find('.likes > button').click()
        cy.get('@blog2').contains('likes 2')
      })
    })
  })
})