/// <reference types="cypress" />
// ⚠️ databáza je v tomto teste naplnená dátami pred každým testom

// #1: použi funkciu invoke na overenie textu v dátume 
it('kartička má mesiac textom Mar', () => {

  cy.visit('/board/123456789')

  cy.get('[data-cy=due-date]')
    .eq(0)
    .invoke('text')
    .should('eq', 'Mar 01 2022')

});

// #2: v nasledujúcom teste robíme screenshot našej aplikácie
// pomocou funkcie .invoke() chceme schovať všetky texty, aby
// ostali dáta v našej aplikácii ochránené
it('anonymizácia dát v kartičkách', () => {

  cy.visit('/board/123456789')

  cy.get('[data-cy=card-text], [data-cy=due-date]')
    .invoke('text', '***')

  cy.screenshot()

})

// #3: na stránke sú ikonky, ktoré sa zobrazia iba pri hoveri
// chceme ich zachytiť v screenshote, preto ich pomocou 
// funkcie .invoke() zobraz na stránke
it('zobrazenie skrytých ikoniek', () => {

  cy.visit('/board/123456789')

  cy.get('[data-cy=card-edit]')
    .invoke('show')
    
  cy.screenshot()
  
});

// #4: premenuj board tak, že doňho vložíš text funkciou .invoke()
it('premenovanie boardu', () => {

  cy.visit('/board/123456789')

  cy.get('[data-cy=board-title]')
    .invoke('val', 'smallname')
  
});


// #5: vyskúšaj si upload súboru pomocou .selectFile() príkazu
// súbor nahraj do dropzóny
it.only('upload súboru', () => {

  cy.visit('/board/123456789?card=77958252506')

  cy.get('[type="file"]')
    .invoke('show')
    .selectFile('cypress/fixtures/cypress_logo.png')

})

