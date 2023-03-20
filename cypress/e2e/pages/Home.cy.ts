export {}

describe('Home page "/"', () => {
    it('Should access projects home page', () => {
        cy.visit('http://localhost:3000')

        cy.get('h1').contains('GHub')
        cy.get('h2').contains('Olá, bem-vindo ao GHub')
    })

    it('Should access Users page', () => {
        cy.visit('http://localhost:3000')

        cy.get('a[href*="users"]').click()

        cy.url().should('include', '/users')
    })

    it('Should access Repos page', () => {
        cy.visit('http://localhost:3000')

        cy.get('a[href*="repos"]').click()

        cy.url().should('include', '/repos')
    })
})
