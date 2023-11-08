import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

<<<<<<< HEAD
import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import SavedRecipes from "./pages/SavedRecipes";
=======
import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";
import LandingPage from "./pages/LandingPage";
import SavedRecipes from "./pages/SavedRecipes";

import SignupPage from "./pages/SignupPage";
import RegisterPage from "./pages/RegisterPage";
>>>>>>> master

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LandingPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
=======
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/savedRecipes" element={<SavedRecipes />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
>>>>>>> master
      </Routes>
    </BrowserRouter>
  );
}

export default App;
