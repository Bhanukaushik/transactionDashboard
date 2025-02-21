const MonthSelector = ({ month, setMonth }) => { // ✅ Use setMonth directly
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Select Month:</label>
      <select
        className="form-select"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))} // ✅ Ensure it passes a number
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
