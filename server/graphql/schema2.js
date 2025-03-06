import { buildSchema } from "graphql";

const schema = buildSchema(`
  # Define the Ability type
type Ability {
  isHidden: Boolean!
  name: String!
}

# Define the Stats type
type Stats {
  hp: Int!
  attack: Int!
  defense: Int!
  specialAttack: Int!
  specialDefense: Int!
  speed: Int!
}

# Define the Cries type
type Cries {
  latest: String
  legacy: String
}

# Define the Images type
type Images {
  imageDefault: String!
  smallImage: String!
}

# Define the Pokémon type
type Pokemon {
  id: ID!
  baseExperience: Int
  cries: Cries
  height: Int!
  locationAreaEncounters: String!
  name: String!
  weight: Int!
  stats: Stats!
  moves: [String!]!
  images: Images!
  types: [String!]!
  abilities: [Ability!]!
}

  type RootQuery {
  getPokemon(id: ID!): Pokemon
  listPokemons: [Pokemon!]!
}
  schema {
    query:RootQuery
  }

  `);

export default schema;
