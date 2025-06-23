import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { flightsByDate } from './SearchResult';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const airportOptions = [
  { value: '', label: 'Leaving from' },
  { value: 'JFK', label: 'New York (JFK)' },
  { value: 'LAX', label: 'Los Angeles (LAX)' },
  { value: 'ORD', label: 'Chicago (ORD)' },
  { value: 'LHR', label: 'London (LHR)' },
  { value: 'DEL', label: 'Delhi (DEL)' },
  { value: 'DXB', label: 'Dubai (DXB)' },
  { value: 'CDG', label: 'Paris (CDG)' },
  { value: 'HND', label: 'Tokyo (HND)' },
  { value: 'SYD', label: 'Sydney (SYD)' },
  { value: 'FRA', label: 'Frankfurt (FRA)' },
  { value: 'SIN', label: 'Singapore (SIN)' },
  { value: 'AMS', label: 'Amsterdam (AMS)' },
  { value: 'YYZ', label: 'Toronto (YYZ)' },
  { value: 'GRU', label: 'Sao Paulo (GRU)' },
  { value: 'JNB', label: 'Johannesburg (JNB)' },
  { value: 'ICN', label: 'Seoul (ICN)' },
  { value: 'BOM', label: 'Mumbai (BOM)' },
  { value: 'BCN', label: 'Barcelona (BCN)' },
  { value: 'MAD', label: 'Madrid (MAD)' },
  { value: 'SFO', label: 'San Francisco (SFO)' },
];

const airportOptionsDest = [
  { value: '', label: 'Going to' },
  { value: 'JFK', label: 'New York (JFK)' },
  { value: 'LAX', label: 'Los Angeles (LAX)' },
  { value: 'ORD', label: 'Chicago (ORD)' },
  { value: 'LHR', label: 'London (LHR)' },
  { value: 'DEL', label: 'Delhi (DEL)' },
  { value: 'DXB', label: 'Dubai (DXB)' },
  { value: 'CDG', label: 'Paris (CDG)' },
  { value: 'HND', label: 'Tokyo (HND)' },
  { value: 'SYD', label: 'Sydney (SYD)' },
  { value: 'FRA', label: 'Frankfurt (FRA)' },
  { value: 'SIN', label: 'Singapore (SIN)' },
  { value: 'AMS', label: 'Amsterdam (AMS)' },
  { value: 'YYZ', label: 'Toronto (YYZ)' },
  { value: 'GRU', label: 'Sao Paulo (GRU)' },
  { value: 'JNB', label: 'Johannesburg (JNB)' },
  { value: 'ICN', label: 'Seoul (ICN)' },
  { value: 'BOM', label: 'Mumbai (BOM)' },
  { value: 'BCN', label: 'Barcelona (BCN)' },
  { value: 'MAD', label: 'Madrid (MAD)' },
  { value: 'SFO', label: 'San Francisco (SFO)' },
];

