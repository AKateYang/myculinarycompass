import React from "react";
import "../css/loginModal.css";
import classNames from "classnames";

const LoginModal = ({ isOpen, onClose, className }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={classNames("custom-modal", { open: isOpen }, className)}
      onClick={handleBackgroundClick}
    >
      <div className="custom-modal-content">
        <span className="custom-close-btn" onClick={onClose}>
          &times;
        </span>
        <form>
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
            />
            <label for="login-username">Username</label>
          </div>
          <div className="floating-label">
            <input
              type="text"
              className="input-field"
              id="login-password"
              placeholder=" "
            />
            <label for="login-password">Password</label>
          </div>
          <button type="submit" className="custom-login-submit">
            Login
          </button>
          <button id="forgot">Forgot Password?</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
