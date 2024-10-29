import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text, BarChart } from '@tremor/react';

function GetStats(){
  const [data, setdata] = useState({
    ph: 0,
    do: 0,
    turbidity: 0,
  });
  useEffect(() => {
    fetch("http://localhost:5000/water")
      .then((res) => res.json()
      .then((data) => {
        setdata({
          ph: data.parameters.ph,
          do: data.parameters.do,
          turbidity: data.parameters.turbidity,
        });
      }))
  });
  return data;
}

function WaterQuality() {
  let data = GetStats();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Water Quality Monitoring</Title>
        <Text>Real-time water quality parameters</Text>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <Title>pH Level</Title>
            <Text className="mt-2">Current Reading</Text>
            <Text className="text-2xl font-bold">
              {data?.ph || 'N/A'}
            </Text>
          </Card>
          <Card>
            <Title>Dissolved Oxygen</Title>
            <Text className="mt-2">Current Level</Text>
            <Text className="text-2xl font-bold">
              {data?.do || 'N/A'} mg/L
            </Text>
          </Card>
          <Card>
            <Title>Turbidity</Title>
            <Text className="mt-2">Current Level</Text>
            <Text className="text-2xl font-bold">
              {data?.turbidity || 'N/A'} NTU
            </Text>
          </Card>
        </div>
        
        <Card className="mt-6">
          <Title>Parameter Comparison</Title>
          <BarChart
            className="mt-4 h-72"
            data={[
              {
                parameter: 'pH',
                value: data?.ph || 0,
                threshold: 7.0,
              },
              {
                parameter: 'DO',
                value: data?.do || 0,
                threshold: 6.0,
              },
              {
                parameter: 'Turbidity',
                value: data?.turbidity || 0,
                threshold: 5.0,
              },
            ]}
            index="parameter"
            categories={["value", "threshold"]}
            colors={["blue", "red"]}
          />
        </Card> 
        
      </motion.div>
    </div>
  );
}

export default WaterQuality;