import React from 'react';

const Loader = ({ message = 'AI analyzing sales trends...' }) => {
  return (
    <div className="loader-container fade-in">
      <p className="pulsating-text" style={{ marginBottom: '16px' }}>{message}</p>
      <div className="dots-container">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Loader;
