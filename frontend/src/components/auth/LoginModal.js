import React, { useState } from "react";
import "../css/loginModal.css";
import classNames from "classnames";

const LoginModal = ({ isOpen, onClose, className }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  var email;
  var loginPassword;
  var verification_token;

  const [message, setMessage] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = {
      email: email.value,
      password: loginPassword.value,
    };

    if (verification_token && verification_token.value) {
      obj.verification_token = verification_token.value;
    }
    var js = JSON.stringify(obj);

    try {
      var bp = require("../Path.js");
      const response = await fetch(bp.buildPath("auth/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

      if (res.verification == false) {
        const response = await fetch(bp.buildPath("auth/verification"), {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        });
        setMessage("Not verified! Please enter your verification code.");
      }

      if (res.id <= 0) {
        setMessage("User/Password combination incorrect");
      } else {
        var user = {
          firstName: res.firstName,
          lastName: res.lastName,
          id: res.id,
        };
        localStorage.setItem("user_data", JSON.stringify(user));

        setMessage("");
        window.location.href = "/cards";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  ///////////////////////////////////////////////////
  // This section contains the html/react/input form
  return (
    <div
      className={classNames("custom-modal", { open: isOpen }, className)}
      onClick={handleBackgroundClick}
    >
      <div className="custom-modal-content">
        <span className="custom-close-btn" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={doLogin}>
          <div className="custom-login-header">
            <h2 className="custom-login-title">Login</h2>
            <p className="custom-question">Don’t have an account?</p>
            <button className="custom-goto-signup">Sign-Up</button>
          </div>
          <div className="floating-label">
            <input
              type="text"
              className="input-field"
              id="login-username"
              placeholder=" "
              ref={(c) => (email = c)}
            />
            <label for="login-username">Email</label>
          </div>
          <div className="floating-label">
            <input
              type="password"
              className="input-field"
              id="login-password"
              placeholder=" "
              ref={(c) => (loginPassword = c)}
            />
            <label for="login-password">Password</label>
          </div>
          <div className="floating-label" style={{ display: "none" }}>
            <input
              type="Verification Token"
              className="input-field"
              id="login-password"
              placeholder=" "
              ref={(c) => (loginPassword = c)}
            />
            <label for="login-password">Verification Token</label>
          </div>
          <button
            type="submit"
            className="custom-login-submit"
            onClick={doLogin}
          >
            Login
          </button>
          <button id="forgot">Forgot Password?</button>
        </form>
        <span id="loginResult">{message}</span>
      </div>
    </div>
  );
};

export default LoginModal;
