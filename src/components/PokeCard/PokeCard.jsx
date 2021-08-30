import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../pages/Modal";
import { color } from "../../constant/colorTable";
import Img from "./Img";

const Container = styled.div`
  background-color: ${({ type }) => color[type]};
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Name = styled.h2`
  font-size: var(--h2-font-size);
`;
const Type = styled.span`
  font-size: var(--normal-font-size);
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
`;

const PokeCard = ({ pokemon }) => {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleIsModalShowChange = () => {
    setIsModalShow((isModalShow) => !isModalShow);
  };
  const officialArtwork = "official-artwork";

  return (
    <>
      <Container
        type={pokemon.types[0].type.name}
        onClick={handleIsModalShowChange}
      >
        <Img
          imgSrc={pokemon.sprites.other[officialArtwork].front_default}
          size="sm"
        />
        <Number>{pokemon.id}</Number>
        <Name>{pokemon.name}</Name>
        <Type>{pokemon.types[0].type.name}</Type>
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default PokeCard;
