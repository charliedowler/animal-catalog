const getImage = require('../util/getImage')

let animals
let originalAnimals
(async () => {
  animals = await Promise.all([
    {
      id: '2d45c199-e84b-4004-83b8-4e9c5ba751d2',
      type: 'Mammal',
      name: 'Blue Whale',
      carnivore: true,
      extinct: false
    },
    {
      id: 'f74ddccf-9f42-4fe5-8232-6224059ea92c',
      type: 'Reptile',
      carnivore: false,
      name: 'Turtle',
      extinct: false
    },
    {
      id: 'f71651f3-0370-4220-aeb4-9c479ebf8e99',
      type: 'Fish',
      carnivore: true,
      name: 'Clown fish',
      extinct: true
    },
    {
      id: 'f2fb2e7d-cf43-4322-b354-3b9b911cf308',
      type: 'Amphibious',
      carnivore: true,
      name: 'Frog',
      extinct: false
    }
  ].map(async animal => {
    return {
      ...animal,
      image: await getImage(animal.name)
    }
  }))
  originalAnimals = [...animals]
})()

module.exports = {
  getAnimals() {
    return animals
  },
  updateAnimals(data) {
    animals = data
  },
  reset() {
    animals = originalAnimals
  }
}