export const card = {
  creation(cardName = 'card for object') {
    cy.get('[data-cy="new-card"]')
      .click()
    cy.get('[data-cy="new-card-input"]')
      .type(`${cardName}{enter}`)

    return this
  },
  check(number = 0) {
    cy.get('[data-cy="card-checkbox"]')
      .eq(number)
      .check()
  },

  openDetail(number = 0) {
    cy.get('[data-cy="card"]')
      .eq(number)
      .click()
  }
}