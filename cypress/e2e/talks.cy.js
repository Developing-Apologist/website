describe('Talks page functionality', () => {
  beforeEach(() => {
    cy.visit('/talks/');
  });

  it('displays talks grid and filters them via search', () => {
    cy.get('#talks-grid article').should(($cards) => {
      expect($cards.length).to.be.greaterThan(0);
    });

    cy.get('input#talks-search-input')
      .should('have.attr', 'data-search-target', '.talk-card')
      .clear()
      .type('hello world');

    cy.wait(200);

    cy.get('#talks-grid article').then(($cards) => {
      const visibleCards = Array.from($cards).filter((card) => !card.classList.contains('hidden'));
      expect(visibleCards.length).to.be.greaterThan(0);
      visibleCards.forEach((card) => {
        expect(card.textContent.toLowerCase()).to.include('hello world');
      });
    });

    cy.get('input#talks-search-input').clear();
    cy.wait(200);
    cy.get('#talks-grid article').then(($cards) => {
      const visibleCards = Array.from($cards).filter((card) => !card.classList.contains('hidden'));
      expect(visibleCards.length).to.be.greaterThan(0);
    });
  });

  it('navigates to linked blog posts from talks data', () => {
    cy.get('#talks-grid article a[href^="/blog/"]')
      .first()
      .should('be.visible')
      .then(($link) => {
        const href = $link.attr('href');
        cy.wrap($link).scrollIntoView().should('be.visible').click({ force: true });
        cy.location('pathname').should('eq', href);
      });
  });
});
