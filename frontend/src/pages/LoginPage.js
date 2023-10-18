import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Login from "../components/Login";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </button>
      <PageTitle />
      <Login />
    </div>
  );
};

export default LoginPage;
