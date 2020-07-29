import { gql, useMutation } from '@apollo/client';
import { GET_ANIMALS } from './useAnimals';

const REMOVE_ANIMAL = gql`
  mutation RemoveAnimal($id: String!) {
    deleteAnimal(id: $id) {
      id
    }
  }
`;

export const useDeleteAnimal = id => {
  const [deleteAnimal, { loading: deleting }] = useMutation(REMOVE_ANIMAL);
  return [deleting, () => {
    deleteAnimal({
      variables: {
        id
      },
      refetchQueries: [{
        query: GET_ANIMALS
      }],
    })
  }]
}