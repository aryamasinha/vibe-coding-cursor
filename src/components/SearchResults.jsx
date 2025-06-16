import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaClock, FaDollarSign, FaStar, FaFilter, FaSun, FaMoon, FaCloudSun, FaCloudMoon, FaSearch } from 'react-icons/fa';
import WorldMapBackground from './WorldMapBackground';
import WorldMap from './WorldMap';
import Header from './Header';
import Footer from './Footer';
import Lottie from 'lottie-react';

const SearchResults = ({ searchParams, onBack }) => {
  const [sortBy, setSortBy] = useState('smart-mix');
  const [filters, setFilters] = useState({
    maxPrice: 1000,
    minPrice: 0,
    minRating: 0,
    stops: 'all',
    timePeriod: 'morning',
    duration: 'all',
    airlines: [],
    departureTime: { min: '00:00', max: '23:59' },
    arrivalTime: { min: '00:00', max: '23:59' },
    passengers: 1,
  });
  const [expandedFlight, setExpandedFlight] = useState(null);

  // Mock flight data - in a real app, this would come from an API
  const flights = [
    {
      id: 1,
      airline: 'SkyWings',
      flightNumber: 'SW123',
      departure: '06:00 AM',
      arrival: '08:30 AM',
      duration: '2h 30m',
      price: 299,
      stops: 0,
      rating: 4.5,
    },
    {
      id: 2,
      airline: 'AirGlobal',
      flightNumber: 'AG456',
      departure: '07:30 AM',
      arrival: '10:15 AM',
      duration: '2h 45m',
      price: 349,
      stops: 1,
      rating: 4.2,
    },
    {
      id: 3,
      airline: 'JetExpress',
      flightNumber: 'JE789',
      departure: '08:15 AM',
      arrival: '10:45 AM',
      duration: '2h 30m',
      price: 279,
      stops: 0,
      rating: 4.7,
    },
    {
      id: 4,
      airline: 'Pacific Airways',
      flightNumber: 'PA234',
      departure: '09:00 AM',
      arrival: '11:45 AM',
      duration: '2h 45m',
      price: 329,
      stops: 1,
      rating: 4.3,
    },
    {
      id: 5,
      airline: 'Global Wings',
      flightNumber: 'GW567',
      departure: '10:30 AM',
      arrival: '01:00 PM',
      duration: '2h 30m',
      price: 289,
      stops: 0,
      rating: 4.6,
    },
    {
      id: 6,
      airline: 'Star Airlines',
      flightNumber: 'SA890',
      departure: '11:15 AM',
      arrival: '02:00 PM',
      duration: '2h 45m',
      price: 359,
      stops: 1,
      rating: 4.4,
    },
    {
      id: 7,
      airline: 'Royal Airways',
      flightNumber: 'RA123',
      departure: '12:00 PM',
      arrival: '02:30 PM',
      duration: '2h 30m',
      price: 319,
      stops: 0,
      rating: 4.8,
    },
    {
      id: 8,
      airline: 'Elite Flights',
      flightNumber: 'EF456',
      departure: '01:30 PM',
      arrival: '04:15 PM',
      duration: '2h 45m',
      price: 379,
      stops: 1,
      rating: 4.5,
    },
    {
      id: 9,
      airline: 'Premium Air',
      flightNumber: 'PA789',
      departure: '02:15 PM',
      arrival: '04:45 PM',
      duration: '2h 30m',
      price: 299,
      stops: 0,
      rating: 4.7,
    },
    {
      id: 10,
      airline: 'SkyBridge',
      flightNumber: 'SB234',
      departure: '03:00 PM',
      arrival: '05:45 PM',
      duration: '2h 45m',
      price: 339,
      stops: 1,
      rating: 4.3,
    },
    {
      id: 11,
      airline: 'Horizon Air',
      flightNumber: 'HA567',
      departure: '04:30 PM',
      arrival: '07:00 PM',
      duration: '2h 30m',
      price: 269,
      stops: 0,
      rating: 4.6,
    },
    {
      id: 12,
      airline: 'Nova Airways',
      flightNumber: 'NA890',
      departure: '05:15 PM',
      arrival: '08:00 PM',
      duration: '2h 45m',
      price: 349,
      stops: 1,
      rating: 4.4,
    },
    {
      id: 13,
      airline: 'Zenith Air',
      flightNumber: 'ZA123',
      departure: '06:00 PM',
      arrival: '08:30 PM',
      duration: '2h 30m',
      price: 309,
      stops: 0,
      rating: 4.8,
    },
    {
      id: 14,
      airline: 'Apex Airlines',
      flightNumber: 'AA456',
      departure: '07:30 PM',
      arrival: '10:15 PM',
      duration: '2h 45m',
      price: 369,
      stops: 1,
      rating: 4.5,
    },
    {
      id: 15,
      airline: 'Summit Air',
      flightNumber: 'SA789',
      departure: '08:15 PM',
      arrival: '10:45 PM',
      duration: '2h 30m',
      price: 289,
      stops: 0,
      rating: 4.7,
    },
    {
      id: 16,
      airline: 'Peak Airways',
      flightNumber: 'PA234',
      departure: '09:00 PM',
      arrival: '11:45 PM',
      duration: '2h 45m',
      price: 329,
      stops: 1,
      rating: 4.3,
    },
    {
      id: 17,
      airline: 'Crest Airlines',
      flightNumber: 'CA567',
      departure: '10:30 PM',
      arrival: '01:00 AM',
      duration: '2h 30m',
      price: 259,
      stops: 0,
      rating: 4.6,
    },
    {
      id: 18,
      airline: 'Pinnacle Air',
      flightNumber: 'PA890',
      departure: '11:15 PM',
      arrival: '02:00 AM',
      duration: '2h 45m',
      price: 339,
      stops: 1,
      rating: 4.4,
    },
    {
      id: 19,
      airline: 'Vertex Airways',
      flightNumber: 'VA123',
      departure: '12:00 AM',
      arrival: '02:30 AM',
      duration: '2h 30m',
      price: 299,
      stops: 0,
      rating: 4.8,
    },
    {
      id: 20,
      airline: 'Apex Express',
      flightNumber: 'AE456',
      departure: '01:30 AM',
      arrival: '04:15 AM',
      duration: '2h 45m',
      price: 359,
      stops: 1,
      rating: 4.5,
    },
    {
      id: 21,
      airline: 'Summit Express',
      flightNumber: 'SE789',
      departure: '02:15 AM',
      arrival: '04:45 AM',
      duration: '2h 30m',
      price: 279,
      stops: 0,
      rating: 4.7,
    },
    {
      id: 22,
      airline: 'Peak Express',
      flightNumber: 'PE234',
      departure: '03:00 AM',
      arrival: '05:45 AM',
      duration: '2h 45m',
      price: 319,
      stops: 1,
      rating: 4.3,
    },
    {
      id: 23,
      airline: 'Crest Express',
      flightNumber: 'CE567',
      departure: '04:30 AM',
      arrival: '07:00 AM',
      duration: '2h 30m',
      price: 249,
      stops: 0,
      rating: 4.6,
    },
    {
      id: 24,
      airline: 'Pinnacle Express',
      flightNumber: 'PE890',
      departure: '05:15 AM',
      arrival: '08:00 AM',
      duration: '2h 45m',
      price: 329,
      stops: 1,
      rating: 4.4,
    },
    {
      id: 25,
      airline: 'Vertex Express',
      flightNumber: 'VE123',
      departure: '06:00 AM',
      arrival: '08:30 AM',
      duration: '2h 30m',
      price: 289,
      stops: 0,
      rating: 4.8,
    },
    {
      id: 26,
      airline: 'Apex Connect',
      flightNumber: 'AC456',
      departure: '07:30 AM',
      arrival: '10:15 AM',
      duration: '2h 45m',
      price: 349,
      stops: 1,
      rating: 4.5,
    },
    {
      id: 27,
      airline: 'Summit Connect',
      flightNumber: 'SC789',
      departure: '08:15 AM',
      arrival: '10:45 AM',
      duration: '2h 30m',
      price: 269,
      stops: 0,
      rating: 4.7,
    },
    {
      id: 28,
      airline: 'Peak Connect',
      flightNumber: 'PC234',
      departure: '09:00 AM',
      arrival: '11:45 AM',
      duration: '2h 45m',
      price: 309,
      stops: 1,
      rating: 4.3,
    },
    {
      id: 29,
      airline: 'Crest Connect',
      flightNumber: 'CC567',
      departure: '10:30 AM',
      arrival: '01:00 PM',
      duration: '2h 30m',
      price: 239,
      stops: 0,
      rating: 4.6,
    },
    {
      id: 30,
      airline: 'Pinnacle Connect',
      flightNumber: 'PC890',
      departure: '11:15 AM',
      arrival: '02:00 PM',
      duration: '2h 45m',
      price: 319,
      stops: 1,
      rating: 4.4,
    },
    {
      id: 31,
      airline: 'Vertex Connect',
      flightNumber: 'VC123',
      departure: '12:00 PM',
      arrival: '02:30 PM',
      duration: '2h 30m',
      price: 279,
      stops: 0,
      rating: 4.8,
    },
    {
      id: 32,
      airline: 'Apex Direct',
      flightNumber: 'AD456',
      departure: '01:30 PM',
      arrival: '04:15 PM',
      duration: '2h 45m',
      price: 339,
      stops: 1,
      rating: 4.5,
    },
    {
      id: 33,
      airline: 'Summit Direct',
      flightNumber: 'SD789',
      departure: '02:15 PM',
      arrival: '04:45 PM',
      duration: '2h 30m',
      price: 259,
      stops: 0,
      rating: 4.7,
    },
    {
      id: 34,
      airline: 'Peak Direct',
      flightNumber: 'PD234',
      departure: '03:00 PM',
      arrival: '05:45 PM',
      duration: '2h 45m',
      price: 299,
      stops: 1,
      rating: 4.3,
    },
    {
      id: 35,
      airline: 'Crest Direct',
      flightNumber: 'CD567',
      departure: '04:30 PM',
      arrival: '07:00 PM',
      duration: '2h 30m',
      price: 229,
      stops: 0,
      rating: 4.6,
    },
    {
      id: 36,
      airline: 'Pinnacle Direct',
      flightNumber: 'PD890',
      departure: '05:15 PM',
      arrival: '08:00 PM',
      duration: '2h 45m',
      price: 309,
      stops: 1,
      rating: 4.4,
    },
    {
      id: 37,
      airline: 'Vertex Direct',
      flightNumber: 'VD123',
      departure: '06:00 PM',
      arrival: '08:30 PM',
      duration: '2h 30m',
      price: 269,
      stops: 0,
      rating: 4.8,
    },
    {
      id: 38,
      airline: 'Apex Premium',
      flightNumber: 'AP456',
      departure: '07:30 PM',
      arrival: '10:15 PM',
      duration: '2h 45m',
      price: 329,
      stops: 1,
      rating: 4.5,
    },
    {
      id: 39,
      airline: 'Summit Premium',
      flightNumber: 'SP789',
      departure: '08:15 PM',
      arrival: '10:45 PM',
      duration: '2h 30m',
      price: 249,
      stops: 0,
      rating: 4.7,
    },
    {
      id: 40,
      airline: 'Peak Premium',
      flightNumber: 'PP234',
      departure: '09:00 PM',
      arrival: '11:45 PM',
      duration: '2h 45m',
      price: 289,
      stops: 1,
      rating: 4.3,
    }
  ];

  // Get unique airlines for filter
  const uniqueAirlines = useMemo(() => {
    return [...new Set(flights.map(flight => flight.airline))].sort();
  }, [flights]);

  // Time period ranges
  const timePeriods = [
    { id: 'early-morning', label: 'Early Morning', range: '12 AM - 6 AM', start: '00:00', end: '05:59' },
    { id: 'morning', label: 'Morning', range: '6 AM - 12 PM', start: '06:00', end: '11:59' },
    { id: 'afternoon', label: 'Afternoon', range: '12 PM - 6 PM', start: '12:00', end: '17:59' },
    { id: 'evening', label: 'Evening', range: '6 PM - 12 AM', start: '18:00', end: '23:59' }
  ];

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatMonthAndDay = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to convert time to minutes for slider
  const timeToMinutes = (time) => {
    // Handle 12-hour format (e.g., "06:00 AM")
    if (time.includes('AM') || time.includes('PM')) {
      const [timeStr, period] = time.split(' ');
      let [hours, minutes] = timeStr.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    }
    // Handle 24-hour format (e.g., "06:00")
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Helper function to convert minutes to time string
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const filteredAndSortedFlights = useMemo(() => {
    let result = [...flights];

    // Apply filters
    result = result.filter(flight => {
      // Price filter
      const priceInRange = flight.price >= filters.minPrice && flight.price <= filters.maxPrice;
      
      // Rating filter
      const ratingMatch = flight.rating >= filters.minRating;
      
      // Stops filter
      const stopsMatch = filters.stops === 'all' || 
        (filters.stops === 'direct' && flight.stops === 0) ||
        (filters.stops === 'one-stop' && flight.stops === 1);
      
      // Time period filter
      const timeMatch = filters.timePeriod === 'all' || (() => {
        const period = timePeriods.find(p => p.id === filters.timePeriod);
        if (!period) return true;
        const departureTimeMinutes = timeToMinutes(flight.departure);
        const periodStartMinutes = timeToMinutes(period.start);
        const periodEndMinutes = timeToMinutes(period.end);
        return departureTimeMinutes >= periodStartMinutes && departureTimeMinutes <= periodEndMinutes;
      })();
      
      // Duration filter
      const durationMatch = filters.duration === 'all' || (() => {
        const duration = parseInt(flight.duration);
        switch(filters.duration) {
          case 'short': return duration <= 2;
          case 'medium': return duration > 2 && duration <= 3;
          case 'long': return duration > 3;
          default: return true;
        }
      })();
      
      // Airlines filter
      const airlineMatch = filters.airlines.length === 0 || filters.airlines.includes(flight.airline);

      // Passengers filter (hypothetical capacity for mock data)
      const passengersMatch = filters.passengers <= 5; // Assuming max 5 passengers for mock data, adjust as needed
      
      // Departure time filter
      const departureMinutes = timeToMinutes(flight.departure);
      const departureMinMinutes = timeToMinutes(filters.departureTime.min);
      const departureMaxMinutes = timeToMinutes(filters.departureTime.max);
      const departureMatch = departureMinutes >= departureMinMinutes && departureMinutes <= departureMaxMinutes;
      
      // Arrival time filter
      const arrivalMinutes = timeToMinutes(flight.arrival);
      const arrivalMinMinutes = timeToMinutes(filters.arrivalTime.min);
      const arrivalMaxMinutes = timeToMinutes(filters.arrivalTime.max);
      const arrivalMatch = arrivalMinutes >= arrivalMinMinutes && arrivalMinutes <= arrivalMaxMinutes;

      return priceInRange && ratingMatch && stopsMatch && timeMatch && durationMatch && airlineMatch && passengersMatch && departureMatch && arrivalMatch;
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'rating':
          return b.rating - a.rating;
        case 'smart-mix':
          // For Smart Mix, we can define a custom sorting logic.
          // For now, let's prioritize a balance of price and rating.
          // Lower price and higher rating are better.
          return (a.price / a.rating) - (b.price / b.rating);
        default:
          return 0;
      }
    });

    return result;
  }, [flights, sortBy, filters]);

  console.log('Filtered and sorted flights count:', filteredAndSortedFlights.length); // Temporary log for debugging

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100"
    >
      <Header />
      <div className="mt-4">
        <WorldMap />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24"
        >
          <WorldMapBackground 
            fromCity={searchParams.fromCity} 
            toCity={searchParams.toCity} 
          />
          <motion.div 
            className="w-full max-w-7xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {/* Filters Sidebar */}
              <motion.div 
                className="w-72 flex-shrink-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <motion.div 
                  className="glass-card p-4"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-amber-900">Filters</h3>
                    <span className="text-sm text-amber-700">
                      {filteredAndSortedFlights.length} results
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Passengers Filter */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Passengers</label>
                      <select
                        value={filters.passengers}
                        onChange={(e) => setFilters({ ...filters, passengers: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                      >
                        {[...Array(9).keys()].map(i => (
                          <option key={i + 1} value={i + 1}>{i + 1} Passenger{i === 0 ? '' : 's'}</option>
                        ))}
                      </select>
                    </div>

                    {/* Time Period */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Time Period</label>
                      <div className="grid grid-cols-2 gap-3">
                        {timePeriods.map(period => (
                          <motion.label
                            key={period.id}
                            className="relative block aspect-[4/3]"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="timePeriod"
                              value={period.id}
                              checked={filters.timePeriod === period.id}
                              onChange={(e) => setFilters({ ...filters, timePeriod: e.target.value })}
                              className="peer sr-only"
                            />
                            <motion.div
                              className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-lg border-2 border-amber-200 bg-white cursor-pointer"
                              animate={{
                                borderColor: filters.timePeriod === period.id ? '#f59e0b' : '#fcd34d',
                                backgroundColor: filters.timePeriod === period.id ? '#fffbeb' : 'white'
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.div
                                className="text-amber-500 mb-1"
                                animate={{
                                  scale: filters.timePeriod === period.id ? 1.1 : 1,
                                  rotate: filters.timePeriod === period.id ? [0, -5, 5, 0] : 0
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {period.id === 'early-morning' && <FaMoon className="w-4 h-4" />}
                                {period.id === 'morning' && <FaCloudSun className="w-4 h-4" />}
                                {period.id === 'afternoon' && <FaSun className="w-4 h-4" />}
                                {period.id === 'evening' && <FaCloudMoon className="w-4 h-4" />}
                              </motion.div>
                              <motion.span
                                className="text-amber-900 font-medium text-center text-sm"
                                animate={{
                                  y: filters.timePeriod === period.id ? -2 : 0
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {period.label}
                              </motion.span>
                              <motion.span
                                className="text-amber-600 text-xs mt-0.5 text-center"
                                animate={{
                                  opacity: filters.timePeriod === period.id ? 1 : 0.8
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {period.range}
                              </motion.span>
                            </motion.div>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Price Range</label>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="flex justify-between mb-2">
                            <span className="text-amber-600 text-sm">${filters.minPrice}</span>
                            <span className="text-amber-600 text-sm">${filters.maxPrice}</span>
                          </div>
                          <div className="relative h-2">
                            <div className="absolute w-full h-2 bg-amber-200 rounded-full"></div>
                            <motion.div 
                              className="absolute h-2 bg-amber-500 rounded-full"
                              style={{
                                left: `${(filters.minPrice / 1000) * 100}%`,
                                right: `${100 - (filters.maxPrice / 1000) * 100}%`
                              }}
                            />
                            <input
                              type="range"
                              min="0"
                              max="1000"
                              value={filters.minPrice}
                              onChange={(e) => {
                                const newMin = Number(e.target.value);
                                if (newMin <= filters.maxPrice) {
                                  setFilters({ ...filters, minPrice: newMin });
                                }
                              }}
                              className="absolute w-full h-2 opacity-0 cursor-pointer"
                            />
                            <input
                              type="range"
                              min="0"
                              max="1000"
                              value={filters.maxPrice}
                              onChange={(e) => {
                                const newMax = Number(e.target.value);
                                if (newMax >= filters.minPrice) {
                                  setFilters({ ...filters, maxPrice: newMax });
                                }
                              }}
                              className="absolute w-full h-2 opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <motion.div 
                            className="flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xs text-amber-600 mb-1">Min Price</div>
                            <div className="flex items-center">
                              <span className="text-amber-500 mr-1">$</span>
                              <span className="text-amber-900 font-medium">{filters.minPrice}</span>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xs text-amber-600 mb-1">Max Price</div>
                            <div className="flex items-center">
                              <span className="text-amber-500 mr-1">$</span>
                              <span className="text-amber-900 font-medium">{filters.maxPrice}</span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Min Rating</label>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="flex justify-between mb-2">
                            <span className="text-amber-600 text-sm">0</span>
                            <span className="text-amber-600 text-sm">5</span>
                          </div>
                          <div className="relative h-2">
                            <div className="absolute w-full h-2 bg-amber-200 rounded-full"></div>
                            <motion.div 
                              className="absolute h-2 bg-amber-500 rounded-full"
                              style={{
                                width: `${(filters.minRating / 5) * 100}%`
                              }}
                            />
                            <input
                              type="range"
                              min="0"
                              max="5"
                              step="0.1"
                              value={filters.minRating}
                              onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                              className="absolute w-full h-2 opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>
                        <motion.div 
                          className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="text-xs text-amber-600 mb-1">Minimum Rating</div>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-amber-900 font-medium">{filters.minRating}</span>
                            <FaStar className="text-amber-500 w-4 h-4" />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Stops */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Stops</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'all', label: 'All' },
                          { value: 'direct', label: 'Direct' },
                          { value: 'one-stop', label: '1 Stop' }
                        ].map(option => (
                          <label key={option.value} className="relative">
                            <input
                              type="radio"
                              name="stops"
                              value={option.value}
                              checked={filters.stops === option.value}
                              onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
                              className="peer sr-only"
                            />
                            <div className="flex items-center justify-center p-2 rounded-lg border-2 border-amber-200 bg-white cursor-pointer transition-all peer-checked:border-amber-500 peer-checked:bg-amber-50 hover:border-amber-300">
                              <span className="text-amber-900 font-medium">{option.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Duration</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'short', label: 'Short', desc: '≤ 2h' },
                          { value: 'medium', label: 'Medium', desc: '2-3h' },
                          { value: 'long', label: 'Long', desc: '&gt; 3h' }
                        ].map(option => (
                          <label key={option.value} className="relative">
                            <input
                              type="radio"
                              name="duration"
                              value={option.value}
                              checked={filters.duration === option.value}
                              onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                              className="peer sr-only"
                            />
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-amber-200 bg-white cursor-pointer transition-all peer-checked:border-amber-500 peer-checked:bg-amber-50 hover:border-amber-300">
                              <span className="text-amber-900 font-medium">{option.label}</span>
                              <span className="text-amber-600 text-xs mt-1" dangerouslySetInnerHTML={{ __html: option.desc }} />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Airlines */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Airlines</label>
                      <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                        {uniqueAirlines.map(airline => (
                          <label key={airline} className="flex items-center gap-2 p-2 rounded-lg hover:bg-amber-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.airlines.includes(airline)}
                              onChange={(e) => {
                                const newAirlines = e.target.checked
                                  ? [...filters.airlines, airline]
                                  : filters.airlines.filter(a => a !== airline);
                                setFilters({ ...filters, airlines: newAirlines });
                              }}
                              className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="text-amber-900">{airline}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Departure Time Filter */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Departure Time</label>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="flex justify-between mb-2">
                            <span className="text-amber-600 text-sm">{filters.departureTime.min}</span>
                            <span className="text-amber-600 text-sm">{filters.departureTime.max}</span>
                          </div>
                          <div className="relative h-2">
                            <div className="absolute w-full h-2 bg-amber-200 rounded-full"></div>
                            <motion.div 
                              className="absolute h-2 bg-amber-500 rounded-full"
                              style={{
                                left: `${(timeToMinutes(filters.departureTime.min) / (24 * 60)) * 100}%`,
                                right: `${100 - (timeToMinutes(filters.departureTime.max) / (24 * 60)) * 100}%`
                              }}
                            />
                            <input
                              type="range"
                              min="0"
                              max={24 * 60}
                              value={timeToMinutes(filters.departureTime.min)}
                              onChange={(e) => {
                                const newMin = minutesToTime(Number(e.target.value));
                                if (timeToMinutes(newMin) <= timeToMinutes(filters.departureTime.max)) {
                                  setFilters({ ...filters, departureTime: { ...filters.departureTime, min: newMin } });
                                }
                              }}
                              className="absolute w-full h-2 opacity-0 cursor-pointer"
                            />
                            <input
                              type="range"
                              min="0"
                              max={24 * 60}
                              value={timeToMinutes(filters.departureTime.max)}
                              onChange={(e) => {
                                const newMax = minutesToTime(Number(e.target.value));
                                if (timeToMinutes(newMax) >= timeToMinutes(filters.departureTime.min)) {
                                  setFilters({ ...filters, departureTime: { ...filters.departureTime, max: newMax } });
                                }
                              }}
                              className="absolute w-full h-2 opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <motion.div 
                            className="flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xs text-amber-600 mb-1">Earliest Departure</div>
                            <div className="text-amber-900 font-medium">{filters.departureTime.min}</div>
                          </motion.div>
                          <motion.div 
                            className="flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xs text-amber-600 mb-1">Latest Departure</div>
                            <div className="text-amber-900 font-medium">{filters.departureTime.max}</div>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Arrival Time Filter */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Arrival Time</label>
                      <div className="space-y-4">
                        <div className="relative">
                          <div className="flex justify-between mb-2">
                            <span className="text-amber-600 text-sm">{filters.arrivalTime.min}</span>
                            <span className="text-amber-600 text-sm">{filters.arrivalTime.max}</span>
                          </div>
                          <div className="relative h-2">
                            <div className="absolute w-full h-2 bg-amber-200 rounded-full"></div>
                            <motion.div 
                              className="absolute h-2 bg-amber-500 rounded-full"
                              style={{
                                left: `${(timeToMinutes(filters.arrivalTime.min) / (24 * 60)) * 100}%`,
                                right: `${100 - (timeToMinutes(filters.arrivalTime.max) / (24 * 60)) * 100}%`
                              }}
                            />
                            <input
                              type="range"
                              min="0"
                              max={24 * 60}
                              value={timeToMinutes(filters.arrivalTime.min)}
                              onChange={(e) => {
                                const newMin = minutesToTime(Number(e.target.value));
                                if (timeToMinutes(newMin) <= timeToMinutes(filters.arrivalTime.max)) {
                                  setFilters({ ...filters, arrivalTime: { ...filters.arrivalTime, min: newMin } });
                                }
                              }}
                              className="absolute w-full h-2 opacity-0 cursor-pointer"
                            />
                            <input
                              type="range"
                              min="0"
                              max={24 * 60}
                              value={timeToMinutes(filters.arrivalTime.max)}
                              onChange={(e) => {
                                const newMax = minutesToTime(Number(e.target.value));
                                if (timeToMinutes(newMax) >= timeToMinutes(filters.arrivalTime.min)) {
                                  setFilters({ ...filters, arrivalTime: { ...filters.arrivalTime, max: newMax } });
                                }
                              }}
                              className="absolute w-full h-2 opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center gap-4">
                          <motion.div 
                            className="flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xs text-amber-600 mb-1">Earliest Arrival</div>
                            <div className="text-amber-900 font-medium">{filters.arrivalTime.min}</div>
                          </motion.div>
                          <motion.div 
                            className="flex-1 p-2 bg-amber-50 rounded-lg border border-amber-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-xs text-amber-600 mb-1">Latest Arrival</div>
                            <div className="text-amber-900 font-medium">{filters.arrivalTime.max}</div>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="block text-amber-700 mb-3 font-medium">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                      >
                        <option value="" disabled>Sort By</option>
                        <option value="smart-mix">Smart Mix</option>
                        <option value="price">Price</option>
                        <option value="duration">Duration</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Flight Results */}
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <motion.div 
                  className="flex flex-col items-start py-1.5 px-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <motion.div 
                    className="flex items-center gap-1.5 text-sm font-bold text-amber-900 mb-0.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <FaSearch className="text-amber-500 text-xs" />
                    <span>{searchParams.fromCity}</span>
                    <div style={{ width: '40px', height: '40px' }}>
                      <Lottie path={'/animations/arrow-fluid.json'} loop={true} autoplay={true} />
                    </div>
                    <span>{searchParams.toCity}</span>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-1.5 text-amber-700 text-[10px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <span>At Any time</span>
                    <span className="text-amber-300">•</span>
                    <span>{formatMonthAndDay(searchParams.departDate)}</span>
                    <span className="text-amber-300">•</span>
                    <span>Economy/Coach</span>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="flex-1 flex justify-center">
                    <div style={{ width: '300px', height: '300px' }}>
                      <Lottie path={'/animations/animation.json'} loop={true} autoplay={true} />
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-4 mt-2">
                  <AnimatePresence>
                    {filteredAndSortedFlights.map((flight, index) => (
                      <motion.div
                        key={flight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flight-card"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex flex-col">
                          {/* Main Flight Info */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <motion.div 
                                    className="flex items-center gap-2 mb-2"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="font-semibold text-amber-900">{flight.airline}</span>
                                    <span className="text-amber-500">{flight.flightNumber}</span>
                                    <motion.div 
                                      className="flex items-center gap-1"
                                      whileHover={{ scale: 1.1 }}
                                    >
                                      <FaStar className="rating-star" />
                                      <span className="text-amber-700">{flight.rating}</span>
                                    </motion.div>
                                  </motion.div>
                                  <motion.div 
                                    className="flex items-center gap-4 flight-info"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <FaClock className="text-amber-400" />
                                      <span>{flight.duration}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{flight.stops} {flight.stops === 1 ? 'Stop' : 'Stops'}</span>
                                  </motion.div>
                                </div>
                                <div className="flex items-center gap-8">
                                  <motion.div 
                                    className="text-right"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <div className="font-semibold text-amber-900">{flight.departure}</div>
                                    <div className="text-amber-500 text-sm">Departure</div>
                                  </motion.div>
                                  <motion.div 
                                    className="text-right"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <div className="font-semibold text-amber-900">{flight.arrival}</div>
                                    <div className="text-amber-500 text-sm">Arrival</div>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                            <motion.div 
                              className="ml-8 text-right"
                              whileHover={{ scale: 1.05 }}
                            >
                              <motion.div 
                                className="flex items-center gap-2 price-tag"
                                whileHover={{ scale: 1.1 }}
                              >
                                <span className="text-2xl font-bold">{formatPrice(flight.price)}</span>
                              </motion.div>
                              <div className="flex gap-2 mt-2">
                                <motion.a 
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); setExpandedFlight(expandedFlight === flight.id ? null : flight.id); }}
                                  className="text-amber-700 hover:text-amber-900 text-sm font-semibold transition-colors duration-200"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {expandedFlight === flight.id ? 'Hide Details' : 'View Details'}
                                </motion.a>
                              </div>
                            </motion.div>
                          </div>

                          {/* Expandable Details Section */}
                          <AnimatePresence>
                            {expandedFlight === flight.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="grid grid-cols-3 gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                  {/* Fare Details */}
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-amber-900">Fare Details</h4>
                                    <div className="text-sm space-y-1">
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Fare Class:</span>
                                        <span className="text-amber-900">Economy (Y)</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Fare Type:</span>
                                        <span className="text-amber-900">Refundable</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Meal:</span>
                                        <span className="text-amber-900">Included</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Baggage Allowance */}
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-amber-900">Baggage Allowance</h4>
                                    <div className="text-sm space-y-1">
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Cabin:</span>
                                        <span className="text-amber-900">7 kg</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Checked:</span>
                                        <span className="text-amber-900">23 kg</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Extra Baggage:</span>
                                        <span className="text-amber-900">$50/kg</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Policies */}
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-amber-900">Policies</h4>
                                    <div className="text-sm space-y-1">
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Cancellation:</span>
                                        <span className="text-amber-900">$100 fee</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Date Change:</span>
                                        <span className="text-amber-900">$50 fee</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-amber-600">Seat Selection:</span>
                                        <span className="text-amber-900">$15</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                  <motion.button 
                                    className="px-6 py-2 bg-amber-500 text-white rounded-lg text-base font-semibold hover:bg-amber-600 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    Select
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {filteredAndSortedFlights.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-8 text-amber-700 font-semibold text-lg glass-card mt-4"
                    >
                      There are no more flights.
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default SearchResults; 