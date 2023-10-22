import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import SavedRecipes from './pages/SavedRecipes';
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
