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

    // selecionando os grupos de trabalho
    selectingGroupAndSubGroup()
    // selecioando os responsavel
    selectingResponsible()
    // selecioando os interessado
    selectingInterested()
    // Datas
    cy.get(':nth-child(1) > .form-group > #mask > .p-inputtext').type('14/05/2023')
    cy.get('.col-sm-6 > .form-group > #mask > .p-inputtext').type('14/06/2023')

    // cliando no botao para cadastrar a atividade
    cy.get('.flex-row-reverse > .p-button-primary').click()

  })

  // viewing an activity
  it('should see my detailed activities', () => {

    // Clicando na primeira atividade da lista
    cy.get('#text-consult')
      .first().click()

    // Verificando se o nome da atividade está na página
    cy.get('#pr_id_12_header').should('be.visible')
    cy.get('#pr_id_12_header').should('be.visible')
    cy.get('.p-dialog-header-icon').click()

  })
  //muando o titulo da atividade
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

  // Buscando um processo que nao existe
  it('must seek a process, but I do not find and display an error message', () => {
    cy.get('#text-consult')
      .first().click()
    // preenchenco o campo e pesquisando processo 
    cy.get('#processo').type('UMA')
    cy.get('.input-group-text').click()

    // Verificando se a mensagem de erro foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Processo não encontrado')

  })

  // buscando processo e adicionando a atividade
  it('searching process and adding the activity', () => {
    cy.get('#text-consult')
      .first().click()
    // preenchenco o campo e pesquisando processo 
    cy.get('#processo').type('ebt')
    cy.get('.input-group-text').click()

    // verificando se abriu a tela com resultados da busca 
    cy.get('#pr_id_15_header').should('have.text', 'Busca de Processo')
    // verificando se encontrou algum processo da pasta
    cy.get('.p-selectable-row > :nth-child(1)').should('have.text', 'EBT-2033')
    // selecionando o processo
    cy.get('[style="min-width: 8rem;"] > .p-button').click()

    // sub-grupos
    cy.get('#subGrupoTrabalho').click()
    cy.get('.p-dropdown-item').first().click()

    // Clicando no botão de alterar título
    cy.get('.flex-row-reverse > .p-button-primary').click()

    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Atividade alterada com sucesso')

  })

  // Deve apresentar um erro ao remover processo pois falta selecionar um responsavel para atividade
  it('Must present an error when removing process as it remains to select a responsible for activity', () => {
    cy.get('#text-consult')
      .first().click()

    //verificando se tem processo na atividade 
    cy.get('.col-sm-12 > .form-group > .linkCadGrupo').should('have.text', 'Desvincular Processo')
    //removendo processo
    cy.get('.col-sm-12 > .form-group > .linkCadGrupo').click()

    //alterando grupo para cy_grup
    cy.get('#grupoTrabalho').click()
    cy.get('[aria-label="cy_grup"]').click()

    // sub-grupos
    cy.get('#subGrupoTrabalho').click()
    cy.get('.p-dropdown-item').first().click()

    // Clicando no botão de alterar título
    cy.get('.flex-row-reverse > .p-button-primary').click()

    // Verificando se a mensagem de erro foi exibida
    cy.get('.p-toast-detail').should('have.text', 'A atividade precisa de ao menos um responsável')

  })
  // removendo processo de uma atividade
  it('searching process and adding the activity', () => {
    cy.get('#text-consult')
      .first().click()

    //verificando se tem processo na atividade 
    cy.get('.col-sm-12 > .form-group > .linkCadGrupo').should('have.text', 'Desvincular Processo')
    //removendo processo
    cy.get('.col-sm-12 > .form-group > .linkCadGrupo').click()

    //alterando grupo para cy_grup
    cy.get('#grupoTrabalho').click()
    cy.get('[aria-label="cy_grup"]').click()

    // sub-grupos
    cy.get('#subGrupoTrabalho').click()
    cy.get('.p-dropdown-item').first().click()

    // selecionando responsaveis e interessados
    selectingResponsible()
    selectingInterested()
    // Clicando no botão de alterar título
    cy.get('.flex-row-reverse > .p-button-primary').click()

    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Atividade alterada com sucesso')

  })

})

function selectingResponsible() {
  cy.get(':nth-child(1) > .form-group > .p-multiselect > .p-multiselect-label-container > .p-multiselect-label')
    .click()
  cy.get('.p-multiselect-item > .p-checkbox > .p-checkbox-box')
    .first().click()
}
function selectingInterested() {
  cy.get(':nth-child(2) > .form-group > .p-multiselect > .p-multiselect-label-container > .p-multiselect-label')
    .click()
  cy.get('.p-multiselect-item > .p-checkbox > .p-checkbox-box')
    .first().click()
}
function selectingGroupAndSubGroup() {
  // selecionando os grupos de trabalho
  cy.get('#grupoTrabalho').click()
  cy.get('.p-dropdown-item').first().click()
  // sub-grupos
  cy.get('#subGrupoTrabalho').click()
  cy.get('.p-dropdown-item').first().click()
}

