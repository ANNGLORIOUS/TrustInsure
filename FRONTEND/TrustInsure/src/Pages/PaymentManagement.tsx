import React from "react";
import PaymentList from "../Components/PaymentList";
import Navbar from "../Components/Navbar";

const PaymentManagement: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Payment Management</h1>
        <PaymentList />
      </div>
    </>
  );
};

export default PaymentManagement;
