import React from "react";
import "../css/loginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Handle background click to close the modal
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      // Check if clicked element is the background
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <form>
          <div className="login-header">
            <h2 className="login-title">Login</h2>
            <p className="question">Don’t have an account?</p>
            <button className="goto-signup">Sign-Up</button>
          </div>
          <input type="text" id="login-username" />
          <input type="text" id="login-password" />
          <button type="submit" className="login-submit">
            Login
          </button>
          <button id="forgot">Forgot Password?</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
