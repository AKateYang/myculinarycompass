import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Register from "../components/Register";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Login
      </button>
      <PageTitle />
      <Register />
    </div>
  );
};

export default RegisterPage;
