import React from "react";
import ClaimList from "../Components/ClaimList";
import Navbar from "../Components/Navbar";

const ClaimManagement: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Claim Management</h1>
        <ClaimList />
      </div>
    </>
  );
};

export default ClaimManagement;
