it('Contains Create Game button', () => {
  // Holy shit this works so well.
  cy.visit('/');
  cy.get('button:contains("Create Game")').click();

  cy.get('.game-state-container').contains('Players Count 0');

  cy.get('button:contains("Add Player")').click().click().click();

  cy.get('.player-gen-container>button:contains("Join")').click({ multiple: true });

  cy.get('.game-state-container').contains('Players Count 3')
  cy.get('.game-state-container').contains('Game State: pregame');

  cy.get('button:contains("Start Game")').click();

});
