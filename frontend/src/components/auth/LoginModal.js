import React, { useState, useEffect } from "react";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showEmailPopover, setShowEmailPopover] = useState(false);
  const [showPasswordPopover, setShowPasswordPopover] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
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
    setVerificationToken("");
    setLoginAttempted(false);
  };

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

  const doLogin = async (event, token) => {
    event.preventDefault();
    setLoginAttempted(true);

    const isEmailEmpty = !email;
    const isPasswordEmpty = !password;

    if ((isEmailEmpty || isPasswordEmpty) && !token) {
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

      if (res.id <= 0) {
        setMessage("User/Password combination incorrect");
      } else {
        var user = {
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          id: res.user._id,
          picturePath: res.user.picturePath,
        };

        localStorage.setItem("user_data", JSON.stringify(user));

        if (!res.user.verified) {
          try {
            const verificationResponse = await fetch(
              bp.buildPath("auth/verification"),
              {
                method: "POST",
                body: JSON.stringify({
                  userId: res.user.id,
                  token: token,
                }),
                headers: { "Content-Type": "application/json" },
              }
            );

            const verificationResult = JSON.parse(
              await verificationResponse.text()
            );

            if (verificationResult.success) {
              // Verification successful, update state or redirect as needed
            } else {
              // Handle verification failure (show error message, etc.)
            }
          } catch (e) {
            console.error("Verification API call error:", e);
          }
        } else {
          // User is verified, proceed with login
          navigate("/homepage");
          setMessage("");
        }
      }
    } catch (e) {
      alert(e.toString());
      return;
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
        <form onSubmit={(e) => doLogin(e, verificationToken)}>
          <div className="custom-login-header">
            <h2 className="custom-login-title">Login</h2>
            <p className="custom-question">Don’t have an account?</p>
            <button className="custom-goto-signup" onClick={onOpenSignup}>
              Sign-Up
            </button>
          </div>

          {res.id <= 0 || !res.user.verified ? (
            <>
              <div className="floating-label">
                <input
                  type="text"
                  className="input-field"
                  id="login-username"
                  placeholder=" "
                  value={email}
                  onChange={handleEmailChange}
                />
                <label htmlFor="login-username">Email</label>
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
                />
                <label htmlFor="login-password">Password</label>
                {showPasswordPopover && (
                  <Popover className="show">Please enter a password.</Popover>
                )}
              </div>

              {!res.user.verified && (
                <div className="floating-label">
                  <input
                    type="text"
                    className="input-field"
                    id="verification-token"
                    placeholder=" "
                    value={verificationToken}
                    onChange={(e) => setVerificationToken(e.target.value)}
                  />
                  <label htmlFor="verification-token">Verification Token</label>
                </div>
              )}
            </>
          ) : null}

          <button type="submit" className="custom-login-submit">
            {res.user.verified ? "Login" : "Next"}
          </button>
          <button id="forgot">Forgot Password?</button>
        </form>
        <span id="loginResult">{message}</span>
      </div>
    </div>
  );
};

export default LoginModal;
