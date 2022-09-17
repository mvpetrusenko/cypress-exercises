/// <reference types="cypress" />

// #1: nainštaluj si cypress-real-events plugin
// pomocou ktorého môžeš simulovať eventy ako sú hover
// swipe a podobne. pomocou tohto pluginu nasimuluj
// hover nad board elementom a klikni na hviezdičku
it('bookmarknutie boardu', () => {

  cy.visit('/')

  cy.request('POST', '/api/boards', {name: 'boardForHover'})

  cy.get('[data-cy="board-item"]').realHover()
  cy.get('.star').realClick()
    
});