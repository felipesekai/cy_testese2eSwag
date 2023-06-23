import { login } from "../setup/login"

describe('search process', () => {
  beforeEach(() => {
    // Visitando o site Etrium e fazendo login
    login()
    navigateToProcessPage()
  })

  // buscando um processo pelo nome da pasta
  it('should search a porcess for folder name and display the results in table ', function () {
    searchProcess()
    // // verificando se encontrou algum processo da pasta
    cy.get('[tabindex="0"] > [style="width: 200px;"]').should('have.text', 'AUTO-1')
    // cy.get('.card').should('match', /AUTO/)

  })

  // buscando um processo pelo nome da pasta abrindo o primeiro processo
  it('should search a porcess for folder name and display the results in table ', function () {
    searchProcess()
    // cy.get('.card').should('match', /AUTO/)
    cy.get('[tabindex="0"] > [style="width: 150px;"] > .flex-1 > :nth-child(1)').click()

    cy.get('.card-title > span').should('have.text', 'Ficha do Processo')
  })
  // buscando um processo pelo nome da pasta abrindo o primeiro processo e adicionando ele no push
  it('should Add the process in push ', function () {
    searchProcess()
    // abrindo o processo
    cy.get('[tabindex="0"] > [style="width: 150px;"] > .flex-1 > :nth-child(1)').click()
    cy.wait(2000);
    // marcando o campo para adicionar o processo no push
    cy.get('.p-checkbox-box').click()

    // clicando no botao confimar para adicionar o sistema
    cy.get('.flex-row > .p-button').click()
    //clicando no botao alterar
    alterButton().click()
    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Processo alterado com sucesso')

  })
  // buscando um processo pelo nome da pasta abrindo o primeiro processo e removendo ele do push
  it('should remove the process from push', function () {
    searchProcess()
    //  abrindo o processo

    cy.get('[tabindex="0"] > [style="width: 150px;"] > .flex-1 > :nth-child(1)').click()
    cy.wait(2000);
    // marcando o campo para adicionar o processo no push
    cy.get('.p-checkbox-box').first().click()

    //clicando no botao alterar
    alterButton().click()
    // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', 'Processo alterado com sucesso')

  })
  // cadastrando um processo automatico
  it('should register a process with error because the system is off', function () {
    // navegando ate cadastrar processo
    cy.get('.p-button-primary').click()
    // inserindo numero do processo
    cy.get('#numeroCnj').type("08017786820238150261")

    // selecionando o sistema

    cy.get('.p-dropdown-label').click()


    cy.get('[aria-label="TJPB 1 GRAU"]').click()

    cy.get('.p-button-primary').click()

    // // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', failStringCad)
    // cy.get('.p-toast-detail').should('have.text', 'Solicitação Recebida, uma notificação será envida quando o processo for inserido.')

  })
  // cadastrando um processo automatico
  it('should register a process with success', function () {
    // navegando ate cadastrar processo
    cy.get('.p-button-primary').click()
    // inserindo numero do processo
    cy.get('#numeroCnj').type("08017786820238150261")

    // selecionando o sistema

    cy.get('.p-dropdown-label').click()


    cy.get('[aria-label="TJPB 1 GRAU"]').click()

    cy.get('.p-button-primary').click()

    // // Verificando se a mensagem de sucesso foi exibida
    cy.get('.p-toast-detail').should('have.text', sucessStringCad)

  })
  // buscando e excluindo um processo
  it('should seek a process and delete a process', function () {
    searchProcess("ebt")
    //verificando de contem um processo
    cy.contains('EBT').should('exist');
    // clicando para excluir
    cy.get('.p-button-danger').click()

    //verificando se abriu o dialog de confirmacao
    cy.contains('Exclusão de Processo').should('exist');

    cy.get('.p-confirm-dialog-accept').click()

    //verificando se abriu o dialog de confirmacao
    cy.contains('Processo Excluído com sucesso').should('exist');

  })
  // buscando e resgatando processo excluido
  it('should seek a deleted process and restore', function () {
    navigateToDeletedProcessPage()
    //verificando de contem um processo
    cy.contains('EBT').should('exist');

    cy.get('.p-row-odd > [style="min-width: 8rem;"] > .p-button').click()


    //verificando se abriu o dialog de confirmacao
    cy.contains('Ativação de Processo').should('exist');

    cy.get('.p-confirm-dialog-accept').click()

    //verificando se abriu o dialog de confirmacao
    cy.contains('Processo ativado com sucesso!').should('exist');
  })
})

function searchProcess(value) {
  if (value) {
    //acessando barra de pesquisa
    cy.get('.flex-row > .form-control').type(value)
  } else {
    //acessando barra de pesquisa
    cy.get('.flex-row > .form-control').type("auto")

  }
  //clicando no botao pesquisar

  cy.get('.input-group-text').click()
}

function currentDate() {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  const dia = String(dataAtual.getDate()).padStart(2, '0');

  return `${dia}${mes}/${ano}`;
}
function alterButton() {
  return cy.get('div.gap-1 > .p-button-primary')
}
function navigateToProcessPage() {

  cy.get('.nav-pills > :nth-child(3) > :nth-child(1)').click()
  cy.get('.menu-is-opening > .nav > :nth-child(2) > .nav-link').click()
}
function navigateToDeletedProcessPage() {

  cy.get('.nav-pills > :nth-child(3) > :nth-child(1)').click()
  cy.get('.menu-is-opening > .nav > :nth-child(3) > .nav-link').click()
}

const sucessStringCad = "Solicitação Recebida, uma notificação será envida quando o processo for inserido."
const failStringCad = "Desculpe-nos, mas o serviço encontra-se indisponível no momento."

