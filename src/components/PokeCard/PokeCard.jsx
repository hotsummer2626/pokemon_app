import React from "react";
import styled from "styled-components";

const color = {
  fire: "#f08030",
  grass: "#78c850",
  water: "#6890f0",
  ground: "#e0c068",
  rock: "#b8a038",
  fairy: "#ee99ac",
  poison: "#a040a0",
  bug: "#a8b820",
  dragon: "#7038f8",
  psychic: "#f85888",
  flying: "#f5f5f5",
  fighting: "#c03028",
  normal: "#a8a878",
  electric:'#f8d030',
  ghost:'#705898',
  ice:'#98d8d8'
};

const Container = styled.div`
  background-color: ${({ type }) => color[type]};
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
`;
const Img = styled.img`
  width: 90%;
`;
const Name = styled.h2`
  font-size: var(--h2-font-size);
`;
const Type = styled.p`
  font-size: var(--normal-font-size);
`;

const PokeCard = ({ pokemon }) => {
  return (
    <Container type={pokemon.types[0].type.name}>
      <ImgWrapper>
        <Img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        />
      </ImgWrapper>
      <Name>{pokemon.name}</Name>
      <Type>{pokemon.types[0].type.name}</Type>
    </Container>
  );
};

export default PokeCard;
