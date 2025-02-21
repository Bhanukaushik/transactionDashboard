import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  const fetchPieChartData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/pie-chart?month=${month}`);
      setPieChartData(data);
    } catch (error) {
      setPieChartData([]);
    }
  };

  if (!pieChartData) return <p className="text-center">Loading...</p>;

  return (
    <div className="mt-4 p-4 bg-white border rounded">
      <h2 className="text-center">Category Distribution</h2>
      <Pie
        data={{
          labels: pieChartData.map((d) => d.category),
          datasets: [
            {
              data: pieChartData.map((d) => d.count),
              backgroundColor: ["#dc3545", "#0d6efd", "#ffc107", "#198754"],
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
