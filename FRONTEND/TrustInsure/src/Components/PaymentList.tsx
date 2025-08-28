import React, { useEffect, useState } from "react";
import { getPayments } from "../Services/api";

interface Payment {
  id: number;
  user: string;
  amount: number;
  status: string;
  date: string; // assuming backend sends a date field
}

const PaymentList: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("date"); // default sort by date
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    getPayments()
      .then(res => setPayments(res.data as Payment[]))
      .catch(err => console.error(err));
  }, []);

  const sortedFilteredPayments = payments
    .filter(p => filterStatus === "all" || p.status === filterStatus)
    .filter(p => p.user.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortField === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Payments</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px]"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border p-2 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Payment List */}
      <ul>
        {sortedFilteredPayments.map(payment => (
          <li key={payment.id} className="mb-2 p-2 border rounded flex justify-between">
            <div>
              <p><strong>User:</strong> {payment.user}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
            </div>
            <span className={`px-2 py-1 rounded ${
              payment.status === "completed" ? "bg-green-200 text-green-800" :
              "bg-yellow-200 text-yellow-800"
            }`}>
              {payment.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentList;
