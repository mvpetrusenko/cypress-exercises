it('otvorenie aplikacie', () => {

  // challenge #1: otvor hlavnú stránku. môžeš použiť celú adresu alebo iba jej časť
  //👇 napíš príkaz pod tento riadok 👇
  cy.visit('/')
  // challenge #2: otvor board detail. je to tá stránka, ktorú vidíš keď klikneš na hlavnej stránke na board. ak žiaden nemáš, najprv si ho vytvor
  //👇 napíš príkaz pod tento riadok 👇
  cy.visit('/board/5831972353')
  // challenge #3: vytvor si na boarde zoznam (list) a kartu. rozklikni si detail karty. sleduj ako sa zmení url. skús si túto lokalitu otvoriť pomocou príkazu .visit()
  //👇 napíš príkaz pod tento riadok 👇
  cy.visit('/board/5831972353?card=47000114014')
  // 💯 extra challenge: poznáš query parametre? ide o časť url, ktorá nasleduje po znaku "?" skús nahliadnúť do dokumentácie a nájsť iný spôsob ako môžeš otvoriť detail karty v našej aplikácii
  // 📚 https://docs.cypress.io/api/commands/visit#Add-query-paramaters
  //👇 napíš príkaz pod tento riadok 👇
  cy.visit('/board/5831972353', {
    qs: {
      card: '47000114014'
    }
  })
});