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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HistoricalChart = ({ historicalData, coinName }) => {
  if (!historicalData || historicalData.length === 0) {
    return <p>No historical data available.</p>;
  }

  const sortedData = [...historicalData].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const labels = sortedData.map((snapshot) =>
    new Date(snapshot.timestamp).toLocaleString()
  );
  const prices = sortedData.map((snapshot) => snapshot.current_price);

  const data = {
    labels,
    datasets: [
      {
        label: `${coinName} Price (USD)`,
        data: prices,
        fill: true,
        backgroundColor: 'rgba(37, 117, 252, 0.2)',
        borderColor: 'rgba(37, 117, 252, 1)',
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${coinName} Price History` },
    },
    scales: {
      x: {
        title: { display: true, text: 'Time' },
      },
      y: {
        title: { display: true, text: 'Price (USD)' },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HistoricalChart;
