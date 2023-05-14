
export function login() {
    cy.visit('http://localhost:3000/')
    cy.get('form > :nth-child(1) > .p-inputtext').type('cyteste@teste.com')
    cy.get(':nth-child(2) > .input-group > .p-inputtext').type('abc123')
    cy.get('.p-button').click()
    cy.url().should('include', '/home')

}