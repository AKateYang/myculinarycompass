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
            Lets Put A Good Tagline
            <br />
            here. It Could Work.
          </p>
          <p className="custom-description">
            We can put a more subtle description here. We can change around the
            background into one that work better. This page could look like this
            or maybe not..
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
