/// <reference types="cypress" />
/*
  ⚠️ vytvor si nový board a vypracuj nasledujúce úlohy
  pomocou .only si môžeš spustiť jeden test
  ℹ️ medzi jednotlivými stavmi si budeš musieť aplikáciu vrátiť do pôvodného stavu
  pomocou klávesy F2 si otvor nástroje, ktoré Ti s tým pomôžu
*/

beforeEach( () => {

  cy
    .visit('http://localhost:3000/'); // ⚠️ pridaj adresu k svojmu boardu

  cy.get('[data-cy="create-board"] > h1')
    .click();

  cy.get('[data-cy="new-board-input"]')
    .type('enjoy{enter}');

  cy.get('[data-cy="add-list-input"]')
    .type('listnew{enter}');

})

// #1: vytvor nový zoznam a over, že je viditeľný
it('vytvorenie zoznamu', () => {



  cy.get('[data-cy="list"]')
    .should('be.visible');


})

// #2: vytvor si ešte jeden zoznam a over, že sú na stránke dva
 it('overenie počtu zoznamov', () => {



  cy.get('[data-cy="list"]')
    .should('be.visible');

   cy.get('[data-cy="add-list-input"]')
    .type('list2{enter}');

   cy.get('[data-cy="list"]')
    .should('have.length', 2);

})



// #3: začni tento test s jediným zoznamom na stránke. odstráň ho a over si, že naozaj zmizol
 it('odstránenie zoznamu', () => {



 cy.get('[data-cy="list"]')
    .should('be.visible');

 cy.get('[data-cy="list-options"] > .inline-block > path')
   .click();

 cy.get('[data-cy="delete-list"]')
   .click();

 cy.get('[data-cy="list"]')
   .should('not.exist');

})

// #4: vytvor si zoznam a kartu. na kartu klikni a over si, že sa Ti otvoril detail karty
it('overenie zobrazenia detailu karty', () => {

  cy.get('[data-cy="new-card"]').click();
  cy.get('[data-cy="new-card-input"]').type('newnewcard{enter}');
  cy.get('[data-cy="card"]').click();
  cy.get('[data-cy="card-detail"]').should('be.visible');

})

// #5: otvor si detail karty a opäť ho zavri. over si, že detail karty zo stránky zmizol
it.only('zatvorenie detailu karty', () => {

  cy.get('[data-cy="new-card"]').click();
  cy.get('[data-cy="new-card-input"]').type('newnewcard{enter}');
  cy.get('[data-cy="card"]').click();
  cy.get('[data-cy="card-detail"]').should('be.visible');
  cy.get('[data-cy="cancel"]').click();
  cy.get('[data-cy="card-detail"]').should('not.exist');

})

