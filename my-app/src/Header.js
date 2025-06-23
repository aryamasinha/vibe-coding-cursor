import React from 'react';

function Header() {
  return (
    <header style={{
      width: '100%',
      background: '#1976d2',
      color: '#fff',
      padding: '1rem 0',
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      letterSpacing: '1px',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.07)'
    }}>
      Flight Search App
    </header>
  );
}

export default Header; 