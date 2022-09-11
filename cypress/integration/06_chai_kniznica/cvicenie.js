/// <reference types="cypress" />
// ⚠️ databáza je v tomto teste naplnená dátami pred každým testom

beforeEach( () => {
  cy.visit('/board/123456789')
}) 
// #1: zrefaktoruj tento test tak, aby použil jediný .then prikaz
it('karty obsahujú správne texty', () => {

    cy.get('[data-cy=list]')
      .eq(0)
      .find('[data-cy=card-text]')
      .as('cards')

   cy
     .get('@cards')
     .then ( texts  => {
       expect(texts[0]).to.have.text('Milk')
       expect(texts[1]).to.have.text('Bread')
       expect(texts[2]).to.have.text('Juice')

     })


/*
    cy.get('@cards')
      .eq(0)
      .should('have.text', 'Milk')
  
    cy.get('@cards')
      .eq(1)
      .should('have.text', 'Bread')
    
    cy.get('@cards')
      .eq(2)
      .should('have.text', 'Juice')

*/

  })

// #2: zrefaktoruj tento test na kontrolu checkboxov tak, aby použil jediný .then prikaz
it('karty sú zašktrnuté', () => {

  cy.get('[data-cy=list]')
    .eq(0)
    .find('[data-cy=card-checkbox]')
    .as('card-checkboxes')

  cy.get('@card-checkboxes')
    .then ( checkboxes => {
       expect(checkboxes[0]).to.be.checked
       expect(checkboxes[2]).to.be.checked

    })


/*
  cy.get('@card-checkboxes')
    .eq(0)
    .should('be.checked')

  cy.get('@card-checkboxes')
    .eq(2)
    .should('be.checked')

*/

});

// #3: skontroluj počet zoznamov a ich názvy pomocou príkazu .then()
it('počet zoznamov a ich názvy', () => {

  cy
    .get('[data-cy="list"]')
    .then ( numberOfLists => {
      expect(numberOfLists).to.have.length(2)

    })

  cy
    .get('[data-cy="list-name"]')
    .then ( listnames => {
      expect(listnames[0]).to.have.value('Groceries')
      expect(listnames[1]).to.have.value('Drugstore')


    })

})

// #4: skontroluj viditeľnosť zoznamov pomocou príkaz .then() 
it.only('viditeľnosť zoznamov', () => {

  cy
    .get('[data-cy="list-name"]')
    .then ( listnames => {
      expect(listnames[1]).to.be.visible

    })

  
})