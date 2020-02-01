import React from "react";
import FontImports from "assets/fonts/fontImports";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme, breakpoints } from "theme";
import { BrowserRouter } from "react-router-dom";
import { Router } from "routes";
import ModalManager from "components/modals/ModalManager";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <FontImports />
        <Router />
        <ModalManager />
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

    @media only screen and (max-width: ${breakpoints.bpLarge}) {
        font-size: 50%;
      }
    
  }

  body {
    font-size: 1.4rem; 
    min-height: 100vh;
    
    font-family: "Poppins", sans-serif;
  }

  a {
    text-decoration: none;
  }      
`;

export default App;
