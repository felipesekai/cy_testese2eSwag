import { login } from "../setup/login"

describe('See my activities', () => {
  beforeEach(() => {
    // Visitando o site Etrium e fazendo login
    login()
  })

  // Creating a new activity
  it('Creating a new activity', () => {
    // cliando no botao cadastrar atividade
    cy.get('.card-title > .p-button').click()

    //adicionando um titulo
    cy.get('#titulo')
      .type('atividade criada pelo cypress')

    // selecioando os grupos de trabalho
    cy.get('#grupoTrabalho').click()
    cy.get('.p-dropdown-item').first().click()
    // sub-grupos
    cy.get('#subGrupoTrabalho').click()
    cy.get('.p-dropdown-item').first().click()
    //responsavel
    cy.get(':nth-child(1) > .form-group > .p-multiselect > .p-multiselect-label-container > .p-multiselect-label')
      .click()
    cy.get('.p-multiselect-item > .p-checkbox > .p-checkbox-box')
      .first().click()
    // interessado
    cy.get(':nth-child(2) > .form-group > .p-multiselect > .p-multiselect-label-container > .p-multiselect-label')
      .click()
    cy.get('.p-multiselect-item > .p-checkbox > .p-checkbox-box')
      .first().click()
    // Datas
    cy.get(':nth-child(1) > .form-group > #mask > .p-inputtext').type('14/05/2023')
    cy.get('.col-sm-6 > .form-group > #mask > .p-inputtext').type('14/06/2023')

    // cliando no botao para cadastrar a atividade
    cy.get('.flex-row-reverse > .p-button-primary').click()

  })

  //  viewing an activity
  it('should see my detailed activities', () => {

    // Clicando na primeira atividade da lista
    cy.get('#text-consult')
      .first().click()

    // Verificando se o nome da atividade está na página
    cy.get('#pr_id_12_header').should('be.visible')

  })

  it('should change activity title successfully', () => {
    cy.get('#text-consult')
      .first().click()
    cy.get('#titulo')
      .clear()
      .type('atividade cypress')

    // Clicando no botão de alterar título
    cy.get('.flex-row-reverse > .p-button-primary').click()

    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Atividade alterada com sucesso')
  })
  // adicionando descriçao na atividade
  it('Adding a description for the activity', () => {
    cy.get('#text-consult')
      .first().click()
    cy.get('#descricao')
      .clear()
      .type('descriçao adicionanda pelo cypress')

    // Clicando no botão de alterar título
    cy.get('.flex-row-reverse > .p-button-primary').click()

    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Atividade alterada com sucesso')
  })

  // mudando o status da atividade
  it('should change the status of the activity', () => {
    cy.get('#text-consult')
      .first().click()
    //pegando o dropdown do status atividade
    cy.get('#idStatusAtividade > .p-dropdown-label').click()
    //selecionando em atendimento
    cy.get('[aria-label="Em Atendimento"]').click()
    // Clicando no botão de alterar atividade
    // Clicando no botão de alterar título
    cy.get('.flex-row-reverse > .p-button-primary').click()

    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Atividade alterada com sucesso')

  })

})

