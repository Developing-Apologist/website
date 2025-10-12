describe('Home page content', () => {
  beforeEach(() => {
    cy.visit('/', {
      timeout: 60000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true,
    });
  });

  it('displays hero content and navigation links', () => {
    cy.contains('The Developing Apologist').should('be.visible');
    cy.contains('nav a', 'Blog').should('have.attr', 'href', '/blog/');
    cy.contains('nav a', 'Presentations').should('have.attr', 'href', '/talks/');
  });

  it('contains developer-focused sections', () => {
    cy.contains('The Developing Apologist').scrollIntoView();
    cy.contains('Why Apologetics for Developers', { timeout: 10000 }).should('exist');
    cy.contains('Developer-Focused Content', { timeout: 10000 }).should('exist');
  });
});
