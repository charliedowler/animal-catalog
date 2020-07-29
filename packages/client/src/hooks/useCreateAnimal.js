import { gql, useMutation } from '@apollo/client';
import { GET_ANIMALS } from './useAnimals';


const CREATE_ANIMAL = gql`
  mutation CreateAnimal($id: String!, $name: String, $type: String, $extinct: Boolean, $carnivore: Boolean, $image: String) {
    createAnimal(id: $id, name: $name, type: $type, extinct: $extinct, carnivore: $carnivore, image: $image) {
      id
      name
      type
      extinct
      carnivore
      image
    }
  }
`;

export const useCreateAnimal = () => {
  const [createAnimal, { loading: creating }] = useMutation(CREATE_ANIMAL);

  return [creating, formData => {
    return createAnimal({
      variables: {
        ...formData
      },
      update: (store, { data: { createAnimal } }) => {
        const data = store.readQuery({ query: GET_ANIMALS });
        const animals = [...data.animals, createAnimal];
        store.writeQuery({
          query: GET_ANIMALS, data: { animals }
        });
      }
    })
  }]
}