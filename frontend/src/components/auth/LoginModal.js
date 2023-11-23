import React, { useState } from "react";
import "../css/loginModal.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import classNames from "classnames";

const LoginModal = ({ isOpen, onClose, onOpenSignup, className }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  var email;
  var loginPassword;

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { email: email.value, password: loginPassword.value };
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
