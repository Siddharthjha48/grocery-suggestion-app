import React from 'react';

const DarkModeToggle = ({ darkMode, onToggle }) => (
  <button 
    onClick={onToggle} 
    style={{ 
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: 'none',
      background: darkMode ? '#fff' : '#000',
      color: darkMode ? '#000' : '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
      zIndex: 1000
    }}
    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
  >
    {darkMode ? '☀️' : '🌙'}
  </button>
);

export default DarkModeToggle; 