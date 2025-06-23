import React from 'react';
import './Footer.css';

function Footer({ glassmorphism = false, darkMode = false }) {
  return (
    <footer
      className="site-footer"
      style={glassmorphism ? {
        background: 'rgba(255,255,255,0.22)',
        border: '1.5px solid rgba(255,255,255,0.25)',
        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: darkMode ? '#fff' : '#222',
        borderRadius: 12,
        margin: '0 18vw 2.5rem 18vw',
        padding: '1.2rem 0',
        width: 'calc(100vw - 36vw)',
        textAlign: 'center',
      } : {}}
    >
      <div className="footer-content">
        &copy; {new Date().getFullYear()} Flight Booker. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer; 