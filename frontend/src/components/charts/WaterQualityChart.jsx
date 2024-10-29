import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WaterQualityChart = () => {
  const data = {
    labels: ['pH', 'DO', 'BOD', 'Turbidity', 'TDS'],
    datasets: [
      {
        label: 'Current Values',
        data: [7.2, 6.8, 2.5, 4.2, 350],
        backgroundColor: '#1a5f7a',
      },
      {
        label: 'Threshold',
        data: [7.0, 6.0, 3.0, 5.0, 400],
        backgroundColor: '#63c5ea',
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
        text: 'Water Quality Parameters',
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default WaterQualityChart;