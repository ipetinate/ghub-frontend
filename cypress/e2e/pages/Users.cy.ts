export {}

describe('Users page "/users"', () => {
    it('Should fill input and search user', async () => {
        cy.visit('http://localhost:3000')

        cy.get('a[href*="users"]').click()

        cy.url().should('include', '/users')

        cy.intercept('GET').as('ghApi')

        cy.get('input').type('torvalds')

        cy.wait('@ghApi')

        cy.get('p').should('Linus Torvalds')
        cy.get('p').should('Linux Foundation')
    })
})