function SearchBar({ darkMode, setDarkMode, onTimeRangeChange, glassmorphism }) {
  const query = useQuery();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState(query.get('origin') || '');
  const [destination, setDestination] = useState(query.get('destination') || '');
  const [date, setDate] = useState(query.get('date') || '');
  const [depart, setDepart] = useState(query.get('depart') || '');

  // Ref for scrollable price row
  const priceRowRef = useRef(null);

  // State for time-of-day filter (initialize from query param if present)
  const [depTimeRange, setDepTimeRange] = useState(query.get('timeRange') && query.get('timeRange').startsWith('dep_') ? query.get('timeRange') : '');
  const [arrTimeRange, setArrTimeRange] = useState(query.get('timeRange') && query.get('timeRange').startsWith('arr_') ? query.get('timeRange') : '');

  // State for selected flight day in the scrollable row
  const [selectedDay, setSelectedDay] = useState('2025-06-13');

  // Notify parent when either filter changes
  useEffect(() => {
    if (onTimeRangeChange) onTimeRangeChange({ depTimeRange, arrTimeRange });
  }, [depTimeRange, arrTimeRange, onTimeRangeChange]);

  const handleScroll = (dir) => {
    const el = priceRowRef.current;
    if (!el) return;
    const scrollAmount = 160; // px
    if (dir === 'left') el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    else el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&depart=${encodeURIComponent(depart)}&timeRange=${encodeURIComponent(depTimeRange)}`);
  };

  // Helper to convert 'Mon, 10 Jun' to '2025-06-10' for input type="date"
  function formatDateForInput(dateStr) {
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    const parts = dateStr.split(', ')[1].split(' ');
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1]];
    return `2025-${month}-${day}`;
  }

  return (
    <>
      <form className="search-form-box" onSubmit={handleSubmit} style={{
        margin: '2.5rem 18vw 0 18vw',
        background: glassmorphism ? 'rgba(255,255,255,0.18)' : (darkMode ? '#181c24' : '#fff'),
        borderRadius: '12px',
        padding: '2.5rem 1.5rem 2.5rem 1.5rem',
        boxShadow: glassmorphism ? '0 8px 32px 0 rgba(31,38,135,0.18)' : (darkMode ? '0 2px 8px rgba(0,0,0,0.32)' : '0 2px 8px rgba(31,38,135,0.06)'),
        width: 'calc(100vw - 36vw)',
        backdropFilter: glassmorphism ? 'blur(16px)' : undefined,
        WebkitBackdropFilter: glassmorphism ? 'blur(16px)' : undefined,
        border: glassmorphism ? '1.5px solid rgba(255,255,255,0.25)' : undefined
      }}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: 120, position: 'relative'}}>
              <FlightTakeoffIcon style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: '#1976d2', pointerEvents: 'none'}} />
              <select
                id="origin-select"
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                required
                style={{
                  paddingLeft: '2rem',
                  width: '100%',
                  height: '2.5rem',
                  borderRadius: '6px',
                  border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc',
                  fontSize: '1rem',
                  background: darkMode ? '#23283a' : '#fff',
                  color: darkMode ? '#fff' : '#222',
                }}
              >
                {airportOptions.map(opt => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ''} hidden={opt.value === ''}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{flex: 1, minWidth: 120, position: 'relative'}}>
              <FlightLandIcon style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: '#1976d2', pointerEvents: 'none'}} />
              <select
                value={destination}
                onChange={e => setDestination(e.target.value)}
                required
                style={{
                  paddingLeft: '2rem',
                  width: '100%',
                  height: '2.5rem',
                  borderRadius: '6px',
                  border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc',
                  fontSize: '1rem',
                  background: darkMode ? '#23283a' : '#fff',
                  color: darkMode ? '#fff' : '#222',
                }}
              >
                {airportOptionsDest.map(opt => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ''} hidden={opt.value === ''}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{flex: 1, minWidth: 120, position: 'relative', marginRight: '1rem'}}>
              <EventIcon style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: '#1976d2', pointerEvents: 'none'}} />
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{
                paddingLeft: '2rem',
                width: '100%',
                height: '2.5rem',
                borderRadius: '6px',
                border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc',
                fontSize: '1rem',
                background: darkMode ? '#23283a' : '#fff',
                color: darkMode ? '#fff' : '#222',
              }} />
            </div>
            <div style={{flex: 1, minWidth: 120, position: 'relative', marginLeft: '1rem'}}>
              <AccessTimeIcon style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', color: '#1976d2', pointerEvents: 'none'}} />
              <select
                value={depart}
                onChange={e => setDepart(e.target.value)}
                required
                style={{
                  paddingLeft: '2rem',
                  width: '100%',
                  height: '2.5rem',
                  borderRadius: '6px',
                  border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc',
                  fontSize: '1rem',
                  background: darkMode ? '#23283a' : '#fff',
                  color: darkMode ? '#fff' : '#222',
                }}
              >
                <option value="" disabled>Depart</option>
                <option value="06:00">06:00 AM</option>
                <option value="08:00">08:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="18:00">06:00 PM</option>
                <option value="20:00">08:00 PM</option>
                <option value="22:00">10:00 PM</option>
              </select>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
            <button type="submit" style={{
              background: darkMode ? '#1976d2' : '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.7rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: darkMode ? '0 2px 8px rgba(25,118,210,0.18)' : 'none',
            }}>Search Flights</button>
          </div>
        </div>
      </form>
      {/* Scrollable price by date row (like MMT) */}
      <div style={{ position: 'relative', margin: '1.2rem 18vw 0 18vw', width: 'calc(100vw - 36vw)', background: darkMode ? '#181c24' : 'transparent', borderRadius: darkMode ? 12 : 0, boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.18)' : 'none' }}>
        {/* Left scroll button */}
        <button type="button" onClick={() => handleScroll('left')} style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
          background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px rgba(31,38,135,0.08)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#1976d2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {/* Scrollable row */}
        <div ref={priceRowRef} style={{
          overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex', gap: '0.7rem', paddingBottom: '0.5rem', scrollBehavior: 'smooth',
        }}>
          {[
            { date: 'Mon, 10 Jun', iso: '2025-06-10' },
            { date: 'Tue, 11 Jun', iso: '2025-06-11' },
            { date: 'Wed, 12 Jun', iso: '2025-06-12' },
            { date: 'Thu, 13 Jun', iso: '2025-06-13' },
            { date: 'Fri, 14 Jun', iso: '2025-06-14' },
            { date: 'Sat, 15 Jun', iso: '2025-06-15' },
            { date: 'Sun, 16 Jun', iso: '2025-06-16' },
            { date: 'Mon, 17 Jun', iso: '2025-06-17' },
            { date: 'Tue, 18 Jun', iso: '2025-06-18' },
            { date: 'Wed, 19 Jun', iso: '2025-06-19' },
            { date: 'Thu, 20 Jun', iso: '2025-06-20' },
            { date: 'Fri, 21 Jun', iso: '2025-06-21' },
            { date: 'Sat, 22 Jun', iso: '2025-06-22' },
            { date: 'Sun, 23 Jun', iso: '2025-06-23' },
          ].map((d, i) => {
            const flights = flightsByDate[d.iso] || [];
            let minFare = null;
            if (flights.length > 0) {
              minFare = flights.reduce((min, f) => {
                const price = parseFloat(f.price.replace('$', ''));
                return price < min ? price : min;
              }, Infinity);
            }
            return (
              <div
                key={i}
                onClick={() => {
                  if (selectedDay === d.iso) {
                    setSelectedDay('');
                    setDate('');
                    setTimeout(() => handleSubmit(new Event('submit')), 0);
                  } else {
                    setSelectedDay(d.iso);
                    setDate(d.iso);
                    setTimeout(() => handleSubmit(new Event('submit')), 0);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 90,
                  padding: '0.7rem 1.1rem',
                  borderRadius: '10px',
                  background: selectedDay === d.iso ? (darkMode ? '#22304a' : '#e3f2fd') : (darkMode ? '#23283a' : '#fff'),
                  color: selectedDay === d.iso ? (darkMode ? '#90caf9' : '#1976d2') : (darkMode ? '#fff' : '#222'),
                  fontWeight: selectedDay === d.iso ? 700 : 500,
                  border: selectedDay === d.iso ? (darkMode ? '2px solid #90caf9' : '2px solid #1976d2') : (darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3'),
                  boxShadow: selectedDay === d.iso ? (darkMode ? '0 2px 8px rgba(25,118,210,0.18)' : '0 2px 8px rgba(31,38,135,0.08)') : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '0.97rem', marginBottom: 4 }}>{d.date}</span>
                <span style={{ fontSize: '1.08rem' }}>{minFare !== null && minFare !== Infinity ? `$${minFare}` : '—'}</span>
              </div>
            );
          })}
        </div>
        {/* Right scroll button */}
        <button type="button" onClick={() => handleScroll('right')} style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
          background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px rgba(31,38,135,0.08)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#1976d2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      {/* Filter dropdowns below search box */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', margin: '1.2rem 18vw 0 18vw', width: 'calc(100vw - 36vw)', background: darkMode ? '#181c24' : 'transparent', borderRadius: darkMode ? 12 : 0}}>
        <div style={{display: 'flex', gap: '1rem', flex: 1}}>
          <select style={{width: 'auto', minWidth: 120, maxWidth: 180, height: '2.5rem', borderRadius: '16px', border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc', fontSize: '1rem', background: darkMode ? '#23283a' : '#fff', color: darkMode ? '#fff' : '#222', padding: '0 1.2rem', paddingRight: '2.2rem'}}>
            <option value="">Stops</option>
            <option value="nonstop">Nonstop</option>
            <option value="1stop">1 Stop</option>
            <option value="2plus">2+ Stops</option>
          </select>
          <select style={{width: 'auto', minWidth: 120, maxWidth: 180, height: '2.5rem', borderRadius: '16px', border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc', fontSize: '1rem', background: darkMode ? '#23283a' : '#fff', color: darkMode ? '#fff' : '#222', padding: '0 1.2rem', paddingRight: '2.2rem'}}>
            <option value="">Airlines</option>
            <option value="airalpha">Air Alpha</option>
            <option value="betaairlines">Beta Airlines</option>
            <option value="gammaflights">Gamma Flights</option>
          </select>
          <select style={{width: 'auto', minWidth: 120, maxWidth: 180, height: '2.5rem', borderRadius: '16px', border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc', fontSize: '1rem', background: darkMode ? '#23283a' : '#fff', color: darkMode ? '#fff' : '#222', padding: '0 1.2rem'}}>
            <option value="">Price</option>
            <option value="low">Lowest</option>
            <option value="high">Highest</option>
          </select>
          <select style={{width: 'auto', minWidth: 120, maxWidth: 180, height: '2.5rem', borderRadius: '16px', border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc', fontSize: '1rem', background: darkMode ? '#23283a' : '#fff', color: darkMode ? '#fff' : '#222', padding: '0 1.2rem'}}>
            <option value="">Policy</option>
            <option value="refundable">Refundable</option>
            <option value="nonrefundable">Non-refundable</option>
          </select>
        </div>
        <select style={{width: 'auto', minWidth: 120, maxWidth: 180, height: '2.5rem', borderRadius: '16px', border: darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc', fontSize: '1rem', background: darkMode ? '#23283a' : '#fff', color: darkMode ? '#fff' : '#222', padding: '0 1.2rem'}}>
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="duration">Duration</option>
          <option value="departure">Departure</option>
          <option value="arrival">Arrival</option>
        </select>
      </div>
      {/* Time of day filter rows for Departure and Arrival */}
      <div style={{ margin: '0.7rem 18vw 0 18vw', width: 'calc(100vw - 36vw)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: 10 }}>
          <span style={{ fontWeight: 500, fontSize: '1rem', color: darkMode ? '#fff' : '#222', whiteSpace: 'nowrap' }}>
            {`Departure from${origin && airportOptions.find(opt => opt.value === origin)?.label ? ' ' + airportOptions.find(opt => opt.value === origin).label.replace(/\s*\(.+\)/, '') : ' the origin city'}`}
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {[
              { label: 'Before 6 AM', value: 'dep_before6', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><path d="M21 12.79A9 9 0 0 1 12.79 3 7 7 0 1 0 21 12.79Z" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) },
              { label: '6 AM - 12 PM', value: 'dep_6to12', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><circle cx="12" cy="12" r="5" stroke="#1976d2" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#1976d2" strokeWidth="2"/></svg>
              ) },
              { label: '12 PM - 6 PM', value: 'dep_12to6', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><circle cx="12" cy="12" r="5" stroke="#1976d2" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
              ) },
              { label: 'After 6 PM', value: 'dep_after6', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><path d="M21 12.79A9 9 0 0 1 12.79 3 7 7 0 1 0 21 12.79Z" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="17" cy="17" r="1.5" fill="#1976d2"/></svg>
              ) },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDepTimeRange(depTimeRange === opt.value ? '' : opt.value)}
                style={{
                  padding: '0.6rem 1.3rem',
                  borderRadius: '18px',
                  border: depTimeRange === opt.value ? (darkMode ? '2px solid #90caf9' : '2px solid #1976d2') : (darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc'),
                  background: depTimeRange === opt.value ? (darkMode ? '#22304a' : '#e3f2fd') : (darkMode ? '#23283a' : '#fff'),
                  color: depTimeRange === opt.value ? (darkMode ? '#90caf9' : '#1976d2') : (darkMode ? '#fff' : '#222'),
                  fontWeight: 400,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: depTimeRange === opt.value ? (darkMode ? '0 2px 8px rgba(25,118,210,0.18)' : '0 2px 8px rgba(31,38,135,0.08)') : 'none',
                  transition: 'all 0.18s',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {opt.icon}{opt.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <span style={{ fontWeight: 500, fontSize: '1rem', color: darkMode ? '#fff' : '#222', whiteSpace: 'nowrap' }}>
            {`Arrival to${destination && airportOptionsDest.find(opt => opt.value === destination)?.label ? ' ' + airportOptionsDest.find(opt => opt.value === destination).label.replace(/\s*\(.+\)/, '') : ' the destination city'}`}
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {[
              { label: 'Before 6 AM', value: 'arr_before6', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><path d="M21 12.79A9 9 0 0 1 12.79 3 7 7 0 1 0 21 12.79Z" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) },
              { label: '6 AM - 12 PM', value: 'arr_6to12', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><circle cx="12" cy="12" r="5" stroke="#1976d2" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#1976d2" strokeWidth="2"/></svg>
              ) },
              { label: '12 PM - 6 PM', value: 'arr_12to6', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><circle cx="12" cy="12" r="5" stroke="#1976d2" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
              ) },
              { label: 'After 6 PM', value: 'arr_after6', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: 7}}><path d="M21 12.79A9 9 0 0 1 12.79 3 7 7 0 1 0 21 12.79Z" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="17" cy="17" r="1.5" fill="#1976d2"/></svg>
              ) },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setArrTimeRange(arrTimeRange === opt.value ? '' : opt.value)}
                style={{
                  padding: '0.6rem 1.3rem',
                  borderRadius: '18px',
                  border: arrTimeRange === opt.value ? (darkMode ? '2px solid #90caf9' : '2px solid #1976d2') : (darkMode ? '1px solid #333a4d' : '1px solid #cfd8dc'),
                  background: arrTimeRange === opt.value ? (darkMode ? '#22304a' : '#e3f2fd') : (darkMode ? '#23283a' : '#fff'),
                  color: arrTimeRange === opt.value ? (darkMode ? '#90caf9' : '#1976d2') : (darkMode ? '#fff' : '#222'),
                  fontWeight: 400,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: arrTimeRange === opt.value ? (darkMode ? '0 2px 8px rgba(25,118,210,0.18)' : '0 2px 8px rgba(31,38,135,0.08)') : 'none',
                  transition: 'all 0.18s',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {opt.icon}{opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{margin: '3rem 18vw 0 18vw', width: 'calc(100vw - 36vw)', fontSize: '1.08rem', fontWeight: 600, color: darkMode ? '#fff' : '#222'}}>
        <span style={{ color: darkMode ? '#fff' : '#222' }}>Select Departing flights</span>
      </div>
      <div style={{margin: '0.3rem 18vw 0 18vw', width: 'calc(100vw - 36vw)', fontSize: '1rem', color: darkMode ? '#bbb' : '#666', fontWeight: 400}}>
        <span style={{ color: darkMode ? '#bbb' : '#666' }}>Your company's travel policy benchmark for this trip is $349</span>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0.7rem 18vw 0 18vw', width: 'calc(100vw - 36vw)'}}>
        <a href="#" style={{color: darkMode ? '#90caf9' : '#1976d2', textDecoration: 'none', fontWeight: 500, fontSize: '1rem', cursor: 'pointer', flex: 1}}>View company message</a>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', minWidth: 210, marginLeft: 18, marginTop: '-0.7rem'}}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '1.1rem 0.7rem 1.1rem 0.7rem', marginLeft: '0.7rem' }}>
            <span style={{ fontSize: '0.89rem', color: darkMode ? '#fff' : '#222', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center' }}>
              Saver
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{marginLeft: 6, verticalAlign: 'middle'}}><circle cx="12" cy="12" r="10" stroke={darkMode ? '#90caf9' : '#1976d2'} strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill={darkMode ? '#90caf9' : '#1976d2'} fontFamily="Segoe UI, Arial, sans-serif">i</text></svg>
            </span>
            <span style={{ fontSize: '0.75rem', color: darkMode ? '#bbb' : '#666', fontWeight: 400, marginBottom: '0.7rem', display: 'block', textAlign: 'center' }}>
              Essential services only
            </span>
          </div>
          <div style={{ width: 1, background: '#e3e3e3', alignSelf: 'stretch' }} />
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '1.1rem 0.7rem 1.1rem 0.7rem',
            background: '#1976d2',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: '0 2px 8px rgba(25,118,210,0.18)',
            color: '#fff',
            border: '2px solid #1976d2',
            transition: 'background 0.2s, color 0.2s',
          }}>
            <span style={{ fontSize: '0.89rem', color: '#fff', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center' }}>
              Popular
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{marginLeft: 6, verticalAlign: 'middle'}}><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="Segoe UI, Arial, sans-serif">i</text></svg>
            </span>
            <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 400, marginBottom: '0.7rem', display: 'block', textAlign: 'center' }}>
              Most popular choice
            </span>
          </div>
          <div style={{ width: 1, background: '#e3e3e3', alignSelf: 'stretch' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '1.1rem 0.7rem 1.1rem 0.7rem' }}>
            <span style={{ fontSize: '0.89rem', color: darkMode ? '#fff' : '#222', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center' }}>
              Premium
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{marginLeft: 6, verticalAlign: 'middle'}}><circle cx="12" cy="12" r="10" stroke={darkMode ? '#90caf9' : '#1976d2'} strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill={darkMode ? '#90caf9' : '#1976d2'} fontFamily="Segoe UI, Arial, sans-serif">i</text></svg>
            </span>
            <span style={{ fontSize: '0.75rem', color: darkMode ? '#bbb' : '#666', fontWeight: 400, marginBottom: '0.7rem', display: 'block', textAlign: 'center' }}>
              Maximum flexibility and comfort
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar; 