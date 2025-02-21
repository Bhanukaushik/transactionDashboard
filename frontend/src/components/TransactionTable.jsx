import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setPage(1);
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${API_URL}/api/transactions?month=${month}&search=${search}&page=${page}`
      );
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      setError("Failed to fetch transactions");
      setTransactions([]);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 bg-light border rounded shadow-sm">
      <h2 className="text-center">📜 Transactions</h2>
      <input
        type="text"
        placeholder="🔍 Search transactions..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="text-center text-primary">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {transactions.length === 0 && !loading && !error && (
        <p className="text-center text-muted">No transactions found.</p>
      )}

      {transactions.length > 0 && (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Image</th> {/* ✅ New Column for Product Image */}
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={t.image}
                    alt={t.title}
                    className="img-thumbnail"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }} // ✅ Small image with uniform size
                  />
                </td>
                <td>{t.title}</td>
                <td>${t.price}</td>
                <td>{t.category}</td>
                <td>{t.sold ? "✅ Yes" : "❌ No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
