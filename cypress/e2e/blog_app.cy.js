describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user1 = {
      name: 'Tester1',
      username: 'test_user1',
      password: 'hashThis1'
    }
    const user2 = {
      name: 'Tester2',
      username: 'test_user2',
      password: 'hashThis2'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test_user1')
      cy.get('#password').type('hashThis1')
      cy.get('#login-button').click()

      cy.contains('Tester1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test_user1')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test_user1', password: 'hashThis1' })
    })

    it('a blog can be created', function() {
      cy.get('#create_new_blog-button').click()
      cy.get('#url').type('blog.com')
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#create-button').click()

      cy.contains('Title Author')
    })

    describe('and some blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          url: 'blog1.com',
          title: 'Title1',
          author: 'Author1'
        })
        cy.createBlog({
          url: 'blog2.com',
          title: 'Title2',
          author: 'Author2'
        })
        cy.createBlog({
          url: 'blog3.com',
          title: 'Title3',
          author: 'Author3'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('Title1 Author1').parent().as('theBlog').find('#view-button').click()
        cy.get('@theBlog').find('#likes').should('contain', '0')
        cy.get('@theBlog').find('#like-button').click()
        cy.get('@theBlog').find('#likes').should('contain', '1')
      })

      it('a blog can be removed by user who created it', function() {
        cy.contains('Title3 Author3').parent().as('theBlog').find('#view-button').click()
        cy.get('@theBlog').find('#remove-button').click()
        cy.get('html').should('not.contain', 'Title3 Author3')
      })

      it('a blog can not be removed by user who did not create it', function() {
        cy.get('#logout-button').click()
        cy.login({ username: 'test_user2', password: 'hashThis2' })

        cy.contains('Title3 Author3').parent().as('theBlog').find('#view-button').click()
        cy.get('@theBlog').should('not.contain', '#remove-button')
      })

      it('blogs are sorted by likes in descending order', function() {
        cy.contains('Title2 Author2').parent().as('theBlog2').find('#view-button').click()
        cy.contains('Title3 Author3').parent().as('theBlog3').find('#view-button').click()

        cy.get('@theBlog2').find('#like-button').click()
        cy.wait(1000)
        cy.get('@theBlog3').find('#like-button').click()
        cy.wait(1000)
        cy.get('@theBlog3').find('#like-button').click()
        cy.wait(1000)

        cy.get('.blog').eq(0).should('contain', 'Title3 Author3')
        cy.get('.blog').eq(1).should('contain', 'Title2 Author2')
        cy.get('.blog').eq(2).should('contain', 'Title1 Author1')
      })
    })
  })
})
