import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ profile }) {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          label: '# of rating',
          // data: [0.12, 0.45, 0.12, 0.93],
          data: profile,
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
            '#2FDE00',
            '#00A6B4',
            '#6800B4',
          ],
          hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F',
          ],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <div
        style={{
          height: '300px',
          width: '300px',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Pie
          data={chartData}
          options={{
            responsive: true,
          }}
        />
      </div>
    </div>
  );
}

export default PieChart;
