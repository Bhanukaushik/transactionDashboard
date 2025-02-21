import React, { useState } from "react";
import TransactionsTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import MonthSelector from "./components/MonthSelector";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [month, setMonth] = useState(3);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded w-75 mx-auto">
        <h1 className="text-center mb-4">📊 Transaction Dashboard</h1>
        <MonthSelector month={month} setMonth={setMonth} />
        <TransactionsTable month={month} />
        <Statistics month={month} />
        <div className="row">
          <div className="col-md-6">
            <BarChart month={month} />
          </div>
          <div className="col-md-6">
            <PieChart month={month} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
