import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightSearch from './FlightSearch';
import SearchResult from './SearchResult';
import SearchBar from './SearchBar';
import './App.css';
import egenciaLogo from './assets/egencia-logo.png';
import amexGbtLogo from './assets/amex-gbt-logo.png';

function Header({ darkMode, setDarkMode, glassmorphism, setGlassmorphism }) {
  const [bookOpen, setBookOpen] = React.useState(false);
  const [toolsOpen, setToolsOpen] = React.useState(false);
  return (
    <header style={{
      width: '100%',
      background: glassmorphism ? 'rgba(255,255,255,0.18)' : (darkMode ? '#181c24' : '#fff'),
      borderBottom: glassmorphism ? '1.5px solid rgba(255,255,255,0.25)' : (darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3'),
      padding: '0.7rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: glassmorphism ? '0 8px 32px 0 rgba(31,38,135,0.18)' : (darkMode ? '0 2px 8px rgba(0,0,0,0.18)' : '0 2px 8px rgba(31,38,135,0.04)'),
      backdropFilter: glassmorphism ? 'blur(16px)' : undefined,
      WebkitBackdropFilter: glassmorphism ? 'blur(16px)' : undefined
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <img src={egenciaLogo} alt="Egencia.com" style={{ height: 64, paddingLeft: '1.5rem', filter: darkMode ? 'brightness(0) invert(1)' : 'none' }} />
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ position: 'relative' }} onMouseLeave={() => setBookOpen(false)}>
            <button
              type="button"
              onClick={() => setBookOpen(b => !b)}
              style={{
                color: darkMode ? '#fff' : '#222',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.97rem',
                letterSpacing: 0.2,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Book <svg style={{marginLeft: 4, verticalAlign: 'middle'}} width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke={darkMode ? '#90caf9' : '#1976d2'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {bookOpen && (
              <div style={{
                position: 'absolute',
                top: '2.2rem',
                left: 0,
                background: darkMode ? '#23283a' : '#fff',
                border: darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3',
                borderRadius: 8,
                boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.18)' : '0 4px 16px rgba(31,38,135,0.08)',
                minWidth: 150,
                zIndex: 10,
                padding: '0.5rem 0'
              }}
                onMouseEnter={() => setBookOpen(true)}
                onMouseLeave={() => setBookOpen(false)}
              >
                <a href="#" style={{ display: 'block', padding: '0.7rem 1.2rem', color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 400, fontSize: '0.95rem' }}>Flights</a>
                <a href="#" style={{ display: 'block', padding: '0.7rem 1.2rem', color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 400, fontSize: '0.95rem' }}>Hotels</a>
                <a href="#" style={{ display: 'block', padding: '0.7rem 1.2rem', color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 400, fontSize: '0.95rem' }}>Cars</a>
              </div>
            )}
          </div>
          <a href="#" style={{ color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500, fontSize: '0.97rem', letterSpacing: 0.2 }}>Trips</a>
          <div style={{ position: 'relative' }} onMouseLeave={() => setToolsOpen(false)}>
            <button
              type="button"
              onClick={() => setToolsOpen(t => !t)}
              style={{
                color: darkMode ? '#fff' : '#222',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.97rem',
                letterSpacing: 0.2,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Tools <svg style={{marginLeft: 4, verticalAlign: 'middle'}} width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke={darkMode ? '#90caf9' : '#1976d2'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {toolsOpen && (
              <div style={{
                position: 'absolute',
                top: '2.2rem',
                left: 0,
                background: darkMode ? '#23283a' : '#fff',
                border: darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3',
                borderRadius: 8,
                boxShadow: darkMode ? '0 4px 16px rgba(0,0,0,0.18)' : '0 4px 16px rgba(31,38,135,0.08)',
                minWidth: 150,
                zIndex: 10,
                padding: '0.5rem 0'
              }}
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <a href="#" style={{ display: 'block', padding: '0.7rem 1.2rem', color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 400, fontSize: '0.95rem' }}>Travel Policy</a>
                <a href="#" style={{ display: 'block', padding: '0.7rem 1.2rem', color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 400, fontSize: '0.95rem' }}>Reports</a>
                <a href="#" style={{ display: 'block', padding: '0.7rem 1.2rem', color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 400, fontSize: '0.95rem' }}>Support</a>
              </div>
            )}
          </div>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a href="#" style={{ color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500, fontSize: '0.97rem', marginRight: 2 }}>Help</a>
        <a href="#" style={{ color: darkMode ? '#fff' : '#222', textDecoration: 'none', fontWeight: 500, fontSize: '0.97rem', marginRight: 2 }}>Feedback</a>
        <button
          type="button"
          style={{
            background: 'none',
            color: darkMode ? '#fff' : '#222',
            border: 'none',
            borderRadius: '18px',
            padding: '0.45rem 1.3rem',
            fontWeight: 500,
            fontSize: '0.97rem',
            marginRight: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: 'none',
            transition: 'background 0.2s',
          }}
        >
          Login
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={darkMode ? '#fff' : '#222'} strokeWidth="1.7"/><path d="M4 20c0-2.5 3.5-4.5 8-4.5s8 2 8 4.5" stroke={darkMode ? '#fff' : '#222'} strokeWidth="1.7" strokeLinecap="round"/></svg>
        </button>
        <button
          type="button"
          onClick={() => setGlassmorphism(g => !g)}
          style={{
            background: glassmorphism ? 'rgba(25, 118, 210, 0.18)' : '#fff',
            border: '1.5px solid #1976d2',
            borderRadius: '50%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(31,38,135,0.08)',
            transition: 'background 0.2s',
            marginRight: 6
          }}
          aria-label="Toggle glassmorphism"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#1976d2" strokeWidth="2" fill={glassmorphism ? 'rgba(25,118,210,0.12)' : 'none'} /><path d="M7 7l10 10" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button
          type="button"
          onClick={() => setDarkMode(d => !d)}
          style={{
            background: darkMode ? '#222' : '#fff',
            border: '1.5px solid #1976d2',
            borderRadius: '50%',
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(31,38,135,0.08)',
            transition: 'background 0.2s',
            marginRight: 12
          }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 0 1 12.79 3 7 7 0 1 0 21 12.79Z" stroke="#ffd600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="#1976d2" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#1976d2" strokeWidth="2"/></svg>
          )}
        </button>
      </div>
    </header>
  );
}

function ResultsPage({ darkMode, setDarkMode, glassmorphism }) {
  const [timeRanges, setTimeRanges] = useState({ depTimeRange: '', arrTimeRange: '' });
  return (
    <>
      <SearchBar darkMode={darkMode} setDarkMode={setDarkMode} onTimeRangeChange={setTimeRanges} glassmorphism={glassmorphism} />
      <SearchResult darkMode={darkMode} depTimeRange={timeRanges.depTimeRange} arrTimeRange={timeRanges.arrTimeRange} glassmorphism={glassmorphism} />
    </>
  );
}

function Footer({ darkMode, glassmorphism }) {
  return (
    <footer style={{
      width: '100%',
      background: glassmorphism ? 'rgba(255,255,255,0.18)' : (darkMode ? '#181c24' : '#fff'),
      borderTop: glassmorphism ? '1.5px solid rgba(255,255,255,0.25)' : (darkMode ? '1px solid #333a4d' : '1px solid #e3e3e3'),
      padding: '1.2rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto',
      fontSize: '1rem',
      color: darkMode ? '#fff' : '#222',
      boxShadow: glassmorphism ? '0 8px 32px 0 rgba(31,38,135,0.18)' : undefined,
      backdropFilter: glassmorphism ? 'blur(16px)' : undefined,
      WebkitBackdropFilter: glassmorphism ? 'blur(16px)' : undefined
    }}>
      <img src={egenciaLogo} alt="Egencia.com" style={{ height: 80, filter: darkMode ? 'brightness(0) invert(1)' : 'none' }} />
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.5rem',
        marginTop: '1.1rem',
        fontSize: '1rem',
        fontWeight: 500,
      }}>
        <a href="#" style={{ color: darkMode ? '#90caf9' : '#222', textDecoration: 'none', fontSize: '1rem' }}>Egencia.com</a>
        <a href="#" style={{ color: darkMode ? '#90caf9' : '#222', textDecoration: 'none', fontSize: '1rem' }}>Privacy</a>
        <a href="#" style={{ color: darkMode ? '#90caf9' : '#222', textDecoration: 'none', fontSize: '1rem' }}>Cookie policy</a>
        <a href="#" style={{ color: darkMode ? '#90caf9' : '#222', textDecoration: 'none', fontSize: '1rem' }}>Egencia promise</a>
        <a href="#" style={{ color: darkMode ? '#90caf9' : '#222', textDecoration: 'none', fontSize: '1rem' }}>Egencia LLC Terms of use</a>
        <a href="#" style={{ color: darkMode ? '#90caf9' : '#222', textDecoration: 'none', fontSize: '1rem' }}>Mobile app</a>
        <a href="#" style={{ color: darkMode ? '#90caf9' : '#222', textDecoration: 'none', fontSize: '1rem' }}>Customer support</a>
      </div>
      <div style={{
        marginTop: '1.1rem',
        textAlign: 'center',
        fontSize: '0.92rem',
        color: darkMode ? '#bbb' : '#666',
        maxWidth: 1800,
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 1.5,
        fontWeight: 400,
        paddingLeft: '5rem',
        paddingRight: '5rem',
      }}>
        GBT Travel Services UK Limited (GBT UK) and its authorized sublicensees (including Ovation Travel Group and Egencia) use certain trademarks and service marks of American Express Company or its subsidiaries (American Express) in the "American Express Global Business Travel" and "American Express GBT Meetings & Events" brands and in connection with its business for permitted uses only under a limited license from American Express (Licensed Marks). The Licensed Marks are trademarks or service marks of, and the property of, American Express. GBT UK is a subsidiary of Global Business Travel Group, Inc. (NYSE: GBTG). American Express holds a minority interest in GBTG, which operates as a separate company from American Express.
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1.2rem' }}>
        <img src={amexGbtLogo} alt="Amex GBT" style={{ height: 60 }} />
      </div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '0.7rem', fontSize: '0.95rem', color: '#888', fontWeight: 400 }}>
        © 2025 GBT Travel Services UK Limited
      </div>
    </footer>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [glassmorphism, setGlassmorphism] = useState(false);
  return (
    <Router>
      <div className={`App${darkMode ? ' dark-mode' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} glassmorphism={glassmorphism && !darkMode} setGlassmorphism={setGlassmorphism} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<FlightSearch />} />
            <Route path="/results" element={<ResultsPage darkMode={darkMode} setDarkMode={setDarkMode} glassmorphism={glassmorphism && !darkMode} />} />
          </Routes>
        </div>
        <Footer darkMode={darkMode} glassmorphism={glassmorphism && !darkMode} />
      </div>
    </Router>
  );
}

export default App;
