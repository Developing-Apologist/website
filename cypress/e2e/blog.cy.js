describe('Blog page functionality', () => {
  beforeEach(() => {
    cy.visit('/blog/');
  });

  it('displays posts and filters via search', () => {
    cy.get('#posts-grid article').should(($cards) => {
      expect($cards.length).to.be.greaterThan(0);
    });

    cy.get('input#search-input').should('exist').clear().type('apologetics');

    cy.get('#posts-grid article:not(.hidden)').should(($visibleCards) => {
      expect($visibleCards.length).to.be.greaterThan(0);
      $visibleCards.each((_, card) => {
        expect(card.textContent.toLowerCase()).to.include('apologetics');
      });
    });

    cy.get('input#search-input').clear();
    cy.get('#posts-grid article:not(.hidden)').should(($cards) => {
      expect($cards.length).to.be.greaterThan(0);
    });
  });

  it('navigates to a blog post and displays discord comments component', () => {
    cy.get('#posts-grid article a').first().click();
    cy.location('pathname').should('match', /\/blog\/.+/);
    cy.get('.discord-comments-container').should('exist');
  });
});
