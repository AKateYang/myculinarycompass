import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import SavedRecipes from "./pages/SavedRecipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
