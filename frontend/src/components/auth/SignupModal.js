import React, { useState } from "react";
import "../css/signupModal.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const SignupModal = ({ isOpen, onClose, className }) => {
  // Handle background click to close the modal
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      // Check if clicked element is the background
      onClose();
    }
  };

  ///////////////////////////////////////////////////
  // This section sends the parameter to backend

  var username;
  var loginPassword;
  var firstName;
  var lastName;
  var email;
  // var phone;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const doSignUp = async (event) => {
    event.preventDefault();

    var obj = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      password: loginPassword.value,
    };
    var js = JSON.stringify(obj);

    try {
      var bp = require("../Path.js");
      const response = await fetch(bp.buildPath("auth/register"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

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
        navigate("/");
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
      className={classNames("signup-modal", { open: isOpen }, className)}
      onClick={handleBackgroundClick}
    >
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={doSignUp}>
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
              ref={(c) => (firstName = c)}
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
              ref={(c) => (lastName = c)}
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
              ref={(c) => (email = c)}
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
              ref={(c) => (username = c)}
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
              ref={(c) => (loginPassword = c)}
            />
            <label id="target-password" for="signup-password">
              Password
            </label>
          </div>
          <button type="submit" className="signup-submit" onClick={doSignUp}>
            Sign-Up
          </button>
          <div className="terms">
            <p className="agree">
              I agree to the Terms &amp; Service and Privacy Policy
            </p>
            <input type="checkbox" class="check" />
          </div>
        </form>
        <span id="signUpResult">{message}</span>
      </div>
    </div>
  );
};

export default SignupModal;
