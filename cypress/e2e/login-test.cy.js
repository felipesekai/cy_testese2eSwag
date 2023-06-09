
describe('login test in Etrium', () => {
  beforeEach(() => {
    // visitando o site swag labs
    cy.visit('http://localhost:3000/')
  })

  it('deve realizar login com sucesso', () => {
    cy.get('form > :nth-child(1) > .p-inputtext').type('cyteste@teste.com')
    cy.get(':nth-child(2) > .input-group > .p-inputtext').type('abc123')
    cy.get('.p-button').click()
    cy.url().should('include', '/home')
    cy.get('.card-title > span').should('have.text', 'Meu Painel')
  })

  it('deve exibir mensagem de erro para credenciais incorretas', () => {
    cy.get('form > :nth-child(1) > .p-inputtext').type('cyteste@teste.com')
    cy.get(':nth-child(2) > .input-group > .p-inputtext').type('312')
    cy.get('.p-button').click()
    cy.get('.p-inline-message-text').should('have.text', 'Email ou Senha Inválidos')
    cy.url().should('include', '/')
  })

  // informando um email que nao existe na base
  it('deve exibir mensagem de erro para credenciais incorretas', () => {
    cy.get('form > :nth-child(1) > .p-inputtext').type('cyt_este@teste.com')
    cy.get(':nth-child(2) > .input-group > .p-inputtext').type('312')
    cy.get('.p-button').click()
    cy.get('.p-inline-message-text').should('have.text', 'Email não encontrado')
    cy.url().should('include', '/')
  })

})


