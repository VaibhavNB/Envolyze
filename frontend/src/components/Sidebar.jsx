import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiWind, FiDroplet, FiThermometer, FiBell } from 'react-icons/fi';

const menuItems = [
  { icon: FiHome, text: 'Dashboard', path: '/' },
  { icon: FiWind, text: 'Air Quality', path: '/air-quality' },
  { icon: FiDroplet, text: 'Water Quality', path: '/water-quality' },
  { icon: FiThermometer, text: 'Temperature', path: '/temperature' },
  { icon: FiBell, text: 'Alerts Setting', path: '/alerts' },
];

function Sidebar() {
  return (
    <motion.div 
      className="w-64 bg-white border-r border-gray-100"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col h-full">
        <div className="flex w-full items-center  justify-center  border-b border-gray-100">
          <motion.img 
            src={"/envolyze.jpeg"} 
            alt="ENVOLYZE Logo" 
            className="h-18 "
            
          />
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{item.text}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-primary-50 rounded-xl p-4">
            <p className="text-sm font-medium text-primary-900">System Status</p>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-slow" />
              <span className="text-sm text-primary-700">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;