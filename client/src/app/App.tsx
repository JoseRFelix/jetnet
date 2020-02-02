import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme, breakpoints } from "theme";
import { BrowserRouter } from "react-router-dom";
import { Router } from "routes";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
    font-size: inherit;
  }  
      
  html {
    box-sizing: border-box;
    font-size: 62.5%; /*1 rem = 10px */
    font-family: "Poppins", sans-serif;

    @media only screen and (max-width: ${breakpoints.bpLarge}) {
      font-size: 50%;
    }    
  }

  body {
    font-size: 1.4rem; 
    min-height: 100vh;    
  }

  a {
    text-decoration: none;
  }      
`;

export default App;
