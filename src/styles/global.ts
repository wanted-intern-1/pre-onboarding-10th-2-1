import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  html{
    height:100%;
}
  body {
      height:100%;
  }
    #root{
      height:100%;
    }
  button{
    border:none;
  }
`;
export default GlobalStyle;