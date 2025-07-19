import React, { useState } from 'react';

const IngredientInput = ({ onAdd, darkMode }) => {
  const [ingredient, setIngredient] = useState('');

  const handleAdd = () => {
    if (ingredient.trim()) {
      onAdd(ingredient.trim());
      setIngredient('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '12px', 
      maxWidth: '500px', 
      margin: '0 auto',
      alignItems: 'center'
    }}>
      <input
        type="text"
        value={ingredient}
        onChange={e => setIngredient(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter an ingredient (e.g., chicken, tomatoes, pasta)"
        style={{
          flex: 1,
          padding: '16px 20px',
          borderRadius: '50px',
          border: 'none',
          fontSize: '1rem',
          background: darkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(255, 255, 255, 0.9)',
          color: darkMode ? '#fff' : '#333',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          outline: 'none',
          transition: 'all 0.3s ease'
        }}
        onFocus={(e) => {
          e.target.style.transform = 'scale(1.02)';
          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
        }}
        onBlur={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }}
      />
      <button 
        onClick={handleAdd}
        style={{
          padding: '16px 24px',
          borderRadius: '50px',
          border: 'none',
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transform: 'translateY(-2px)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
      >
        ➕ Add
      </button>
    </div>
  );
};

export default IngredientInput; 