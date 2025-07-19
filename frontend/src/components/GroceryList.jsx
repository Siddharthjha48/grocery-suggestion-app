import React from 'react';

const GroceryList = ({ items, darkMode }) => {
  console.log('GroceryList items:', items);
  if (!items.length) return <div>No grocery items.</div>;
  
  return (
    <div>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: darkMode ? '#4ecdc4' : '#667eea',
        fontSize: '1.5rem',
        fontWeight: '600'
      }}>
        🛒 Shopping List
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px'
      }}>
        {items.map((item, idx) => (
          <div key={idx} style={{
            background: darkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.1)',
            padding: '15px 20px',
            borderRadius: '12px',
            border: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
          >
            <span style={{
              color: darkMode ? '#fff' : '#333',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              {item.name || item || 'Unnamed item'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroceryList; 