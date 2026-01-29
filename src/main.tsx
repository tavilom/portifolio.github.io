import { StrictMode } from "react";
import { CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import { theme } from "./styles/themes";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";

import "./index.css";

// Detecta automaticamente se está no GitHub Pages
const basename = window.location.pathname.startsWith("/portifolio.github.io")
  ? "/portifolio.github.io"
  : "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter basename={basename}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
