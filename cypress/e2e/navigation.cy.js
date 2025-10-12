describe('Main navigation links', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates through top-level pages', () => {
    const links = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about/' },
      { label: 'Contact', path: '/contact/' },
      { label: 'Blog', path: '/blog/' },
      { label: 'Presentations', path: '/talks/' },
    ];

    links.forEach(({ label, path }) => {
      cy.contains('nav a', label)
        .should('have.attr', 'href', path)
        .click();

      cy.location('pathname').should('eq', path);
      cy.get('main').should('be.visible');
    });
  });
});
