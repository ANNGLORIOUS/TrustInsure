import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy authentication (replace with API call)
    if (username === "admin" && password === "password") {
      localStorage.setItem("token", "dummy-token");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
