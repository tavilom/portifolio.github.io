import { StrictMode } from "react";
import { CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { theme } from "../src/styles/themes/index.ts";
import { AuthContextProvider } from "../src/context/AuthContext.tsx";
import { ThemeProvider } from "@mui/material/styles";


import "./index.css"
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  </AuthContextProvider>
);
