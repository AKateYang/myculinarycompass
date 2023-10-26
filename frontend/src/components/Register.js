import React, { useState } from "react";

function Register() {
  //  var bp = require('./Path.js');

  const app_name = "myculinarycompass-0c8901cce626";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5000/" + route;
    }
  }

  var loginName;
  var loginPassword;
  var firstName;
  var lastName;
  var email;
  var phone;

  const [message, setMessage] = useState("");

  const doSignUp = async (event) => {
    event.preventDefault();

    var obj = {
      login: loginName.value,
      password: loginPassword.value,
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      phone: phone.value,
    };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath("api/signup"), {
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
        window.location.href = "/";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doSignUp}>
        <span id="inner-title">PLEASE SIGN UP</span>
        <br />
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          ref={(c) => (firstName = c)}
        />
        <br />

        <br />
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          ref={(c) => (lastName = c)}
        />
        <br />

        <br />
        <input
          type="text"
          id="email"
          placeholder="email"
          ref={(c) => (email = c)}
        />
        <br />

        <br />
        <input
          type="text"
          id="phone"
          placeholder="Phone Number"
          ref={(c) => (phone = c)}
        />
        <br />

        <br />
        <input
          type="text"
          id="loginName"
          placeholder="Username"
          ref={(c) => (loginName = c)}
        />
        <br />

        <br />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />

        <br />

        <br />
        <input
          type="submit"
          id="loginButton"
          class="buttons"
          value="Do It"
          onClick={doSignUp}
        />
      </form>
      <span id="signUpResult">{message}</span>
    </div>
  );
}

export default Register;
