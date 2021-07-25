it('Contains Create Game button', () => {
  // Holy shit this works so well.
  cy.visit('/');

  cy.get('button:contains("Create Game")').click();

  const testId = 'test1'
  cy.request('http://localhost:8080/get-dev-game').then(resp => {
    const gameId = resp.body.gameId;
    cy.request('POST', 'http://localhost:8080/setup-test-hands', { gameId, testId });

    cy.get('.game-state-container').contains('Players Count 0');

    cy.get('button:contains("Add Player")').click().click().click();

    cy.get('.player-gen-container>button:contains("Join")').click({ multiple: true });

    cy.get('.game-state-container').contains('Players Count 3')
    cy.get('.game-state-container').contains('Game State: pregame');

    cy.get('button:contains("Start Game")').click();
    cy.get('.game-state-container').contains('Game State: preflop');
    cy.get('#player-0>button.fold-button').click();
    cy.get('#player-1>button.bet-button').click();
    // TODO - big blind needs an opportunity to raise!
    cy.get('.game-state-container').contains('Game State: flop');
    cy.get('#player-1>button.bet-button').click();
    cy.get('#player-2>button.bet-button').click();
    cy.get('.game-state-container').contains('Game State: turn');
    cy.get('#player-1>button.bet-button').click();
    cy.get('#player-2>button.bet-button').click();
    cy.get('.game-state-container').contains('Game State: river');
    cy.get('#player-1>button.bet-button').click();
    cy.get('#player-2>button.bet-button').click();
  });



});
