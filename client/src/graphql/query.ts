import { gql } from "@apollo/client";

export const LIST_POKEMONS = gql`
  query ListPokemon($limit: Int!, $offset: Int!) {
    listPokemons(limit: $limit, offset: $offset) {
      id
    }
  }
`;
