import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;

  ${({ size }) =>
    ({
      sm: css`
        width: 100px;
        height: 100px;
      `,
      md: css`
        width: 200px;
        height: 200px;
      `,
      lg: css`
        width: 300px;
        height: 300px;
      `,
    }[size])}
`;

const Content = styled.img.attrs(({ imgSrc }) => ({
  src: imgSrc,
}))`
  width: 90%;
`;

const Img = ({ imgSrc, size }) => {
  return (
    <Container size={size}>
      <Content imgSrc={imgSrc} />
    </Container>
  );
};

export default Img;
