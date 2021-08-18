import { createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
  --h1-font-size: 1.5rem;
  --h2-font-size: 1.25rem;
  --normal-font-size: 0.938rem;
}


*{
  box-sizing: border-box;
}

body{
  background: linear-gradient(to right, #d4d3dd,#efefbb);
}
`;

export default GlobalStyles;
