import { gql, useMutation } from '@apollo/client';
import { GET_ANIMALS } from './useAnimals';


const UPDATE_ANIMAL = gql`
  mutation UpdateAnimal($id: String!, $name: String, $type: String, $extinct: Boolean, $carnivore: Boolean, $image: String) {
    updateAnimal(id: $id, name: $name, type: $type, extinct: $extinct, carnivore: $carnivore, image: $image) {
      id
      name
      type
      extinct
      carnivore
      image
    }
  }
`;

export const useUpdateAnimal = () => {
  const [updateAnimal, { loading: updating }] = useMutation(UPDATE_ANIMAL);

  return [updating, formData => {
    return updateAnimal({
      variables: {
        ...formData
      },
      update: (store, { data: { updateAnimal } }) => {
        const data = store.readQuery({ query: GET_ANIMALS });
        const animals = data.animals.map(animal => {
          if (animal.id === updateAnimal.id) {
            return {
              ...animal,
              ...updateAnimal
            }
          }
          return animal
        })
        store.writeQuery({
          query: GET_ANIMALS, data: { animals }
        });
      }
    })
  }]
}