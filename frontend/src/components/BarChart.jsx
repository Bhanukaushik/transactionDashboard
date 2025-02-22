import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchBarChartData();
  }, [month]); 

  const fetchBarChartData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/bar-chart?month=${month}`);
      if (Array.isArray(data) && data.length > 0) {
        setBarChartData(data);
      } else {
        console.warn("No data available for the selected month.");
        setBarChartData([]); 
      }
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
      setBarChartData([]); 
    }
  };

  if (barChartData.length === 0) {
    return <p className="text-center text-muted">No data available for the selected month.</p>;
  }

  return (
    <div className="mt-4 p-4 bg-white border rounded">
      <h2 className="text-center">Price Range Distribution</h2>
      <Bar
        data={{
          labels: barChartData.map((d) => d.pricerange), 
          datasets: [
            {
              label: "Number of Items",
              data: barChartData.map((d) => Number(d.count)), 
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
