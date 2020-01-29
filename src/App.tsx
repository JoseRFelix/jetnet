import React from "react";
import FontImports from "assets/fonts/fontImports";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme } from "theme";
import { BrowserRouter } from "react-router-dom";
import { Router } from "routes";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <FontImports />
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
