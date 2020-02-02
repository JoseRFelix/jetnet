import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { defaultTheme, breakpoints } from "theme";
import { toast } from "react-toastify";
import { Router } from "routes";
import { ConnectedRouter } from "connected-react-router";
import { history } from "helpers";

import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    {
      // @ts-ignore
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <Router />
      </ConnectedRouter>
    }
  </ThemeProvider>
);

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
