import React from "react";
import "../css/signupModal.css";
import classNames from "classnames";

const SignupModal = ({ isOpen, onClose, className }) => {
  // Handle background click to close the modal
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      // Check if clicked element is the background
      onClose();
    }
  };

  return (
    <div
      className={classNames("signup-modal", { open: isOpen }, className)}
      onClick={handleBackgroundClick}
    >
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
          <div className="signup-floating-label">
            <input
              type="text"
              className="signup-input-field"
              id="firstname"
              placeholder=" "
            />
            <label id="target-firstname" for="firstname">
              Firstname
            </label>
          </div>
          <div className="signup-floating-label">
            <input
              type="text"
              className="signup-input-field"
              id="lastname"
              placeholder=" "
            />
            <label id="target-lastname" for="lastname">
              Lastname
            </label>
          </div>
          <div className="signup-floating-label">
            <input
              type="text"
              className="signup-input-field"
              id="signup-email"
              placeholder=" "
            />
            <label id="target-email" for="signup-email">
              Email
            </label>
          </div>
          <div className="signup-floating-label">
            <input
              type="text"
              className="signup-input-field"
              id="signup-username"
              placeholder=" "
            />
            <label id="target-username" for="signup-username">
              Username
            </label>
          </div>
          <div className="signup-floating-label">
            <input
              type="text"
              className="signup-input-field"
              id="signup-password"
              placeholder=" "
            />
            <label id="target-password" for="signup-password">
              Password
            </label>
          </div>
          <button type="submit" className="signup-submit">
            Sign-Up
          </button>
          <div className="terms">
            <p className="agree">
              I agree to the Terms &amp; Service and Privacy Policy
            </p>
            <input type="checkbox" class="check" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
