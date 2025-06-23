import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResult.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const dummyFlights = [
  {
    airline: 'Air Alpha',
    flightNumber: 'AA123',
    departure: '08:00',
    arrival: '10:30',
    origin: 'DEL',
    destination: 'FRA',
    price: '$199',
    stops: 0,
  },
  {
    airline: 'Beta Airlines',
    flightNumber: 'BA456',
    departure: '12:15',
    arrival: '14:45',
    origin: 'DEL',
    destination: 'FRA',
    price: '$249',
    stops: 1,
  },
  {
    airline: 'Gamma Flights',
    flightNumber: 'GF789',
    departure: '18:00',
    arrival: '20:30',
    origin: 'DEL',
    destination: 'FRA',
    price: '$179',
    stops: 0,
  },
  {
    airline: 'SkyJet',
    flightNumber: 'SJ101',
    departure: '09:30',
    arrival: '13:00',
    origin: 'DEL',
    destination: 'FRA',
    price: '$399',
    stops: 1,
  },
  {
    airline: 'Pacific Air',
    flightNumber: 'PA202',
    departure: '15:00',
    arrival: '23:00',
    origin: 'DEL',
    destination: 'FRA',
    price: '$599',
    stops: 2,
  },
  {
    airline: 'EuroFly',
    flightNumber: 'EF303',
    departure: '07:45',
    arrival: '11:15',
    origin: 'DEL',
    destination: 'FRA',
    price: '$329',
    stops: 0,
  },
  {
    airline: 'Maple Leaf',
    flightNumber: 'ML404',
    departure: '13:20',
    arrival: '17:50',
    origin: 'DEL',
    destination: 'FRA',
    price: '$499',
    stops: 1,
  },
  {
    airline: 'Safari Air',
    flightNumber: 'SA505',
    departure: '22:00',
    arrival: '06:00',
    origin: 'DEL',
    destination: 'FRA',
    price: '$699',
    stops: 2,
  },
  {
    airline: 'SpiceJet',
    flightNumber: 'SJ606',
    departure: '05:30',
    arrival: '08:45',
    origin: 'DEL',
    destination: 'FRA',
    price: '$259',
    stops: 0,
  },
  {
    airline: 'Iberia',
    flightNumber: 'IB707',
    departure: '11:10',
    arrival: '15:40',
    origin: 'DEL',
    destination: 'FRA',
    price: '$549',
    stops: 1,
  },
  {
    airline: 'Qantas',
    flightNumber: 'QF808',
    departure: '16:00',
    arrival: '22:30',
    origin: 'DEL',
    destination: 'FRA',
    price: '$799',
    stops: 2,
  },
  {
    airline: 'Lufthansa',
    flightNumber: 'LH909',
    departure: '06:20',
    arrival: '10:50',
    origin: 'DEL',
    destination: 'FRA',
    price: '$379',
    stops: 0,
  },
  {
    airline: 'KLM',
    flightNumber: 'KL010',
    departure: '14:00',
    arrival: '18:30',
    origin: 'DEL',
    destination: 'FRA',
    price: '$429',
    stops: 1,
  },
  {
    airline: 'Emirates',
    flightNumber: 'EK111',
    departure: '20:45',
    arrival: '23:55',
    origin: 'DEL',
    destination: 'FRA',
    price: '$299',
    stops: 0,
  },
  {
    airline: 'British Airways',
    flightNumber: 'BA212',
    departure: '17:30',
    arrival: '21:00',
    origin: 'DEL',
    destination: 'FRA',
    price: '$459',
    stops: 1,
  },
  {
    airline: 'Air Canada',
    flightNumber: 'AC313',
    departure: '10:00',
    arrival: '14:30',
    origin: 'DEL',
    destination: 'FRA',
    price: '$199',
    stops: 0,
  },
  {
    airline: 'Delta',
    flightNumber: 'DL414',
    departure: '19:15',
    arrival: '23:45',
    origin: 'DEL',
    destination: 'FRA',
    price: '$389',
    stops: 1,
  },
  {
    airline: 'United',
    flightNumber: 'UA515',
    departure: '08:50',
    arrival: '12:20',
    origin: 'DEL',
    destination: 'FRA',
    price: '$599',
    stops: 2,
  },
  {
    airline: 'Vistara',
    flightNumber: 'UK616',
    departure: '21:00',
    arrival: '01:30',
    origin: 'DEL',
    destination: 'FRA',
    price: '$149',
    stops: 0,
  },
  {
    airline: 'Aeromexico',
    flightNumber: 'AM717',
    departure: '13:40',
    arrival: '17:10',
    origin: 'DEL',
    destination: 'FRA',
    price: '$599',
    stops: 1,
  },
];

