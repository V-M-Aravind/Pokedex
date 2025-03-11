import React from "react";
import { LIST_POKEMONS } from "../graphql/query";
import { useQuery } from "@apollo/client";

const Home = () => {
  const { loading, error, data } = useQuery(LIST_POKEMONS, {
    variables: {
      limit: 20,
      offset: 20,
    },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <ul>
      {data.listPokemons.map((pokemon) => (
        <li key={pokemon.id}>{pokemon.id}</li>
      ))}
    </ul>
  );
};

export default Home;
