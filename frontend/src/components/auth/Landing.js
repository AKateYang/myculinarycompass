import React, { useState } from "react";
import "../css/landing.css"; // Use the correct relative path

import SignupModal from "./SignupModal.js";
import LoginModal from "./LoginModal.js";
import AboutModal from "./AboutModal.js";

export const Landing = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isAboutUsOpen, setAboutUsOpen] = useState(false);

  const openSignup = () => {
    setLoginOpen(false); // Close the login modal
    setSignUpOpen(true); // Open the signup modal
  };

  const openLogin = () => {
    setSignUpOpen(false); // Close the login modal
    setLoginOpen(true); // Open the signup modal
  };

  return (
    <div className="custom-frame">
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenSignup={openSignup}
        className="custom-login-modal"
      />
      <SignupModal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        onOpenLogin={openLogin}
        className="signup-modal"
      />
      <AboutModal
        isOpen={isAboutUsOpen}
        onClose={() => setAboutUsOpen(false)}
        className="custom-about-modal"
      />

      <div className="custom-div">
        <div className="custom-header-container">
          <div className="custom-title">culinary compass.</div>
          <div className="custom-navigation">
            <button
              className="custom-button"
              onClick={() => setLoginOpen(true)}
            >
              Login
            </button>
            <button
              className="custom-button"
              onClick={() => setSignUpOpen(true)}
            >
              Sign-Up
            </button>
            <button
              className="custom-button"
              onClick={() => setAboutUsOpen(true)}
            >
              About Us
            </button>
          </div>
        </div>
        <div className="custom-content-wrapper">
          <p className="custom-tagline">
            Elevating Your
            <br />
            Culinary Experience.
          </p>
          <p className="custom-description">
            Join us in a world where every dish is a canvas, and every recipe is
            an opportunity to create something beautiful. From gourmet feasts to
            homemade comfort food, we're all about the pleasure of savoring
            flavors and elevating your dining experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
