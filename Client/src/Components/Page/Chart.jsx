import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

function Chart({ profile }) {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week4'],
      datasets: [
        {
          label: '# of rating',
          // data: [0.12, 0.45, 0.12, 0.93],
          data: profile,
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
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
      <div style={{ height: '500px', width: '500px' }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
          }}
        />
      </div>
    </div>
  );
}

export default Chart;
