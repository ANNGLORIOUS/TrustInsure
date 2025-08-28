import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import PolicyManagement from "./Pages/PolicyManagement";
import ClaimManagement from "./Pages/ClaimManagement";
import PaymentManagement from "./Pages/PaymentManagement";
import LoginPage from "./Pages/LoginPage";

const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // simple token check
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/policies"
          element={isAuthenticated() ? <PolicyManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/claims"
          element={isAuthenticated() ? <ClaimManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/payments"
          element={isAuthenticated() ? <PaymentManagement /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
