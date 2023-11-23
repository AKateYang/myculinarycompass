import React, { useState } from "react";
import "../css/loginModal.css";
import classNames from "classnames";
import { Navigate, useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose, className }) => {
  const navigate = useNavigate();
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  var email;
  var loginPassword;

  const [message, setMessage] = useState("");

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