// Airport code to city mapping
const airportCities = {
  JFK: 'New York',
  LHR: 'London',
  LAX: 'Los Angeles',
  DEL: 'Delhi',
  ORD: 'Chicago',
  DXB: 'Dubai',
  CDG: 'Paris',
  HND: 'Tokyo',
  SYD: 'Sydney',
  FRA: 'Frankfurt',
  SIN: 'Singapore',
  AMS: 'Amsterdam',
  YYZ: 'Toronto',
  GRU: 'Sao Paulo',
  JNB: 'Johannesburg',
  ICN: 'Seoul',
  BOM: 'Mumbai',
  BCN: 'Barcelona',
  MAD: 'Madrid',
  SFO: 'San Francisco',
  PA202: 'Sydney', // Pacific Air (SYD)
  EF303: 'Singapore', // EuroFly (SIN)
  ML404: 'Toronto', // Maple Leaf (YYZ)
  SA505: 'Johannesburg', // Safari Air (JNB)
  SJ606: 'Mumbai', // SpiceJet (BOM)
  IB707: 'Madrid', // Iberia (MAD)
  QF808: 'Sydney', // Qantas (SYD)
  LH909: 'Frankfurt', // Lufthansa (FRA)
  KL010: 'Amsterdam', // KLM (AMS)
  EK111: 'Dubai', // Emirates (DXB)
  BA212: 'London', // British Airways (LHR)
  AC313: 'Toronto', // Air Canada (YYZ)
  DL414: 'New York', // Delta (JFK)
  UA515: 'Chicago', // United (ORD)
  UK616: 'Delhi', // Vistara (DEL)
  AM717: 'San Francisco', // Aeromexico (SFO)
};

