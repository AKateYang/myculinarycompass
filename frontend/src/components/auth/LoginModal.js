import React, { useState, useEffect, useRef } from "react";
import "../css/loginModal.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import classNames from "classnames";

import Popover from "../Popover"; // Adjust the path as necessary

const LoginModal = ({ isOpen, onClose, onOpenSignup, className }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  var emailRef;
  var loginPasswordRef;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showEmailPopover, setShowEmailPopover] = useState(false);
  const [showPasswordPopover, setShowPasswordPopover] = useState(false);

  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetLoginForm();
    }
  }, [isOpen]);

  const resetLoginForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
    setShowEmailPopover(false);
    setShowPasswordPopover(false);
    setLoginAttempted(false);
  };

  // Separate handlers for email and password changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (loginAttempted) {
      setShowEmailPopover(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (loginAttempted) {
      setShowPasswordPopover(false);
    }
  };

  const doLogin = async (event) => {
    event.preventDefault();

    setLoginAttempted(true); // Set the flag when login is attempted

    // Check if email or password fields are empty and show popovers accordingly
    const isEmailEmpty = !email;
    const isPasswordEmpty = !password;

    if (isEmailEmpty || isPasswordEmpty) {
      setShowEmailPopover(isEmailEmpty);
      setShowPasswordPopover(isPasswordEmpty);
      return;
    }

    var obj = {
      email: email,
      password: password,
    };
    var js = JSON.stringify(obj);

    try {
      var bp = require("../Path.js");
      const response = await fetch(bp.buildPath("auth/login"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

      if (res <= 0) {
        setMessage("User/Password combination incorrect");
      } else {
        var user = {
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          _id: res.user._id,
          picturePath: res.user.picturePath,
        };

        localStorage.setItem("user_data", JSON.stringify(user));
        //This may not be needed. can delete later if we don't use it
        // dispatch(
        //   setLogin({
        //     user: res.user,
        //     token: res.token,
        //   })
        // );
        navigate("/homepage");
        setMessage("");

        // window.location.href = "/homepage";
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
            <button className="custom-goto-signup" onClick={onOpenSignup}>
              Sign-Up
            </button>
          </div>
          <div className="floating-label">
            <input
              type="text"
              className="input-field"
              id="login-username"
              placeholder=" "
              value={email}
              onChange={handleEmailChange}
              /*ref={emailRef} /*{(c) => (email = c)}*/
            />
            <label for="login-username">Email</label>
            {showEmailPopover && (
              <Popover className="show">Please enter an email.</Popover>
            )}
          </div>
          <div className="floating-label">
            <input
              type="password"
              className="input-field"
              id="login-password"
              placeholder=" "
              value={password}
              onChange={handlePasswordChange}
              /*ref={loginPasswordRef} /*{(c) => (loginPassword = c)}*/
            />
            <label for="login-password">Password</label>
            {showPasswordPopover && (
              <Popover className="show">Please enter a password.</Popover>
            )}
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
