import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

<<<<<<< HEAD
import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import SavedRecipes from "./pages/SavedRecipes";
=======
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./components/theme.js";

import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import SavedRecipes from "./pages/SavedRecipes";
import HomePage from "./scenes/homePage/index.jsx";
>>>>>>> e982a9507a7b603fb8a934047e302692ebc576b9

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
      </Routes>
=======
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
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </ThemeProvider>
>>>>>>> e982a9507a7b603fb8a934047e302692ebc576b9
    </BrowserRouter>
  );
}

export default App;
