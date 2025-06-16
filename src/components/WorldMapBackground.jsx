import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const WorldMapBackground = ({ fromCity, toCity }) => {
  // Mock coordinates for cities (in a real app, these would come from a geocoding service)
  const cityCoordinates = {
    'New York': { x: 20, y: 40 },
    'London': { x: 50, y: 30 },
    'Tokyo': { x: 85, y: 35 },
    'Sydney': { x: 90, y: 70 },
    'Paris': { x: 48, y: 32 },
    'Dubai': { x: 65, y: 45 },
    'Singapore': { x: 80, y: 55 },
    'Los Angeles': { x: 10, y: 40 },
    'Mumbai': { x: 70, y: 45 },
    'Cairo': { x: 55, y: 45 },
  };

  // Get coordinates for the cities or use default positions
  const fromCoords = cityCoordinates[fromCity] || { x: 30, y: 40 };
  const toCoords = cityCoordinates[toCity] || { x: 70, y: 40 };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Add more map details here if needed */}
        </svg>
      </div>

      {/* Animated Pins */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute"
        style={{
          left: `${fromCoords.x}%`,
          top: `${fromCoords.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <FaMapMarkerAlt className="text-amber-500 text-2xl" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute"
        style={{
          left: `${toCoords.x}%`,
          top: `${toCoords.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <FaMapMarkerAlt className="text-amber-500 text-2xl" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20" />
        </motion.div>
      </motion.div>

      {/* Connection Line */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          d={`M ${fromCoords.x} ${fromCoords.y} Q 50 50 ${toCoords.x} ${toCoords.y}`}
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          className="text-amber-500"
        />
      </svg>
    </div>
  );
};

export default WorldMapBackground; 