/// <reference types="cypress" />

// úloha #1: použi súbor twoBoards.json z fixtures foldra, 
// alebo si vytvor vlastný fixture súbor
it('zoznam dvoch boardov z fixture', () => {

  cy.intercept('GET', '/api/boards', {fixture: 'twoBoards'})

  cy
    .visit('/');

  cy.get('[data-cy=board-item]')
    .should('have.length', 2)

})

// úloha #2: skús tentokrát vytvoriť board, no namiesto
// použitia fixture ju skús nahradiť pomocou atribútu body
it('žiaden board v zozname', () => {

  cy.intercept('GET', '/api/boards', [])

  cy
    .visit('/');

  cy.contains('Get started!')
    .should('be.visible')

})

// úloha #3: pridaj do príkazu .intercept() atribút, pomocou 
// ktorého vyvoláš chybu pri vytvorení boardu
it.only('chyba pri vytvorení boardu', () => {

  cy.intercept('POST', '/api/boards', {forceNetworkError: true})

  cy.visit('/');

  cy.get('[data-cy=create-board]')
    .click()

  cy.get('[data-cy="new-board-input"]')
    .type('nova zahrada{enter}')

  cy.get('[data-cy="notification-message"]')
    .should('be.visible')

})

// úloha #4: dynamicky zmeň názov niektorého boardu v zozname
it.only('dynamická zmena názvov boardov', () => {

  cy
    .intercept({
      method: 'GET',
      url: '/api/boards'
    }, (req) => {
      req.reply(res => {

         res.statusCode = 400

      })
    }).as('boards')

  cy
    .visit('/')

})