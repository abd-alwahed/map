import React, { useState } from "react";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { axios } from "../utils/axios";
import { setToken } from "../utils/helper";
import { BEARER } from "../utils/constant";
import "./Login.css";
import { LoginRequest, LoginResponse } from "../types/Auth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody: LoginRequest = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post<LoginResponse>(
        "/login_user",
        requestBody,
      );

      const receivedToken = response.data.data.token;
      setToken(receivedToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `${BEARER} ${receivedToken}`;
      navigate("./map");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;
