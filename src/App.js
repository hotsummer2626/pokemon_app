import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import GlobalStyles from "./components/GlobalStyles";
import PokeCard from "./components/PokeCard";
import { TYPECOLOR, TYPEICON } from "./constant/type";
import { mediaQueries } from "./mediaQueries";
import Loading from "./components/Loading";

const Container = styled.div`
  max-width: 1024px;
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

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const IconWrapper = styled.div`
  width: ${({ type }) => (type !== "All" ? "max-content" : "100px")};
  padding: 5px;
  margin: 5px;
  border: 2px solid ${({ type }) => TYPECOLOR[type]};
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;
const IconImg = styled.img`
  width: 30px;
  margin-right: 5px;
  ${mediaQueries("xs")`
    width: 20px;
  `}
`;
const IconText = styled.span`
  font-weight: 600;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  ${mediaQueries("xs")`
    grid-template-columns: 1fr
  `}
`;

const getPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return axios.get(url).then((res) => res.data);
};

const buildPokemonArr = async () => {
  let pokemonArr = [];
  for (let i = 0; i < 50; i += 1) {
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
  const [selectedPokemonList, setSelectedPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buildPokemonArr().then((pokemonArr) => {
      setPokemonArr(pokemonArr);
      setSelectedPokemonList(pokemonArr);
      setLoading(false);
    });
  }, []);

  const getSelectedPokemonList = (type) => {
    const selectedPokemonList =
      type === "All"
        ? pokemonArr
        : pokemonArr.filter((pokemon) => {
            let typeList = [];
            for (const { type } of pokemon.types) {
              typeList = [...typeList, type.name];
            }
            return typeList.includes(type);
          });
    setSelectedPokemonList(selectedPokemonList);
  };

  return (
    <Container>
      <GlobalStyles />
      <Title>Pokemon</Title>
      <IconContainer>
        {[{ text: "All" }, ...TYPEICON].map((icon) => {
          return (
            <IconWrapper
              key={icon.text}
              type={icon.text}
              onClick={() => {
                getSelectedPokemonList(icon.text);
              }}
            >
              {icon.alt && <IconImg alt={icon.alt} src={icon.src} />}
              <IconText>{icon.text}</IconText>
            </IconWrapper>
          );
        })}
      </IconContainer>
      {loading ? (
        <Loading />
      ) : (
        <Main>
          {selectedPokemonList.map((pokemon, index) => (
            <PokeCard key={index} pokemon={pokemon}>
              {pokemon.name}
            </PokeCard>
          ))}
        </Main>
      )}
    </Container>
  );
};

export default App;
