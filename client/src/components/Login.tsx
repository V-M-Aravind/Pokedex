import React, { useState } from "react";
import axiosClient from "../axios/client";
import { useAuthContext } from "../store/AuthProvider";

const Login = () => {
  const { setIsLoggedIn, setUserData } = useAuthContext();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post(
        "http://localhost:8080/login",
        JSON.stringify({ username: userName, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      setUserData(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col max-w-96 gap-3">
        <label htmlFor="username" aria-label="username-label" />
        <input
          type="text"
          id="username"
          className=""
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          required
        />
        <label htmlFor="password" aria-label="password-label" />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
