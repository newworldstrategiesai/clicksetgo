import React from 'react';
import { Line } from 'react-chartjs-2';

const CallCountChart = () => {
  const dummyData = {
    labels: ['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04', '2024-06-05'],
    datasets: [
      {
        label: 'Call Count',
        data: [10, 15, 20, 25, 30],
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return <Line data={dummyData} />;
};

export default CallCountChart;
