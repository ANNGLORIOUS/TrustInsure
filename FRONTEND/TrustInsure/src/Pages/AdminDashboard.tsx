import React from "react";
import Navbar from "../Components/Navbar";
import PolicyList from "../Components/PolicyList";
import ClaimList from "../Components/ClaimList";
import PaymentList from "../Components/PaymentList";

const AdminDashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PolicyList />
          <ClaimList />
          <PaymentList />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
