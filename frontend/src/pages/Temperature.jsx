import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text, LineChart } from '@tremor/react';

function GetStats(){
  const [data, setdata] = useState({
    Temperature: 0,
    Humidity: 0,
  });
  useEffect(() => {
    fetch("http://localhost:5000/temp")
      .then((res) => res.json()
      .then((data) => {
        setdata({
          Temperature: data.Temp,
          Humidity: data.humidity,
        });
      }))
  });
  return data;
}

function Temperature() {
  let data = GetStats();
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Temperature Monitoring</Title>
        <Text>Real-time temperature and humidity measurements</Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <Title>Temperature</Title>
            <Text className="mt-2">Current Reading</Text>
            <Text className="text-2xl font-bold">
              {data?.Temperature || 'N/A'}°C
            </Text>
          </Card>
          <Card>
            <Title>Humidity</Title>
            <Text className="mt-2">Current Level</Text>
            <Text className="text-2xl font-bold">
              {data?.Humidity || 'N/A'}%
            </Text>
          </Card>
        </div>
        
        {/*         
        <Card className="mt-6">
          <Title>24-Hour Trend</Title>
          <LineChart
            className="mt-4 h-72"
            data={chartData}
            index="date"
            categories={["temperature", "humidity"]}
            colors={["red", "blue"]}
            valueFormatter={{
              temperature: (value) => `${value}°C`,
              humidity: (value) => `${value}%`,
            }}
          />
        </Card> 
        
        */}
      </motion.div>
    </div>
  );
}

export default Temperature;