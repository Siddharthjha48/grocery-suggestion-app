import React, { useState } from 'react';

const IngredientInput = ({ onAdd }) => {
  const [ingredient, setIngredient] = useState('');

  const handleAdd = () => {
    if (ingredient.trim()) {
      onAdd(ingredient.trim());
      setIngredient('');
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={ingredient}
        onChange={e => setIngredient(e.target.value)}
        placeholder="Enter ingredient"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default IngredientInput; 