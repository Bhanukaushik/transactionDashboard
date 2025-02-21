import React, { useState, useEffect } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/statistics?month=${month}`);
      setStats(data);
    } catch (error) {
      setStats(null);
    }
  };

  if (!stats) return <p className="text-center">Loading statistics...</p>;

  return (
    <div className="mt-4 p-4 bg-light border rounded">
      <h2 className="text-center">Statistics</h2>
      <p><strong>Total Sales:</strong> ${stats.totalSales}</p>
      <p><strong>Sold Items:</strong> {stats.soldItems}</p>
      <p><strong>Unsold Items:</strong> {stats.unsoldItems}</p>
    </div>
  );
};

export default Statistics;
