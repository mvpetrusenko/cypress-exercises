/// <reference types="cypress" />

// #1: vytvor si tri nové príkazy. jeden na vytvorenie boardu
// druhý na vytvorenie listu a tretí na vytvorenie karty
// použi ich v teste
it('vytvorenie nového boardu, listu a karty', () => {

  cy.visit('/')

  Cypress.Commands.add('board creation'), (boardName) => {

  cy.get('[data-cy="first-board"]')
    .type(`${boardName}{enter}`)

  })

  Cypress.Commands.add('list creation'), (listName) => {

  cy.get('[data-cy="add-list-input"]')
    .type(`${listName}{enter}`)

  })

  Cypress.Commands.add('card creation'), (cardName) => {

   cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type(`${cardName}{enter}`)

  })


});