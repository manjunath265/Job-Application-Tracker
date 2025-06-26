import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import Dashboard from './Pages/Dashboard.jsx';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("🔑 Token loaded from localStorage:", storedToken);
    } else {
      console.warn("⚠️ No token found in localStorage.");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
