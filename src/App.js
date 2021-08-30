import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import GlobalStyles from "./components/GlobalStyles";
import PokeCard from "./components/PokeCard";

const Container = styled.div`
  width: 1024px;
  height: max-content;
  padding: 2rem;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: var(--h1-font-size);
  text-align: center;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const getPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return axios.get(url).then((res) => res.data);
};

const buildPokemonArr = async () => {
  let pokemonArr = [];
  for (let i = 0; i < 18; i += 1) {
    pokemonArr = [...pokemonArr, await getPokemon(i + 1)];
  }
  pokemonArr.map((pokemon) => {
    pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    return pokemon;
  });
  return pokemonArr;
};

const App = () => {
  const [pokemonArr, setPokemonArr] = useState([]);

  useEffect(() => {
    buildPokemonArr().then((pokemonArr) => {
      setPokemonArr(pokemonArr);
    });
  }, []);

  return (
    <Container>
      <GlobalStyles />
      <Title>Pokemon</Title>
      <Main>
        {pokemonArr.map((pokemon, index) => (
          <PokeCard key={index} pokemon={pokemon}>
            {pokemon.name}
          </PokeCard>
        ))}
      </Main>
    </Container>
  );
};

export default App;
