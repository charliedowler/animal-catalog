context('Read Animal', () => {
  beforeEach(() => {
    cy.request('http://localhost:3000/reset')
    cy.visit('http://localhost:3000')
  })
  it('should display a list of 4 animals', () => {
    cy.get('.grid').children().should('have.length', 4)
  })
  it('should display a blue whale as the first animal', () => {
    const selector = '[data-id="2d45c199-e84b-4004-83b8-4e9c5ba751d2"]'
    cy.get(selector).contains('Still around')
    cy.get(selector).contains('Blue Whale')
    cy.get(selector).contains('Mammal')
    cy.get(selector).contains('Carnivorous')
  })
})