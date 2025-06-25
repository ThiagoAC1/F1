// src/pages/Login.js
import React, { useState } from "react";
import api from "../api";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      window.location.href = "/";
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  const googleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Entrar</button>
      </form>
      <button onClick={googleLogin}>Iniciar con Google</button>
    </div>
  );
};

export default Login;
