import React from 'react';
import { Line } from 'react-chartjs-2';

const TotalMinutesChart = () => {
  const dummyData = {
    labels: ['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04', '2024-06-05'],
    datasets: [
      {
        label: 'Total Minutes',
        data: [30, 20, 40, 50, 60],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={dummyData} />;
};

export default TotalMinutesChart;
