import '../../workshop-scripts/testSetupHook'
import '../../workshop-scripts/infoCommand'

import "cypress-real-events/support";

Cypress.Commands.add('dataCy', (selector) => {

  cy.get(`[data-cy=${selector}]`)

})