import React from "react";
import "../css/signupModal.css";

const SignupModal = ({ isOpen, onClose }) => {
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
          <div className="signup-header">
            <h2 className="signup-title">Create Account</h2>
            <p className="question">Already have an account?</p>
            <button className="goto-login">Login</button>
          </div>
          <input type="text" id="firstname" />
          <input type="text" id="lastname" />
          <input type="text" id="signup-username" />
          <input type="text" id="signup-password" />
          <button type="submit" className="signup-submit">
            Sign-Up
          </button>
          <div className="terms">
            <p className="agree">
              I agree to the Terms &amp; Service and Privacy Policy
            </p>
            <div className="check" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
