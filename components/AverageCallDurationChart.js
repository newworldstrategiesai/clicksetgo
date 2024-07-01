import React from 'react';
import { Line } from 'react-chartjs-2';

const AverageCallDurationChart = () => {
  const dummyData = {
    labels: ['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04', '2024-06-05'],
    datasets: [
      {
        label: 'Average Call Duration (minutes)',
        data: [1.5, 2.0, 2.5, 3.0, 3.5],
        fill: false,
        backgroundColor: 'rgb(255, 206, 86)',
        borderColor: 'rgba(255, 206, 86, 0.2)',
      },
    ],
  };

  return <Line data={dummyData} />;
};

export default AverageCallDurationChart;
