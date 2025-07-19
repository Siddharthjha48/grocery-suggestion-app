import React from 'react';

const GroceryList = ({ items }) => {
  console.log('GroceryList items:', items);
  if (!items.length) return <div>No grocery items.</div>;
  return (
    <ul>
    {items.map((item, idx) => (
      <li key={idx}>{item.name || item || 'Unnamed item'}</li>
    ))}
  </ul>
  
  );
};

export default GroceryList; 