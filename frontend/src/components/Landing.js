import React from "react";
import "../css/landing.css"; // Use the correct relative path

export const Landing = () => {
  return (
    <div className="frame">
      <div className="div">
        <div className="header-container">
          <div className="title">culinary compass.</div>
          <div className="navigation">
            <button className="button">Login</button>
            <button className="button">Sign-Up</button>
            <button className="button">About Us</button>
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
