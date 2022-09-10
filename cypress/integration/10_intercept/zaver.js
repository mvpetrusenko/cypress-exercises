/// <reference types="cypress" />

it('vytvorenie novej karty', () => {

  cy.intercept({
    method: 'POST',
    url: '/api/cards'
  }).as('createCard')

  cy.visit('/board/123456789')

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('mlieko{enter}')

  cy.wait('@createCard')
    .then( ({ request, response }) => {
      expect(request.body).to.have.property('order').and.eq(0)
      expect(response.body).to.have.property('deadline')
      expect(response.body.description).to.be.empty
    })
  
});

it('board neobsahuje listy', () => {

  cy.intercept({
    method: 'GET',
    url: /lists/
  }).as('lists')

  cy.visit('/board/123456789')

  cy.wait('@lists')

  cy.get('[data-cy=list]')
    .should('have.length', 1)
  
});

it('odstránenie listu', () => {

  cy.visit('/board/123456789')

  cy.intercept('DELETE', '/api/lists/*')
    .as('deleteList')

  cy.get('[data-cy="list-options"]')
    .click()

  cy.get('[data-cy="delete-list"]')
    .click()

  cy.wait('@deleteList')
    .its('response.statusCode')
    .should('eq', 200)
  
});