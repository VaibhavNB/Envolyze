import { Line } from 'react-chartjs-2';
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
import { useState, useEffect } from 'react';

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

const AirQualityChart = () => {
  const [res_data, setdata] = useState({
    labels: [],
    pm25: [],
    nox: [],
    o3: [],
  });
  setTimeout(() => {}, 1000);
  useEffect(() => {
    fetch('http://localhost:5000/airdf')
      .then((res) => res.json())
      .then((res_data) => {
        setdata({
          labels: res_data.labels,
          pm25: res_data.pm25,
          nox: res_data.nox,
          o3: res_data.o3,
        })
      })
    }, []
  );

  const data = {
    labels: res_data.labels,
    datasets: [
      {
        label: 'PM2.5',
        data: res_data.pm25,
        borderColor: '#2d8bba',
        backgroundColor: 'rgba(45, 139, 186, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'NO2',
        data: res_data.nox,
        borderColor: '#63c5ea',
        backgroundColor: 'rgba(99, 197, 234, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'O3',
        data: res_data.o3,
        borderColor: '#b8e8ff',
        backgroundColor: 'rgba(99, 197, 234, 0.1)',
        fill: true,
        tension: 0.4,
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
        text: 'Air Quality Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default AirQualityChart;