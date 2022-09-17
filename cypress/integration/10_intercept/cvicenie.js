/// <reference types="cypress" />

beforeEach( function() {

  cy.request('POST', '/api/reset')
  cy.request('POST', '/api/boards', { name: 'new board' })
    .its('body.id')
    .as('boardId')
    .then( boardId => {

      cy.request('POST', '/api/lists', {
        boardId,
        name: 'new list'
      })

    })

})

// #1: vytvor kartu pomocou UI a použi .intercept() príkaz
// na odsledovanie http requestu. nakoniec otestuj jeho status kód
// a niektoré atribúty vytvorenej karty
it('vytvorenie karty', function() {

  cy.intercept('POST', '/api/cards')
    .as('createCardCard')


  cy.visit(`/board/${this.boardId}`)

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('karta{enter}')

  cy.wait('@createCardCard')
    .then( ({request, response}) => {

       expect(request.body).to.have.property('boardId').and.eq(1)
       expect(response.body).to.have.property('name')
       expect(response.body.description).to.be.empty

    })
  
});

// #2: zaškrtni vytvorenú kartu pomocou UI a použi .intercept() príkaz
// na odsledovanie http requestu. nakoniec otestuj jeho status kód
it('zaškrtnutie karty', function() {

  cy.intercept('PATCH', '/api/cards/1')
    .as('checkbox')

  cy.visit(`/board/${this.boardId}`)
  
  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('mlieko{enter}')

  cy.get('[data-cy="card-checkbox"]')
    .check()

  cy.wait('@checkbox')
    .its('response.statusCode')
    .should('eq', 200)

});

// #3: over si, že pri vytvorení nového listu sa
// na server odošle boardId
it('vytvorenie nového zoznamu', function() {

  cy.visit(`/board/${this.boardId}`)

  cy.get('[data-cy="create-list"]')
    .click()

  cy.get('[data-cy="add-list-input"]')
    .type('list 2{enter}')
  
});

// #4: odstráň list a over si, že sa zo servera vrátil správny status kód
it.only('odstránenie listu', function() {

  cy.intercept('DELETE', '/api/lists/*')
    .as('deleteList')

  cy.visit(`/board/${this.boardId}`)

  cy.get('[data-cy="create-list"]')
    .click()

  cy.get('[data-cy="add-list-input"]')
    .type('list 3{enter}')

 // cy.request('DELETE', '/api/lists/*')

  cy.wait('@deleteList')
    .its('response.statusCode')
    .should('eq', 200)

});