function formatTime(time24) {
  const [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

// Helper to calculate duration between two times (HH:mm)
function getDuration(departure, arrival) {
  const [dh, dm] = departure.split(":").map(Number);
  const [ah, am] = arrival.split(":").map(Number);
  let depMins = dh * 60 + dm;
  let arrMins = ah * 60 + am;
  // Handle overnight flights
  if (arrMins < depMins) arrMins += 24 * 60;
  const totalMins = arrMins - depMins;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return `${hours}h${mins > 0 ? ' ' + mins + 'm' : ''}`;
}

const allDates = [
  '2025-06-10', '2025-06-11', '2025-06-12', '2025-06-13', '2025-06-14', '2025-06-15',
  '2025-06-16', '2025-06-17', '2025-06-18', '2025-06-19', '2025-06-20', '2025-06-21', '2025-06-22', '2025-06-23'
];
export const flightsByDate = {};
for (const [i, date] of allDates.entries()) {
  // Simulate no flights on Fridays (2025-06-14, 2025-06-21)
  if (date === '2025-06-14' || date === '2025-06-21') {
    flightsByDate[date] = [];
  } else {
    flightsByDate[date] = Array.from({ length: 15 }, (_, j) => dummyFlights[(i * 3 + j) % dummyFlights.length]);
  }
}

function SearchResult({ darkMode = false, depTimeRange: propDepTimeRange, arrTimeRange: propArrTimeRange, glassmorphism = false }) {
  const query = useQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const [comparedFlights, setComparedFlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [copiedFlight, setCopiedFlight] = useState(null);
  const [pendingScrollFlight, setPendingScrollFlight] = useState(null);
  const flightRefs = React.useRef({});

  // Use prop depTimeRange/arrTimeRange if provided, else fallback to query param
  const depTimeRange = propDepTimeRange !== undefined ? propDepTimeRange : (query.get('timeRange') && query.get('timeRange').startsWith('dep_') ? query.get('timeRange') : '');
  const arrTimeRange = propArrTimeRange !== undefined ? propArrTimeRange : (query.get('timeRange') && query.get('timeRange').startsWith('arr_') ? query.get('timeRange') : '');

  // Get selected date from query params
  const date = query.get('date');
  const sharedFlight = query.get('flight');

  // Use flights for the selected date, or empty array if none
  const flightsForDate = flightsByDate[date] || [];

  // Debug log for date and flightsForDate
  console.log('Selected date:', date, 'flightsForDate:', flightsForDate);

  // Helper to check if a time (HH:mm) falls in a range
  function isTimeInRange(time, range) {
    const [h, m] = time.split(':').map(Number);
    const mins = h * 60 + m;
    switch (range) {
      case 'dep_before6': return mins < 360;
      case 'dep_6to12': return mins >= 360 && mins < 720;
      case 'dep_12to6': return mins >= 720 && mins < 1080;
      case 'dep_after6': return mins >= 1080;
      case 'arr_before6': return mins < 360;
      case 'arr_6to12': return mins >= 360 && mins < 720;
      case 'arr_12to6': return mins >= 720 && mins < 1080;
      case 'arr_after6': return mins >= 1080;
      default: return true;
    }
  }

  // Filter flights by depTimeRange and arrTimeRange
  const filteredFlights = flightsForDate.filter(flight => {
    let depMatch = true;
    let arrMatch = true;
    if (depTimeRange) {
      depMatch = isTimeInRange(flight.departure, depTimeRange);
    }
    if (arrTimeRange) {
      arrMatch = isTimeInRange(flight.arrival, arrTimeRange);
    }
    return depMatch && arrMatch;
  });

  // Scroll to shared flight if present in URL
  useEffect(() => {
    // Find the date for the shared flight if not present in filteredFlights
    if (sharedFlight) {
      let found = filteredFlights.some(f => f.flightNumber === sharedFlight);
      // If not found, search all flightsByDate for the flight
      if (!found) {
        let foundDate = null;
        Object.entries(flightsByDate).forEach(([d, flights]) => {
          if (flights.some(f => f.flightNumber === sharedFlight)) {
            foundDate = d;
          }
        });
        if (foundDate) {
          const params = new URLSearchParams(location.search);
          params.set('date', foundDate);
          params.delete('timeRange');
          setPendingScrollFlight(sharedFlight);
          navigate(`${location.pathname}?${params.toString()}`, { replace: true });
          return;
        }
      }
    }
    if (sharedFlight && flightRefs.current[sharedFlight]) {
      flightRefs.current[sharedFlight].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [sharedFlight, filteredFlights, location, navigate]);

  // After navigation/filter clear, scroll to the flight if pending
  useEffect(() => {
    if (pendingScrollFlight && flightRefs.current[pendingScrollFlight]) {
      flightRefs.current[pendingScrollFlight].scrollIntoView({ behavior: 'smooth', block: 'center' });
      setPendingScrollFlight(null);
    }
  }, [filteredFlights, pendingScrollFlight]);

  const handleCompareClick = (flight) => {
    if (comparedFlights.find(f => f.flightNumber === flight.flightNumber)) return;
    const newCompared = [...comparedFlights, flight];
    if (newCompared.length <= 2) {
      setComparedFlights(newCompared);
    }
  };

  const handleShareClick = (flight) => {
    // Generate a shareable link (e.g., current URL + ?flight=flightNumber)
    const url = `${window.location.origin}${window.location.pathname}?flight=${flight.flightNumber}`;
    navigator.clipboard.writeText(url);
    setCopiedFlight(flight.flightNumber);
    setTimeout(() => setCopiedFlight(null), 1500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        style={{
          margin: '2.5rem 18vw 0 18vw',
          width: 'calc(100vw - 36vw)',
          paddingRight: '1.5rem',
          color: glassmorphism && !darkMode ? '#222' : (darkMode ? '#fff' : '#222'),
          border: glassmorphism && !darkMode ? '1.5px solid rgba(255,255,255,0.25)' : 'none',
          boxShadow: glassmorphism && !darkMode ? '0 8px 32px 0 rgba(31,38,135,0.18)' : 'none',
          background: 'transparent',
        }}
      >
        {filteredFlights.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: darkMode ? '#fff' : '#222',
            fontWeight: 400,
            fontSize: '1rem',
            margin: '4rem 0',
            padding: '2.5rem 0',
            borderRadius: 12,
            background: darkMode ? '#23283a' : '#fff',
            border: darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3',
            boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.18)' : '0 2px 8px rgba(31,38,135,0.06)',
            backdropFilter: darkMode ? 'blur(12px)' : undefined,
            WebkitBackdropFilter: darkMode ? 'blur(12px)' : undefined,
            animation: darkMode ? 'fadeUpGlass 0.7s cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
            opacity: darkMode ? 1 : undefined,
            transform: darkMode ? 'none' : undefined
          }}>
            No flights found
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {filteredFlights.map((flight, idx) => {
            // Assign different on-time percentages for each flight
            const onTimePercent = idx === 0 ? 92 : idx === 1 ? 85 : 97;
            const isCompared = comparedFlights.find(f => f.flightNumber === flight.flightNumber);
            return (
              <div
                key={idx}
                ref={el => flightRefs.current[flight.flightNumber] = el}
                className="flight-card-animate"
                style={{
                  border: glassmorphism && !darkMode ? '1.5px solid rgba(255,255,255,0.25)' : (darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3'),
                  borderRadius: '12px',
                  padding: '1.2rem 1.5rem',
                  marginBottom: '2.5rem',
                  background: glassmorphism && !darkMode
                    ? 'rgba(255,255,255,0.22)'
                    : (darkMode ? '#23283a' : (!glassmorphism && !darkMode ? '#fff' : 'transparent')),
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.7rem',
                  position: 'relative',
                  boxShadow: glassmorphism && !darkMode ? '0 8px 32px 0 rgba(31,38,135,0.18)' : (darkMode ? '0 2px 8px rgba(0,0,0,0.18)' : 'none'),
                  color: glassmorphism && !darkMode ? '#222' : (darkMode ? '#fff' : '#222'),
                  animation: 'fadeUpCard 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                  animationDelay: `${idx * 60}ms`,
                  backdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                  WebkitBackdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                  opacity: 1,
                  transform: 'none',
                }}
              >
                {/* On-time percentage badge */}
                <span style={{
                  position: 'absolute',
                  top: 12,
                  right: 18,
                  background: darkMode ? '#22304a' : '#e3f2fd',
                  color: darkMode ? '#90caf9' : '#1976d2',
                  fontWeight: 600,
                  fontSize: '0.97rem',
                  borderRadius: '12px',
                  padding: '0.22rem 0.9rem',
                  boxShadow: darkMode ? '0 1px 4px rgba(25,118,210,0.18)' : '0 1px 4px rgba(31,38,135,0.07)',
                  zIndex: 2,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{marginRight: 5}}><circle cx="12" cy="12" r="10" stroke="#1976d2" strokeWidth="2" fill="none"/><path d="M12 7v5l3 3" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
                  {onTimePercent}% on time
                </span>
                {/* Left: Flight details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {/* Top row: Departure/Origin and Arrival/Destination columns */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', fontSize: '1.2rem', fontWeight: 500, gap: '1rem' }}>
                    {/* Departure + Origin */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 48 }}>
                      <span>{formatTime(flight.departure)}</span>
                      <span style={{ fontSize: '1rem', color: darkMode ? '#90caf9' : '#444', fontWeight: 500 }}>{flight.origin}</span>
                      <span style={{ color: darkMode ? '#bbb' : '#888', fontWeight: 400, fontSize: '0.97rem', marginTop: 2, display: 'block' }}>{airportCities[flight.origin] || flight.origin}</span>
                    </div>
                    {/* Connector and stop info - moved here */}
                    <div style={{ width: 470, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '100%', display: 'flex', alignItems: 'center', position: 'relative', height: 18, justifyContent: 'center' }}>
                        {/* Start dot */}
                        <svg width="8" height="8" style={{marginRight: 2}} viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill={darkMode ? '#90caf9' : '#1976d2'} /></svg>
                        <span style={{ height: 2, background: darkMode ? '#333a4d' : '#cfd8dc', width: '100%', display: 'block', borderRadius: 1 }}></span>
                        {/* End dot */}
                        <svg width="8" height="8" style={{marginLeft: 2}} viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill={darkMode ? '#90caf9' : '#1976d2'} /></svg>
                        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'none', padding: 0, fontSize: '0.95rem', color: darkMode ? '#bbb' : '#888', zIndex: 1, fontWeight: 500, lineHeight: 1 }}>
                          {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
                        </span>
                      </div>
                    </div>
                    {/* Arrival + Destination and Duration with icons below duration */}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', minWidth: 48 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>{formatTime(flight.arrival)}</span>
                        <span style={{ fontSize: '1rem', color: darkMode ? '#90caf9' : '#444', fontWeight: 500 }}>{flight.destination}</span>
                        <span style={{ color: darkMode ? '#bbb' : '#888', fontWeight: 400, fontSize: '0.97rem', marginTop: 2, display: 'block' }}>{airportCities[flight.destination] || flight.destination}</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 28 }}>
                        <span style={{ color: darkMode ? '#fff' : '#222', fontWeight: 500, fontSize: '0.98rem', whiteSpace: 'nowrap', marginTop: 12 }}>{getDuration(flight.departure, flight.arrival)}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 6 }}>
                          {/* WiFi icon */}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M2 8.82A15.91 15.91 0 0 1 12 5c3.5 0 6.73 1.13 9.34 3.05" stroke={darkMode ? '#fff' : '#222'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.07 12.1A10.94 10.94 0 0 1 12 9.5c2.1 0 4.07.61 5.7 1.66" stroke={darkMode ? '#fff' : '#222'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.53 15.07A5.98 5.98 0 0 1 12 14.01c1.2 0 2.32.35 3.25.96" stroke={darkMode ? '#fff' : '#222'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="18" r="1.5" fill={darkMode ? '#fff' : '#222'}/>
                          </svg>
                          {/* Charger icon (bolt) */}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={darkMode ? '#fff' : '#222'}/>
                          </svg>
                          {/* Coffee icon */}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M18 8v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8h14z" stroke={darkMode ? '#fff' : '#222'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 2v2m6-2v2m6 8h1a2 2 0 0 1 0 4h-1" stroke={darkMode ? '#fff' : '#222'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <a href="#" style={{ color: darkMode ? '#90caf9' : '#1976d2', fontWeight: 500, fontSize: '0.97rem', textDecoration: 'none', cursor: 'pointer', display: 'inline-block', marginTop: 32 }}>
                          View details
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Airline and view details row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontWeight: 500, color: darkMode ? '#fff' : '#222' }}>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Airplane icon */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.7rem' }}>
                          <path d="M2.5 19.5L21.5 12L2.5 4.5L2.5 10.5L17 12L2.5 13.5L2.5 19.5Z" fill="#1976d2"/>
                        </svg>
                        {flight.airline} - {flight.flightNumber}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                        <button
                          type="button"
                          onClick={() => handleCompareClick(flight)}
                          disabled={isCompared || comparedFlights.length === 2}
                          style={{
                            color: darkMode ? '#90caf9' : '#1976d2',
                            fontWeight: 400,
                            fontSize: '0.97rem',
                            textDecoration: 'none',
                            cursor: isCompared || comparedFlights.length === 2 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            opacity: isCompared || comparedFlights.length === 2 ? 0.5 : 1,
                            pointerEvents: isCompared || comparedFlights.length === 2 ? 'none' : 'auto',
                          }}
                        >
                          Add to compare
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}><path d="M12 5v14M5 12h14" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShareClick(flight)}
                          style={{
                            color: darkMode ? '#90caf9' : '#1976d2',
                            fontWeight: 400,
                            fontSize: '0.97rem',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                            position: 'relative',
                          }}
                        >
                          Share flight
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/><path d="M16 6l-4-4-4 4" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/><path d="M12 2v13" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
                          {copiedFlight === flight.flightNumber && (
                            <span style={{
                              position: 'absolute',
                              top: '-1.7em',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              background: darkMode ? '#23283a' : '#fff',
                              color: darkMode ? '#90caf9' : '#1976d2',
                              border: darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3',
                              borderRadius: 6,
                              padding: '0.18em 0.7em',
                              fontSize: '0.92em',
                              boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
                              zIndex: 10,
                              whiteSpace: 'nowrap',
                            }}>
                              Link copied!
                            </span>
                          )}
                        </button>
                      </div>
                    </span>
                  </div>
                </div>
                {/* Right: Fare sections */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  minWidth: 270,
                  paddingLeft: '0.2rem',
                  background: glassmorphism && !darkMode
                    ? 'rgba(255,255,255,0.22)'
                    : (darkMode ? '#23283a' : (!glassmorphism && !darkMode ? '#fff' : 'transparent')),
                  overflow: 'hidden',
                  padding: '1.2rem 0',
                  borderRadius: 8,
                  border: glassmorphism && !darkMode ? '1.5px solid rgba(255,255,255,0.25)' : (darkMode ? '1px solid #333a4d' : 'none'),
                  boxShadow: glassmorphism && !darkMode ? '0 8px 32px 0 rgba(31,38,135,0.18)' : (darkMode ? '0 2px 8px rgba(0,0,0,0.18)' : undefined),
                  backdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                  WebkitBackdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                  animation: glassmorphism && !darkMode ? 'fadeUpGlass 0.7s cubic-bezier(0.22, 1, 0.36, 1)' : undefined
                }}>
                  <div style={{ width: 1, background: darkMode ? '#333a4d' : '#e3e3e3', alignSelf: 'stretch', marginLeft: 0 }} />
                  {/* Basic Fare */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.7rem 2rem',
                    marginLeft: '-0.7rem',
                    background: glassmorphism && !darkMode
                      ? 'rgba(255,255,255,0.22)'
                      : (darkMode ? '#23283a' : (!glassmorphism && !darkMode ? '#fff' : 'transparent')),
                    border: glassmorphism && !darkMode ? '1.5px solid rgba(255,255,255,0.25)' : undefined,
                    boxShadow: glassmorphism && !darkMode ? '0 8px 32px 0 rgba(31,38,135,0.18)' : undefined,
                    backdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                    WebkitBackdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                    color: glassmorphism && !darkMode ? '#222' : (darkMode ? '#fff' : undefined),
                    borderRadius: glassmorphism && !darkMode ? 12 : undefined,
                  }}>
                    <span style={{ fontSize: '0.89rem', color: darkMode ? '#fff' : '#222', fontWeight: 500, marginLeft: '0.7rem' }}>From</span>
                    <span style={{ fontWeight: 400, color: darkMode ? '#fff' : '#222', fontSize: '1rem', marginTop: 6 }}>$199</span>
                    <span style={{ fontSize: '0.85rem', color: darkMode ? '#bbb' : '#222', fontWeight: 400, marginTop: 6 }}>one way</span>
                    <a href="#" style={{ marginTop: 10, marginBottom: 10, color: darkMode ? '#90caf9' : '#1976d2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}><path d="M7 10l5 5 5-5" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                  <div style={{ width: 1, background: darkMode ? '#333a4d' : '#e3e3e3', alignSelf: 'stretch' }} />
                  {/* Standard Fare */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.7rem 2rem',
                    background: glassmorphism && !darkMode
                      ? 'rgba(255,255,255,0.22)'
                      : (darkMode ? '#23283a' : (!glassmorphism && !darkMode ? '#fff' : 'transparent')),
                    border: glassmorphism && !darkMode ? '1.5px solid rgba(255,255,255,0.25)' : undefined,
                    boxShadow: glassmorphism && !darkMode ? '0 8px 32px 0 rgba(31,38,135,0.18)' : undefined,
                    backdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                    WebkitBackdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                    color: glassmorphism && !darkMode ? '#222' : (darkMode ? '#fff' : undefined),
                    borderRadius: glassmorphism && !darkMode ? 12 : undefined,
                  }}>
                    <span style={{ fontSize: '0.89rem', color: darkMode ? '#fff' : '#222', fontWeight: 500 }}>From</span>
                    <span style={{ fontWeight: 400, color: darkMode ? '#fff' : '#222', fontSize: '1rem', marginTop: 6 }}>$249</span>
                    <span style={{ fontSize: '0.85rem', color: darkMode ? '#bbb' : '#222', fontWeight: 400, marginTop: 6 }}>one way</span>
                    <a href="#" style={{ marginTop: 10, marginBottom: 10, color: darkMode ? '#90caf9' : '#1976d2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}><path d="M7 10l5 5 5-5" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                  <div style={{ width: 1, background: darkMode ? '#333a4d' : '#e3e3e3', alignSelf: 'stretch' }} />
                  {/* Flex Fare */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.7rem 2rem',
                    background: glassmorphism && !darkMode
                      ? 'rgba(255,255,255,0.22)'
                      : (darkMode ? '#23283a' : (!glassmorphism && !darkMode ? '#fff' : 'transparent')),
                    border: glassmorphism && !darkMode ? '1.5px solid rgba(255,255,255,0.25)' : undefined,
                    boxShadow: glassmorphism && !darkMode ? '0 8px 32px 0 rgba(31,38,135,0.18)' : undefined,
                    backdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                    WebkitBackdropFilter: glassmorphism && !darkMode ? 'blur(12px)' : undefined,
                    color: glassmorphism && !darkMode ? '#222' : (darkMode ? '#fff' : undefined),
                    borderRadius: glassmorphism && !darkMode ? 12 : undefined,
                  }}>
                    <span style={{ fontSize: '0.89rem', color: darkMode ? '#fff' : '#222', fontWeight: 500 }}>From</span>
                    <span style={{ fontWeight: 400, color: darkMode ? '#fff' : '#222', fontSize: '1rem', marginTop: 6 }}>$299</span>
                    <span style={{ fontSize: '0.85rem', color: darkMode ? '#bbb' : '#222', fontWeight: 400, marginTop: 6 }}>one way</span>
                    <a href="#" style={{ marginTop: 10, marginBottom: 10, color: darkMode ? '#90caf9' : '#1976d2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}><path d="M7 10l5 5 5-5" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                </div>
                {/* Add space after fare sections */}
                <div style={{ height: '1.2rem' }} />
              </div>
            );
          })}
        </div>
      </div>
      {/* Compare Tray (Corner Modal) */}
      {comparedFlights.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1001,
          background: darkMode ? '#23283a' : '#fff',
          color: darkMode ? '#fff' : '#222',
          borderRadius: 12,
          boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.18)' : '0 8px 32px rgba(31,38,135,0.18)',
          padding: '1rem 1.5rem',
          minWidth: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 12,
          border: darkMode ? '1px solid #333a4d' : '1.5px solid #e3e3e3'
        }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Compare Flights</div>
          {comparedFlights.map(flight => (
            <div key={flight.flightNumber} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, marginBottom: 8 }}>
              <span>{flight.airline} <b>{flight.flightNumber}</b></span>
            </div>
          ))}
          {/* Remove and Compare buttons */}
          {comparedFlights.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => setComparedFlights([])}
                style={{
                  background: '#1976d2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: '0.3em 1em',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500
                }}
              >Remove</button>
              {comparedFlights.length === 2 && (
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '0.4em 1em',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  Compare
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {/* Compare Modal (centered) */}
      {showModal && comparedFlights.length === 2 && (
        <div className="compare-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            background: darkMode ? '#23283a' : '#fff',
            color: darkMode ? '#fff' : '#222',
            borderRadius: 12,
            padding: '2rem',
            minWidth: 600,
            boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.18)' : '0 8px 32px rgba(31,38,135,0.18)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: darkMode ? '1px solid #333a4d' : 'none'
          }}>
            <button onClick={handleCloseModal} style={{ alignSelf: 'flex-end', marginBottom: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: darkMode ? '#fff' : '#222' }}>&times;</button>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {comparedFlights.map(flight => (
                <div key={flight.flightNumber} style={{ border: darkMode ? '1px solid #333a4d' : '1px solid #ccc', padding: '1rem', borderRadius: 8, minWidth: 220 }}>
                  <h3 style={{ margin: 0 }}>{flight.airline} - {flight.flightNumber}</h3>
                  <p>Departure: {flight.departure}</p>
                  <p>Arrival: {flight.arrival}</p>
                  <p>Origin: {flight.origin}</p>
                  <p>Destination: {flight.destination}</p>
                  <p>Price: {flight.price}</p>
                  <p>Stops: {flight.stops}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchResult; 