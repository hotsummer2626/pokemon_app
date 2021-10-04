import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../pages/Modal";
import { TYPECOLOR } from "../../constant/type";
import { STATCOLOR, STATTEXT } from "../../constant/stat";
import Img from "./Img";
import { mediaQueries } from "../../mediaQueries";

const Container = styled.div`
  border-radius: 1rem;
  padding: 0.8rem;
  text-align: center;
  display: grid;
  justify-items: center;
  position: relative;
  box-shadow: 3px 3px 3px #d0d0d0, -3px -3px 3px #f8f8f8;
  transition: box-shadow 0.1s ease;
  cursor: pointer;
  ${mediaQueries("xs")`
    grid-template-columns: repeat(2, 1fr);
  `}
  &::after {
    content: "";
    border-radius: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s ease;
  }
  &:hover {
    box-shadow: 0 0 0 #d0d0d0, 0 0 0 #f8f8f8;
    &::after {
      box-shadow: inset 3px 3px 3px #d0d0d0, inset -3px -3px 3px #f8f8f8;
    }
  }
`;

const Name = styled.h2`
  font-size: var(--h2-font-size);
`;

const TypesWrapper = styled.div``;
const Type = styled.span`
  background-color: ${({ type }) => TYPECOLOR[type]};
  font-size: var(--normal-font-size);
  display: inline-block;
  width: 55px;
  border-radius: 5px;
  margin: 1px;
`;

const Number = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  ${mediaQueries("xs")`
    grid-template-columns: 1fr;
  `}
`;

const StatWrapper = styled.div`
  width: 340px;
  height: max-content;
  border: 2px solid #505152;
  border-radius: 10px;
  background-color: #505152;
  display: grid;
  gap: 2px;
  ${mediaQueries('xs')`
    width: 170px;
  `}
`;
const StatBar = styled.div`
  position: relative;
  width: ${({ statNumber, isModalShow }) =>
    isModalShow ? `${parseInt(statNumber) / 1.7}%` : 0};
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: ${({ statName }) => STATCOLOR[statName]};
  transition: width 0.5s ease;
  ${mediaQueries('xs')`
    height: 20px;
    line-height: 20px;
  `}
`;
const StatName = styled.span`
  display: inline-block;
  width: 150px;
  font-weight: 600;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  border-radius: 10px 0 0 10px;
  ${mediaQueries('xs')`
    width: 75px;
    font-size: 12px;
  `}
`;
const StatNumber = styled.span`
  display: inline-block;
  width: 40px;
  font-weight: 600;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  left: 150px;
  border-radius: 0 10px 10px 0;
  ${mediaQueries('xs')`
    left: 75px;
    font-size: 12px;
  `}
`;

const PokeCard = ({ pokemon }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleIsModalShowChange = () => {
    setIsModalShow((isModalShow) => !isModalShow);
  };
  const officialArtwork = "official-artwork";

  return (
    <>
      <Container onClick={handleIsModalShowChange}>
        <Img
          imgSrc={pokemon.sprites.other[officialArtwork].front_default}
          size="sm"
        />
        <Number>{pokemon.id}</Number>
        <div>
          <Name>{pokemon.name}</Name>
          <TypesWrapper>
            {pokemon.types.map(({ slot, type }) => (
              <Type key={slot} type={type.name}>
                {type.name}
              </Type>
            ))}
          </TypesWrapper>
        </div>
      </Container>
      <Modal
        pokemon={pokemon}
        isModalShow={isModalShow}
        handleIsModalShowChange={handleIsModalShowChange}
      >
        <ModalContent>
          <Img imgSrc={pokemon.sprites.other.dream_world.front_default} />
          <StatWrapper>
            {pokemon.stats.map(({ base_stat, stat }) => {
              return (
                <StatBar
                  key={stat.name}
                  statName={stat.name}
                  statNumber={base_stat}
                  isModalShow={isModalShow}
                >
                  <StatName>{`${STATTEXT[stat.name]}:`}</StatName>
                  <StatNumber>{base_stat}</StatNumber>
                </StatBar>
              );
            })}
          </StatWrapper>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PokeCard;
