import { FiWind, FiDroplet, FiThermometer, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';
import StatsCard from '../components/cards/StatsCard';
import AirQualityChart from '../components/charts/AirQualityChart';
import WaterQualityChart from '../components/charts/WaterQualityChart';
import SensorMap from '../components/maps/SensorMap';
import { useState, useEffect } from 'react';

function GetStats(){
  const [data, setdata] = useState({
    AQI: 0,
    WQI: 0,
    Temp: 0,
    AS: 0,
  });
  useEffect(() => {
    fetch("http://localhost:5000/allmetrics")
      .then((res) => res.json()
      .then((data) => {
        setdata({
          AQI: data.AQI,
          WQI: data.WQI,
          Temp: data.Temp,
          AS: data.AS,
        });
      }))
  });
  return data;
}

const Dashboard = () => {
  let data = GetStats();
  const stats = [
    { 
      title: 'Air Quality Index',
      value: String(data.AQI),
      icon: FiWind,
      trend: -5.2,
      color: 'text-blue-500'
    },
    {
      title: 'Water Quality Index',
      value: String(data.WQI),
      icon: FiDroplet,
      trend: 2.1,
      color: 'text-green-500'
    },
    {
      title: 'Temperature',
      value: String(data.Temp),
      icon: FiThermometer,
      trend: 1.8,
      color: 'text-orange-500'
    },
    {
      title: 'Active Sensors',
      value: String(data.AS)+"/25",
      icon: FiActivity,
      trend: 0,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Environmental Monitoring Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            {...stat}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AirQualityChart />
        <WaterQualityChart />
      </div>

      <div className="w-full">
        <SensorMap />
      </div>
    </div>
  );
};

export default Dashboard;