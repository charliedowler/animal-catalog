const store = require('../store')

module.exports = {
  animals: () => store.getAnimals(),
}