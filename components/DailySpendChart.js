import React from 'react';
import { Line } from 'react-chartjs-2';

const DailySpendChart = () => {
  const dummyData = {
    labels: ['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04', '2024-06-05'],
    datasets: [
      {
        label: 'Daily Spend ($)',
        data: [5, 10, 15, 20, 25],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return <Line data={dummyData} />;
};

export default DailySpendChart;
