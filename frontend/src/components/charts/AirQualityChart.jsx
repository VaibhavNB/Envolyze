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
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'PM2.5',
        data: [35, 42, 50, 45, 38, 40],
        borderColor: '#2d8bba',
        backgroundColor: 'rgba(45, 139, 186, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'NOx',
        data: [20, 25, 30, 35, 28, 22],
        borderColor: '#63c5ea',
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