import React from "react";
import "../css/landing.css"; // Use the correct relative path

export const Landing = () => {
  return (
    <div className="frame">
      <div className="div">
        <div className="navigation">
          <button className="text-wrapper">Login</button>
          <div className="text-wrapper-2">Sign-Up</div>
          <div className="text-wrapper-3">About Us</div>
        </div>
        <div className="title">culinary compass.</div>
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
  );
};

export default Landing;
