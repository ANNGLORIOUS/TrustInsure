import React, { useState } from "react";
import { createPolicy } from "../Services/api";

const CreatePolicyForm: React.FC = () => {
  const [policyType, setPolicyType] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPolicy({ policy_type: policyType, is_active: isActive })
      .then(() => {
        alert("Policy created successfully");
        setPolicyType("");
        setIsActive(true);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create New Policy</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Policy Type"
          value={policyType}
          onChange={(e) => setPolicyType(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Policy
        </button>
      </form>
    </div>
  );
};

export default CreatePolicyForm;
