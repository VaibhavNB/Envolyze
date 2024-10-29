import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { EnvironmentProvider } from './context/EnvironmentContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EnvironmentProvider>
      <App />
    </EnvironmentProvider>
  </StrictMode>,
);