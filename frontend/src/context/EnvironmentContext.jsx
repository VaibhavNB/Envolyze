import { createContext, useContext, useEffect, useState } from 'react';
import { fetchEnvironmentalData } from '../services/api';
import socketService from '../services/socket';

const EnvironmentContext = createContext(null);

export function EnvironmentProvider({ children }) {
  const [environmentalData, setEnvironmentalData] = useState({
    air: [],
    water: [],
    temperature: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setError(null);
        const [airData, waterData, tempData] = await Promise.all([
          fetchEnvironmentalData('air', '24h'),
          fetchEnvironmentalData('water', '24h'),
          fetchEnvironmentalData('temperature', '24h'),
        ]);

        // Only update state if component is still mounted
        if (mounted) {
          // Ensure we're only storing serializable data
          setEnvironmentalData({
            air: Array.isArray(airData) ? airData : [],
            water: Array.isArray(waterData) ? waterData : [],
            temperature: Array.isArray(tempData) ? tempData : [],
          });
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          console.error('Error fetching environmental data:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Initialize socket connection
    try {
      socketService.connect();
    } catch (err) {
      console.error('Socket connection error:', err);
    }

    // Subscribe to socket updates
    const subscriptionId = socketService.subscribe((data) => {
      if (mounted && data && typeof data === 'object') {
        // Ensure we're only updating with valid data
        setEnvironmentalData(prev => ({
          ...prev,
          [data.type]: Array.isArray(data.values) ? data.values : [],
        }));
      }
    });

    // Initial data fetch
    fetchData();

    // Cleanup function
    return () => {
      mounted = false;
      socketService.unsubscribe(subscriptionId);
      socketService.disconnect();
    };
  }, []);

  const value = {
    environmentalData,
    loading,
    error,
    // Add a refresh method for manual data updates
    refresh: async () => {
      setLoading(true);
      try {
        const [airData, waterData, tempData] = await Promise.all([
          fetchEnvironmentalData('air', '24h'),
          fetchEnvironmentalData('water', '24h'),
          fetchEnvironmentalData('temperature', '24h'),
        ]);

        setEnvironmentalData({
          air: Array.isArray(airData) ? airData : [],
          water: Array.isArray(waterData) ? waterData : [],
          temperature: Array.isArray(tempData) ? tempData : [],
        });
      } catch (err) {
        setError(err.message);
        console.error('Error refreshing environmental data:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
}

// Custom hook with proper type checking
export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (context === null) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
};