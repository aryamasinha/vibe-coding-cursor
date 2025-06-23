import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`);
  };

  return (
    <div className="flight-search">
      <h2>Flight Search</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origin:</label>
          <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} required />
        </div>
        <div>
          <label>Destination:</label>
          <input type="text" value={destination} onChange={e => setDestination(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default FlightSearch; 