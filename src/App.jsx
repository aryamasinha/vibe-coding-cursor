import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaCalendarAlt, FaUser, FaExchangeAlt } from 'react-icons/fa';
import SearchResults from './components/SearchResults';
import WorldMap from './components/WorldMap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [tripType, setTripType] = useState('one-way');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showPlaneAnim, setShowPlaneAnim] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  if (searchParams) {
    return <SearchResults searchParams={searchParams} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 relative overflow-hidden">
      <Header />
      <WorldMap />
      <AnimatePresence>
        {showPlaneAnim && (
          <motion.div
            key="plane"
            initial={{ x: '-10vw', y: 0, rotate: -10, opacity: 0 }}
            animate={{ x: '110vw', y: -40, rotate: 10, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="fixed top-1/2 left-0 z-50 text-amber-500 text-6xl pointer-events-none"
            style={{ filter: 'drop-shadow(0 4px 16px #fbbf24cc)' }}
          >
            <FaPlane />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl w-full space-y-8">
          <div>
            <h1 className="text-center text-4xl font-extrabold text-amber-900">
              Find Your Perfect Flight
            </h1>
            <p className="mt-2 text-center text-sm text-amber-700">
              Search and compare flights from multiple airlines
            </p>
          </div>
          <div className="glass-card">
            <h1 className="text-3xl font-bold mb-8 text-center">
              Find Your Perfect Flight
            </h1>

            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-2 rounded-lg ${
                  tripType === 'one-way'
                    ? 'bg-white text-amber-700'
                    : 'text-amber-700 hover:bg-white/10'
                }`}
                onClick={() => setTripType('one-way')}
                disabled={showPlaneAnim}
              >
                One Way
              </button>
              <button
                className={`flex-1 py-2 rounded-lg ${
                  tripType === 'round-trip'
                    ? 'bg-white text-amber-700'
                    : 'text-amber-700 hover:bg-white/10'
                }`}
                onClick={() => setTripType('round-trip')}
                disabled={showPlaneAnim}
              >
                Round Trip
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-amber-700 mb-2">From</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="City or Airport"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      disabled={showPlaneAnim}
                    />
                    <FaPlane className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
                  </div>
                </div>

                <button
                  onClick={handleSwapCities}
                  className="mt-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-700"
                  disabled={showPlaneAnim}
                >
                  <FaExchangeAlt />
                </button>

                <div className="flex-1">
                  <label className="block text-amber-700 mb-2">To</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="City or Airport"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      disabled={showPlaneAnim}
                    />
                    <FaPlane className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-amber-700 mb-2">Departure</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="input-field"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      disabled={showPlaneAnim}
                    />
                    <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
                  </div>
                </div>

                {tripType === 'round-trip' && (
                  <div className="flex-1">
                    <label className="block text-amber-700 mb-2">Return</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="input-field"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        disabled={showPlaneAnim}
                      />
                      <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  <label className="block text-amber-700 mb-2">Passengers</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      className="input-field"
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      disabled={showPlaneAnim}
                    />
                    <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
                  </div>
                </div>
              </div>

              <button 
                className="btn-primary w-full mt-6"
                onClick={() => handleSearch({
                  fromCity,
                  toCity,
                  departDate,
                  returnDate,
                  passengers,
                  tripType,
                })}
                disabled={showPlaneAnim}
              >
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default App;
