it('Contains Create Game button', () => {
  // Holy shit this works so well.
  cy.visit('/');
  const createGameButton = cy.get('button:contains("Create Game")');
  createGameButton.click();
  const addPlayerButton = cy.get('button:contains("Add Player")');
  addPlayerButton.click();
  addPlayerButton.click();
  addPlayerButton.click();

});
