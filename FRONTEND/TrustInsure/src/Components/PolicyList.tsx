import React, { useEffect, useState } from "react";
import { getPolicies } from "../Services/api";

interface Policy {
  id: number;
  policy_type: string;
  is_active: boolean;
}

const PolicyList: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    getPolicies()
      .then(res => setPolicies(res.data as Policy[]))  // <-- Type assertion
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Policies</h2>
      <ul>
        {policies.map(policy => (
          <li key={policy.id} className="mb-2">
            {policy.policy_type} - Active: {policy.is_active ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyList;
