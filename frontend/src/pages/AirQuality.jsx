import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text, AreaChart } from '@tremor/react';

function GetStats(){
  const [data, setdata] = useState({
    PM25: 0,
    NOX: 0,
    O3: 0,
  });
  useEffect(() => {
    fetch("http://localhost:5000/air")
      .then((res) => res.json()
      .then((data) => {
        setdata({
          PM25: data.pollutants.pm25,
          NOX: data.pollutants.nox,
          O3: data.pollutants.o3,
        });
      }))
  });
  return data;
}


function AirQuality() {
  let data = GetStats();
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Air Quality Monitoring</Title>
        <Text>Real-time air quality measurements and analysis</Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card>
            <Title>PM2.5</Title>
            <Text className="mt-2">Current Level</Text>
            <Text className="text-2xl font-bold">
              {data?.PM25 || 'N/A'} µg/m³
            </Text>
          </Card>
          <Card>
            <Title>NOx</Title>
            <Text className="mt-2">Current Level</Text>
            <Text className="text-2xl font-bold">
              {data?.NOX || 'N/A'} ppb 
            </Text>
          </Card>
          <Card>
            <Title>O3</Title>
            <Text className="mt-2">Current Level</Text>
            <Text className="text-2xl font-bold">
              {data?.O3 || 'N/A'} ppb
            </Text>
          </Card>
        </div>

        {/*

        <Card className="mt-6">
          <Title>24-Hour Trend</Title>
          <AreaChart
            className="mt-4 h-72"
            data={chartData}
            index="date"
            categories={["PM25", "NOx", "O3"]}
            colors={["blue", "red", "green"]}
          />
        </Card>  
        
        */}

      </motion.div>
    </div>
  );
}

export default AirQuality;