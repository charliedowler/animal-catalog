import { gql, useQuery } from '@apollo/client';
export const GET_ANIMALS = gql`
  query GetAnimals {
    animals {
      id
      type
      name
      carnivore
      extinct
      image
    }
  }
`;

export const useAnimals = () => {
  const { loading, error, data } = useQuery(GET_ANIMALS);

  return { loading, error, data }
}