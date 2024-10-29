import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatsCard = ({ title, value, icon: Icon, trend, color }) => {
  const isPositive = trend > 0;
  
  return (
    <motion.div
      className="card hover:translate-y-[-4px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div>
            <p className="stats-label">{title}</p>
            <p className="stats-value">{value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <FiArrowUp /> : <FiArrowDown />}
          <span className="text-sm font-medium">
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;