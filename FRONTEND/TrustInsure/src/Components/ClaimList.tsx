import React, { useEffect, useState } from "react";
import { getClaims, updateClaimStatus } from "../Services/api";

interface Claim {
  id: number;
  user: string;
  description: string;
  amount: number;
  status: string;
}

const ClaimList: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    getClaims()
      .then(res => setClaims(res.data as Claim[]))
      .catch(err => console.error(err));
  }, []);

  const handleStatusChange = (id: number, status: string) => {
    updateClaimStatus(id, status).then(() => {
      setClaims(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
    });
  };

  const filteredClaims = claims
    .filter(c => filterStatus === "all" || c.status === filterStatus)
    .filter(c => c.user.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Claims</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <ul>
        {filteredClaims.map(claim => (
          <li key={claim.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <div>
              <p><strong>User:</strong> {claim.user}</p>
              <p><strong>Description:</strong> {claim.description}</p>
              <p><strong>Amount:</strong> ${claim.amount}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded ${
                  claim.status === "approved" ? "bg-green-200 text-green-800" :
                  claim.status === "rejected" ? "bg-red-200 text-red-800" :
                  "bg-yellow-200 text-yellow-800"
                }`}>
                  {claim.status}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleStatusChange(claim.id, "approved")} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
              <button onClick={() => handleStatusChange(claim.id, "rejected")} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimList;
