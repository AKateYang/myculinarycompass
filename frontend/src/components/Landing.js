/* import React from "react"; */
import React, { useState } from "react";
import "../css/landing.css"; // Use the correct relative path

import SignupModal from "./SignupModal.js";
import LoginModal from "./LoginModal.js";
import AboutModal from "./AboutModal.js";

export const Landing = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isAboutUsOpen, setAboutUsOpen] = useState(false);

  return (
    <div className="frame">
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <SignupModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} />
      <AboutModal
        isOpen={isAboutUsOpen}
        onClose={() => setAboutUsOpen(false)}
      />

      <div className="div">
        <div className="header-container">
          <div className="title">culinary compass.</div>
          <div className="navigation">
            <button className="button" onClick={() => setLoginOpen(true)}>
              Login
            </button>
            <button className="button" onClick={() => setSignUpOpen(true)}>
              Sign-Up
            </button>
            <button className="button" onClick={() => setAboutUsOpen(true)}>
              About Us
            </button>
          </div>
        </div>
        <div className="content-wrapper">
          <p className="tagline">
            Lets Put A Good Tagline
            <br />
            here. It Could Work.
          </p>
          <p className="description">
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
