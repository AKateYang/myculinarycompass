import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import SavedRecipes from "./pages/SavedRecipes";
import SignupPage from "./pages/SignupPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
