// src/Pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", form);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate('/dashboard');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("❌ Login error:", errorMsg);
      setMessage(errorMsg);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Login</h1>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ marginBottom: 10 }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ marginBottom: 10 }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;