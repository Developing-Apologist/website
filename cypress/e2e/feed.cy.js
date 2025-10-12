describe('RSS feed', () => {
  it('returns valid XML at /feed.xml', () => {
    cy.request('/feed.xml').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('xml');
      expect(response.body).to.include('<rss');
      expect(response.body).to.include('<channel>');
    });
  });
});
