export {}

describe('Repos page "/repos"', () => {
    it('Should fill input and search repositories', async () => {
        cy.visit('http://localhost:3000')

        cy.get('a[href*="repos"]').click()

        cy.url().should('include', '/repos')

        cy.intercept('GET').as('ghApi')

        cy.get('input').type('linux')

        cy.wait('@ghApi')

        cy.get('p').should('Linux kernel source tree')
    })
})
