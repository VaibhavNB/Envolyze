import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSettings, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [notifications] = useState(3);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white border-b shadow-lg border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ENVOLYZE
            </motion.h1>
          </div>

          <div className="flex items-center space-x-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <button onClick={()=> navigate('/allAlerts')} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <FiBell className="h-5 w-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
            </motion.div>

            

            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={()=> navigate('/admin')} 
            >
              <div className="bg-primary-100 rounded-full p-2">
                <FiUser className="h-5 w-5 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;