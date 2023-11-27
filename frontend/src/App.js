import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./components/theme.js";

import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import SavedRecipes from "./pages/SavedRecipes";
import HomePage from "./scenes/homePage/index.jsx";

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
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/savedRecipes" element={<SavedRecipes />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
