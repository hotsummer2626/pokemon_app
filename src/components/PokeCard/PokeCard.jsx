import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Modal from "../../pages/Modal";
import { TYPECOLOR } from "../../constant/typeColor";
import { STATCOLOR } from "../../constant/statColor";
import Img from "./Img";

const Container = styled.div`
  border-radius: 1rem;
  padding: 0.8rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  box-shadow: 3px 3px 3px #d0d0d0, -3px -3px 3px #f8f8f8;
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
`;

const StatWrapper = styled.div`
  width: 340px;
  height: max-content;
  border: 2px solid #505152;
  background-color: #505152;
  display: grid;
  gap: 2px;
`;
const StatBar = styled.div`
  position: relative;
  width: ${({ statNumber }) => `${parseInt(statNumber) / 1.7}%`};
  height: 40px;
  line-height: 40px;
  background-color: ${({ statName }) => STATCOLOR[statName]};
`;
const StatName = styled.span`
  display: inline-block;
  width: 150px;
  font-weight: 600;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
`;
const StatNumber = styled.span`
  display: inline-block;
  width: 40px;
  font-weight: 600;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  left: 150px;
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
        <Name>{pokemon.name}</Name>
        <TypesWrapper>
          {pokemon.types.map(({ slot, type }) => (
            <Type key={slot} type={type.name}>
              {type.name}
            </Type>
          ))}
        </TypesWrapper>
      </Container>
      <Modal
        pokemon={pokemon}
        isModalShow={isModalShow}
        handleIsModalShowChange={handleIsModalShowChange}
      >
        <ModalContent>
          <Img
            imgSrc={pokemon.sprites.other[officialArtwork].front_default}
            size="lg"
          />
          <StatWrapper>
            {pokemon.stats.map(({ base_stat, stat }) => {
              return (
                <StatBar statName={stat.name} statNumber={base_stat}>
                  <StatName>{`${stat.name}:`}</StatName>
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
