import React from "react";
import "../css/signup.css";

export const Signup = () => {
  return (
    <div className="signup-frame">
      <div className="div">
        <div className="header">
          <div className="title">culinary compass.</div>
          <div className="navigation">
            <button className="nav-button">Login</button>
            <button className="nav-button">Sign-Up</button>
            <button className="nav-button">About Us</button>
          </div>
        </div>
        <div className="overlap">
          <div className="group">
            <form id="signup-box">
              <div className="create-account">
                <p className="already-have-an">Already have an account?</p>
                <button className="goto-login">Login</button>
                <div className="text-wrapper-8">Create Account</div>
              </div>
              <div>
                <input type="text" className="firstname-box" />
                <input type="text" className="lastname-box" />
                <input type="text" className="username-box" />
                <input type="text" className="password-box" />
                <button type="submit" className="sign-up-button">
                  Sign-Up
                </button>
              </div>
              <div className="terms-conditions">
                <p className="i-agree-to-the-terms">
                  I agree to the Terms &amp; Service and Privacy Policy
                </p>
                <div className="rectangle" />
              </div>
            </form>
          </div>
          <div className="text-wrapper-9">Firstname</div>
          <div className="text-wrapper-10">johmdoe12@xyz.com</div>
          <div className="text-wrapper-11">Password</div>
          <div className="text-wrapper-12">johmdoe12@xyz.com</div>
          <div className="text-wrapper-13">Username</div>
          <div className="lastname">
            <div className="text-wrapper-14">johmdoe12@xyz.com</div>
            <div className="text-wrapper-15">Lastname</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
