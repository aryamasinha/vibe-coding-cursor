import { motion } from 'framer-motion';
import { useState } from 'react';
import EgenciaLogo from '../assets/egencia-logo.png'; // Assuming the logo is saved here
import { FaHeadphones, FaUser } from 'react-icons/fa'; // Import FaHeadphones and FaUser

const Header = () => {
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false); // New state for Admin dropdown

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setIsBookDropdownOpen(false);
    setIsToolsDropdownOpen(false);
    setIsAdminDropdownOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 right-4 bg-white/40 backdrop-blur-md border border-white/20 shadow-lg z-50 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Left Group: Logo + Navigation */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={EgenciaLogo} alt="Egencia Logo" className="h-14" />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              {/* Book Dropdown */}
              <div className="relative">
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); closeAllDropdowns(); setIsBookDropdownOpen(!isBookDropdownOpen); }}
                  className="text-amber-900/80 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Book
                  <svg className={`ml-1 w-3 h-3 text-amber-900 transform transition-transform ${isBookDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </a>
                {isBookDropdownOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-48 bg-white/60 backdrop-blur-md border border-white/30 rounded-lg shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Flights</a>
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Hotels</a>
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Cars</a>
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Trains</a>
                  </motion.div>
                )}
              </div>
              
              <a href="#" className="text-amber-900/80 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Trip
              </a>
              
              {/* Tools Dropdown */}
              <div className="relative">
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); closeAllDropdowns(); setIsToolsDropdownOpen(!isToolsDropdownOpen); }}
                  className="text-amber-900/80 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  Tools
                  <svg className={`ml-1 w-3 h-3 text-amber-900 transform transition-transform ${isToolsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </a>
                {isToolsDropdownOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-48 bg-white/60 backdrop-blur-md border border-white/30 rounded-lg shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Reporting</a>
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Analytics</a>
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Approvals</a>
                  </motion.div>
                )}
              </div>

              {/* Admin Dropdown */}
              <div className="relative">
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); closeAllDropdowns(); setIsAdminDropdownOpen(!isAdminDropdownOpen); }}
                  className="text-amber-900/80 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <FaHeadphones className="mr-1 w-4 h-4" />
                  Admin
                  <svg className={`ml-1 w-3 h-3 text-amber-900 transform transition-transform ${isAdminDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </a>
                {isAdminDropdownOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-48 bg-white/60 backdrop-blur-md border border-white/30 rounded-lg shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">User Management</a>
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-100/50">Audit Log</a>
                  </motion.div>
                )}
              </div>

              <a href="#" className="text-amber-900/80 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Community
              </a>
            </nav>
          </div>

          {/* Right Group: Help & Feedback + Sign In */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-amber-900/80 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Help
            </a>
            <a href="#" className="text-amber-900/80 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Feedback
            </a>
            <button className="flex items-center gap-2 text-amber-900/80 hover:text-amber-700 px-4 py-2 text-sm font-medium bg-white/30 hover:bg-white/40 rounded-lg transition-all duration-200 backdrop-blur-sm">
              <FaUser className="w-4 h-4" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 