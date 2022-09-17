/// <reference types="cypress" />

import {board} from '../../support/pageObjects/board'
import {card} from '../../support/pageObjects/board'

beforeEach( () => {

  cy.request('POST', '/api/boards', { name: 'new board '})
    .its('body.id').as('boardId')
    .then( boardId => {
      cy.request('POST', '/api/lists', {
        name: 'new list',
        boardId
      })
    })

})

it('vytvorenie, odškrtnutie a otvorenie karty', function() {

  cy.visit(`/board/${this.boardId}`)

  card.creation()
      .check()
      .openDetail()
  
});