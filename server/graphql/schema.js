import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
} from "graphql";
import pokemonList from "../output.json" assert { type: "json" };

// Define the Ability type
const AbilityType = new GraphQLObjectType({
  name: "Ability",
  fields: {
    isHidden: { type: GraphQLBoolean },
    name: { type: GraphQLString },
  },
});

// Define the Stats type
const StatsType = new GraphQLObjectType({
  name: "Stats",
  fields: {
    hp: { type: GraphQLInt },
    attack: { type: GraphQLInt },
    defense: { type: GraphQLInt },
    specialAttack: { type: GraphQLInt },
    specialDefense: { type: GraphQLInt },
    speed: { type: GraphQLInt },
  },
});

// Define the Cries type
const CriesType = new GraphQLObjectType({
  name: "Cries",
  fields: {
    latest: { type: GraphQLString },
    legacy: { type: GraphQLString },
  },
});

// Define the Images type
const ImagesType = new GraphQLObjectType({
  name: "Images",
  fields: {
    image_default: { type: GraphQLString },
    smallImage: { type: GraphQLString },
  },
});

// Define the Pokemon type
const PokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: {
    id: { type: GraphQLID },
    baseExperience: { type: GraphQLInt },
    cries: { type: CriesType },
    height: { type: GraphQLInt },
    locationAreaEncounters: { type: GraphQLString },
    name: { type: GraphQLString },
    weight: { type: GraphQLInt },
    stats: { type: StatsType },
    moves: { type: new GraphQLList(GraphQLString) },
    images: { type: ImagesType },
    types: { type: new GraphQLList(GraphQLString) },
    abilities: { type: new GraphQLList(AbilityType) },
  },
});

// Define the Query type
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getPokemon: {
      type: PokemonType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const data = pokemonList.find((d) => d.id === +args.id);
        return data;
      },
    },
    listPokemons: {
      type: new GraphQLList(PokemonType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      resolve(parent, args, context, resolveInfo) {
        // Here you would fetch a list of Pokémon data from your data source
        // Example response:
        console.log(
          args,
          JSON.stringify(resolveInfo.fieldNodes[0].selectionSet)
        );
        return pokemonList;
        // Add more Pokémon data here as needed
      },
    },
  },
});

// Create the schema
const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
