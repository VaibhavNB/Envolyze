import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AirQuality from './pages/AirQuality';
import WaterQuality from './pages/WaterQuality';
import Temperature from './pages/Temperature';
import Alerts from './pages/Alerts';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AllAlerts from './pages/AllAlerts';
import Admin from './pages/Admin';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/air-quality" element={<AirQuality />} />
                <Route path="/water-quality" element={<WaterQuality />} />
                <Route path="/temperature" element={<Temperature />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/allAlerts" element={<AllAlerts />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </div>
          <Footer/>
          </main>
        </div>
           
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="toast-container"
        />
       
      
      </div>
      <div>

      </div>
    </Router>
  );
}

export default App;