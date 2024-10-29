import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const fetchSensorData = async (sensorId) => {
  const response = await api.get(`/sensors/${sensorId}/data`);
  return response.data;
};

export const fetchAlerts = async () => {
  const response = await api.get('/alerts');
  return response.data;
};

export const updateAlertSettings = async (settings) => {
  const response = await api.post('/alerts/settings', settings);
  return response.data;
};

export const fetchEnvironmentalData = async (type, timeRange) => {
  const response = await api.get(`/environmental/${type}`, {
    params: { timeRange },
  });
  return response.data;
};