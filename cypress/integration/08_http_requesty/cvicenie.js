/// <reference types="cypress" />

// #1: nastav si test tak, aby sa pred každým testom zresetovali dáta
beforeEach( () => {
  cy.visit('http://localhost:3000/');

  cy.request('POST', '/api/reset')
    .its('status')
    .should('eq', 204)

})

// #2: vytvor si nový board pomocou API. over si, že príkaz created
// nám vráti string
it('dátum vytvorenia vytvoreného boardu je string', () => {

  cy.request({
     method: 'POST',
     url: '/api/boards',
     body: {
       name: 'board via API'
     }
  }).then( (mychecking) => {

        expect(mychecking.body.created).to.be.a('string')

  })

  cy.visit('/')

});

// #3: urob dva requesty. prvým si vytvor board a druhým si 
// over počet boardov vo svojej aplikácii
it('api vracia správny počet boardov', () => {

  cy.request({
     method: 'POST',
     url: '/api/boards',
     body: {
       name: 'first board'
     }
  });

  cy.get('[data-cy="board-item"]')
    .should('have.length', 1);

  cy.visit('/')


});

// #4: vytvor si pomocou requestu board a list. príkaz .request()
// pre vytvorenie nového listu budeš musieť vnoriť do príkazu .then()
it.only('vytvorenie listu', () => {

  cy.request({
     method: 'POST',
     url: '/api/boards',
     body: {
       name: 'happy board'
     }
  });

  cy.request({

    method: 'GET',
    url: '/api/lists?boardId=1'

  });

  cy.request({

    method: 'POST',
    url: '/api/lists',
    body: {

    boardId: '1',
    name: 'qqqq'

    }

  });
  
});

// 💯 extra challege: použi query parameter, pomocou ktorého 
// si z API načítaš iba ohviezdičkované boardy (tie, ktore majú 
// atribút starred: true) ak si taký board v rámci testu 
// neohviezdičkuješ, vráti sa Ti prázdny zoznam
it('filtrovanie boardov', () => {
  
});