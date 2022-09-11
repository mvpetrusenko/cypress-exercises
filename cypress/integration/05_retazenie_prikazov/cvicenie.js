/// <reference types="cypress" />

// ⚠️ databáza je v tomto teste naplnená dátami pred každým testom
// ⚠️ do niektorých testov som pridal "zákerný kód", ktorý spôsobí pomalé načítavanie niektorých elementov
import { cardsLoadRandomly, cardsLoadSlowly } from '../../../workshop-scripts/evilCode'

// #1: v teste máme dve overenia. jedno z nich prechádza, no druhé nie
// skús zmeniť reťaz príkazov tak, aby sa .contains() príkaz stal child
// príkazom a test nám prešiel
it('overenie textov kariet', () => {

  cy.visit('/board/123456789')

  cy.contains('[data-cy=card]', 'Feb 14 2022')
    .should('contain.text', 'Bread')

  cy.get(':nth-child(2) > [data-cy="list"]')
    .contains('[data-cy=card]', 'Feb 14 2022')
    .should('contain.text', 'Shampoo')

})

// #2: keď si spustíš tento test niekoľko krát, zistíš, že nám nie vždy prechádza
// pomocou timeliny a konzoly zdiagnostikuj, čo nám vracajú jednotlivé príkazy
// a zmeň test tak, aby bol stabilný
it('overenie textu karty', () => {

  //  zákerný kód
  cardsLoadRandomly(3000)

  cy.visit('/board/123456789')

  cy.get('[data-cy=card-text]')
    .eq(1)
    .should('contain.text', 'Soap')

})

// #3: tento test padá, pretože odpoveď zo servra prichádza príliš neskoro
// zmeň timeout tak, aby test začal prechádzať
it('na stránke je 5 kariet', () => {

  //  zákerný kód
  cardsLoadSlowly(6000) 

  cy.visit('/board/123456789')

  cy.wait(6000)

  cy.get('[data-cy=card-text]')
    .should('have.length', 5)
  
});

// #4: reťaz v tomto príkaze je zbytočne dlhá. navyše spôsobuje, že test je nestabilný
// pomocou konzoly zdiagnostikuj, čo nám vracajú jednotlivé príkazy
// a odstráň z testu príkazy, ktoré nie sú v teste potrebné
it.only('pridlhá reťaz príkazov', () => {

  //  zákerný kód
  cardsLoadRandomly(3000)

  cy.visit('/board/123456789')

  cy.get('[data-cy=list]')
    .first()
    //.find('[data-cy=card-list]')
    .contains('[data-cy=card]', 'Feb 14 2022')
    .find('[data-cy=card-text]')
    //.eq(0)
    .should('contain.text', 'Bread')
  
});