const { gql } = require('apollo-server');

module.exports = gql`
  type Animal {
    id: String
    type: String
    carnivore: Boolean
    name: String
    extinct: Boolean
    image: String
  }
  type Query {
    animals: [Animal]
  }
  type Mutation {
    deleteAnimal(id: String): Animal
    updateAnimal(id: String, name: String, type: String, carnivore: Boolean, extinct: Boolean, image: String): Animal
    createAnimal(id: String, name: String, type: String, carnivore: Boolean, extinct: Boolean, image: String): Animal
  }
`;