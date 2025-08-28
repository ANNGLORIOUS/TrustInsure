import React from "react";
import PolicyList from "../Components/PolicyList";
import CreatePolicyForm from "../Components/CreatePolicyForm";
import Navbar from "../Components/Navbar";

const PolicyManagement: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Policy Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PolicyList />
          <CreatePolicyForm />
        </div>
      </div>
    </>
  );
};

export default PolicyManagement;
