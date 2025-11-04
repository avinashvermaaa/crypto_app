import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalChart = ({ historicalData, coinName }) => {
  if (!historicalData || historicalData.length === 0) {
    return <p>No historical data available.</p>;
  }

  // Prepare chart labels (timestamps) and data (prices)
  const labels = historicalData.map((snapshot) =>
    new Date(snapshot._id).toLocaleTimeString()
  );
  const prices = historicalData.map((snapshot) => snapshot.current_price);

  const data = {
    labels,
    datasets: [
      {
        label: `${coinName} Price (USD)`,
        data: prices,
        fill: true,
        backgroundColor: 'rgba(37, 117, 252, 0.2)',
        borderColor: 'rgba(37, 117, 252, 1)',
        tension: 0.2,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${coinName} Price History`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HistoricalChart;
