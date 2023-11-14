import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "/Users/alissaforde/myculinarycompass/frontend/src/components/theme.js";

import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import SavedRecipes from "./pages/SavedRecipes";
import HomePage from "/Users/alissaforde/myculinarycompass/frontend/src/scenes/homePage/index.jsx";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cards" element={<CardPage />} />
          <Route path="/savedRecipes" element={<SavedRecipes />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
