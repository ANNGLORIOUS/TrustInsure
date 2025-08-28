import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">TrustInsure Admin</h1>
      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
        <Link to="/policies" className="hover:text-blue-500">Policies</Link>
        <Link to="/claims" className="hover:text-blue-500">Claims</Link>
        <Link to="/payments" className="hover:text-blue-500">Payments</Link>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
