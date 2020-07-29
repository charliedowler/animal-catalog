const store = require('../store')
const getImage = require('../util/getImage')

module.exports = {
  deleteAnimal: (_, { id }) => {
    const result = store.getAnimals().filter(animal => animal.id !== id)
    store.updateAnimals(result)
    return true
  },
  createAnimal: async (_, animal) => {
    const result = {
      ...animal,
      image: await getImage(animal.name)
    }
    store.updateAnimals([...store.getAnimals(), result])
    return result
  },
  updateAnimal: async (_, updatedAnimal) => {
    let modifiedAnimal = null
    const animalList = store.getAnimals()
    let nextAnimalCollection = await Promise.all(animalList.map(async animal => {
      if (animal.id === updatedAnimal.id) {
        const nextAnimal = {
          ...animal,
          ...updatedAnimal
        }
        modifiedAnimal = {
          ...nextAnimal,
          image: await getImage(nextAnimal.name)
        }
        return modifiedAnimal
      }
      return animal
    }))
    store.updateAnimals(nextAnimalCollection)
    return modifiedAnimal
  }
}