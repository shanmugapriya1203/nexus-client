// AlertChart.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AlertChart = ({ data, options }) => {
  return (
    <div style={{ width: "50%", height: "400px", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AlertChart;
