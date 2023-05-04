import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  *{
    box-sizing: inherit;
  }
  html{
    height:100%;
  }
  body {
      height:100%;
      letter-spacing: -0.018em;
      line-height: 1.6;
  }
    #root{
      height:100%;
    }
  button{
    border:none;
    cursor: pointer;
  }
`;
export default GlobalStyle;
