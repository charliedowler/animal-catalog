const selectors = require('../selectors')

context('Read Animal', () => {
  beforeEach(() => {
    cy.request('http://localhost:3000/reset')
    cy.visit('http://localhost:3000')
    cy.server()
    cy.route({
      url: '/graphql*',
      method: 'POST'
    }).as('updateAnimal')
  })
  it('should be able to change the animal name from "Turtle" to "Dog"', () => {
    const turtleSelector = '[data-id="f74ddccf-9f42-4fe5-8232-6224059ea92c"]'
    cy.get(turtleSelector)

    cy.contains('Turtle')
    cy.get(`${turtleSelector} #edit`).click()
    cy.get(selectors.nameInput).clear().type('Dog{enter}')
    cy.wait('@updateAnimal')
    cy.get(`${turtleSelector} .header`).contains('Dog')
  })
  it('should be able to change the animal type from "Fish" to "Mammel"', () => {
    const clownFishSelector = '[data-id="f71651f3-0370-4220-aeb4-9c479ebf8e99"]'
    cy.get(`${clownFishSelector} #edit`).click()
    cy.get(selectors.typeSelector).click()
    cy.get(`${clownFishSelector} .item`).first().click()
    cy.get(selectors.saveButton).click()
    cy.wait('@updateAnimal')
    cy.get(clownFishSelector).contains('Mammal')
  })
  it('should be able to change the animal type from "Extinct" to "Not extinct"', () => {
    const clownFishSelector = '[data-id="f71651f3-0370-4220-aeb4-9c479ebf8e99"]'
    cy.get(`${clownFishSelector} #edit`).click()
    cy.get('[data-id="f71651f3-0370-4220-aeb4-9c479ebf8e99"]').contains('Extinct')
    cy.get(selectors.extinctCheckbox).click()
    cy.get(selectors.saveButton).click()
    cy.wait('@updateAnimal')
    cy.get(clownFishSelector).contains('Still around')
  })
  it('should be able to change the animal type from "Carnivore" to "Herbivore"', () => {
    const clownFishSelector = '[data-id="f71651f3-0370-4220-aeb4-9c479ebf8e99"]'
    cy.get(`${clownFishSelector} #edit`).click()
    cy.get('[data-id="f71651f3-0370-4220-aeb4-9c479ebf8e99"]').contains('Extinct')
    cy.get(selectors.carnivoreCheckbox).click()
    cy.get(selectors.saveButton).click()
    cy.wait('@updateAnimal')
    cy.get(clownFishSelector).contains('Herbivore')
  })
})