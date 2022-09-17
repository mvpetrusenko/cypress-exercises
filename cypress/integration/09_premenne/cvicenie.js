/// <reference types="cypress" />

// #1: v beforeEach si vytvor cez API nový board a priraď mu alias
beforeEach( function() {

  cy.request('POST', '/api/boards', { name: 'board for variables' })
       .its('body.id')
       .as('newBoard')

})


// #2: otvor vytvorený board použitím aliasu
it('otvorenie boardu', function() {

   cy.visit(`/board/${this.newBoard}`)

})

// #3: vytvor nový list priradený do vytvoreného boardu
it('vytvorenie nového listu', function() {

  cy.visit(`/board/${this.newBoard}`)

  cy.get('[data-cy="add-list-input"]')
    .type(`this is newnew list{enter}`)

})

// #4: vytvor nový list a novú kartu priradené do vytvoreného boardu
it('vytvorenie nového listu a novej karty', function() {

  cy.request('POST', '/api/lists', {boardId: this.newBoard, name: 'listForCard'})
            .its('body.id')
            .then(listId => {


    cy.request('POST', '/api/cards',
      {boardId: this.newBoard,
      listId,
      name: 'card from list' })

     })

  cy.visit('/')

})

// #5: vytvor si list, kartu, otvor si nový board a over si, 
// že detail karty obsahuje názov listu
it.only('zobrazenie názvu listu v detaile karty', function() {

   cy.request('POST', '/api/lists', {boardId: this.newBoard, name: 'listForCard'})
            .its('body.id')
            .then(listId => {


    cy.request('POST', '/api/cards',
      {boardId: this.newBoard,
      listId,
      name: 'card from list2' })

     })

  cy.visit('/')

  cy.visit(`/board/${this.newBoard}`)

  cy.get('[data-cy="card"]')
    .click()

  cy.get('[data-cy="card-list-name"]')
     .should('have.text', 'listForCard')

})