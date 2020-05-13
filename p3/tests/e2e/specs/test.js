describe('My Recipe Book', () => {
  it('shows all the recipes', () => {
    cy.visit('/')
    cy.get('.recipe-card').should('have.length.at.least', 4);
  });

  it('can navigate to an individual recipe', () => {
    cy.visit('/');

    // Click the first recipe
    cy.get('.recipe-card-recipe-name').first().click();

    // Make sure the recipe details are displayed
    cy.get('h1').should('have.text', 'Broccoli Beer Cheese Soup');
    cy.get('img').should('exist');
    cy.get('.ingredient').should('have.length', 13);
    cy.get('.direction').should('have.length', 6);
  });

  it('can add/remove a recipe to/from favorites', () => {
    cy.visit('/');

    // Click "Add to Favorites" link on first recipe
    cy.get('.recipe-card-add-remove-favorite a').first().click();

    // Navigate to the Favorites page and make sure it shows the recipe
    cy.get('nav a[href="/favorites"]').click();
    cy.location().should(location => expect(location.pathname).to.equal('/favorites'));
    cy.get('.recipe-card').should('have.length', 1);
    cy.get('.recipe-card-recipe-name').should('have.text', 'Broccoli Beer Cheese Soup');

    // Navigate back to the Recipes page and remove the favorite
    cy.get('nav a[href="/"]').click();
    cy.location().should(location => expect(location.pathname).to.equal('/'));
    cy.get('.recipe-card-add-remove-favorite a').first().click();

    // Navigate to the Favorites page and make sure it no longer shows the recipe
    cy.get('nav a[href="/favorites"]').click();
    cy.location().should(location => expect(location.pathname).to.equal('/favorites'));
    cy.get('.recipe-card').should('not.exist');
  });

  it('can add a new recipe', () => {
    cy.visit('/');

    cy.get('.recipe-card').then(recipes => {
      const recipeCount = recipes.length;

      // Click "Add a Recipe" button
      cy.get('#add-recipe-container button').click();

      // Fill out the form
      cy.get('label').contains('Name').first().within(() => cy.get('input')).type('Tacos');
      cy.get('label').contains('Image URL').within(() => cy.get('input')).type('https://images-gmi-pmc.edge-generalmills.com/287350ad-0c09-4d72-be5b-b7505b2cba80.jpg');
      cy.get('.ingredient-container').first().within(() => cy.get('input').eq(0)).type('1 lb');
      cy.get('.ingredient-container').first().within(() => cy.get('input').eq(1)).type('ground beef');
      cy.get('.step-container').first().within(() => cy.get('input')).type('Cook the beef.');

      // Save the recipe
      cy.get('input[value="Save Recipe"]').click();

      // Make sure the new recipe showed up
      cy.get('.recipe-card').should('have.length', recipeCount + 1);
    })
  });

  it('can add/remove an ingredient to/from the shopping list', () => {
    cy.visit('/');

    // Click the first recipe
    cy.get('.recipe-card-recipe-name').first().click();

    // Add the first ingredient to the shopping list
    cy.get('.ingredient a').first().click();

    // Navigate to the Shopping List page
    cy.get('nav a[href="/shopping-list"]').click();

    // Make sure the ingredient showed up on the shopping list
    cy.get('.shopping-list-item').should('have.length', 1);
    cy.get('.shopping-list-item-description').first().should('have.text', 'butter');
  });
});
