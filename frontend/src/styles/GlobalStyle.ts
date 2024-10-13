import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  /* Reset or base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat';
    background-color: ${(props) => props.theme.colors.bgPrimary};
    color: ${(props) => props.theme.colors.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  h1 {
    font-size: 32px;
    font-wight: 300;
  }

  h2 {
    font-size: 24px;
    font-wight: 300;
  }

  h3 {
    font-size: 18px;
    font-wight: 500;
  }

  h4 {
    font-size: 16px;
    font-wight: 500;
  }

  h5 {
    font-size: 12px;
    font-wight: 500;
  }

  h6 {
    font-size: 10px;
    font-wight: 500;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Add other global styles here */
`
