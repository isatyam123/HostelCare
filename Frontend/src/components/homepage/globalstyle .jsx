// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'outfit', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #ffffff; /* Default background color */
    color: #fff;
  }
    a{
     text-decoration: none;
     color:inherit;
     line-height:1;
     cursor: pointer;
    }
`;

export default GlobalStyle;
