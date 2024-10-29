import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text } from '@tremor/react';
import { fetchAlerts, updateAlertSettings } from '../services/api';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [settings, setSettings] = useState({
    airQualityThreshold: 50,
    waterQualityThreshold: 70,
    temperatureThreshold: 30,
  });

  useEffect(() => {
    const loadAlerts = async () => {
      const data = await fetchAlerts();
      setAlerts(data);
    };
    loadAlerts();
  }, []);

  const handleSettingChange = async (e) => {
    const { name, value } = e.target;
    const newSettings = { ...settings, [name]: Number(value) };
    setSettings(newSettings);
    await updateAlertSettings(newSettings);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Alert Settings</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Card>
            <Text>Air Quality Threshold (AQI)</Text>
            <input
              type="number"
              name="airQualityThreshold"
              value={settings.airQualityThreshold}
              onChange={handleSettingChange}
              className="mt-2 w-full p-2 border rounded"
            />
          </Card>
          <Card>
            <Text>Water Quality Threshold (WQI)</Text>
            <input
              type="number"
              name="waterQualityThreshold"
              value={settings.waterQualityThreshold}
              onChange={handleSettingChange}
              className="mt-2 w-full p-2 border rounded"
            />
          </Card>
          <Card>
            <Text>Temperature Threshold (°C)</Text>
            <input
              type="number"
              name="temperatureThreshold"
              value={settings.temperatureThreshold}
              onChange={handleSettingChange}
              className="mt-2 w-full p-2 border rounded"
            />
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Title>Recent Alerts</Title>
        <div className="space-y-4 mt-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="font-medium">{alert.title}</Text>
                  <Text className="text-sm text-gray-500">{alert.message}</Text>
                </div>
                <Text className="text-sm text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Alerts;