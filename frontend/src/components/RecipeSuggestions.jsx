import React, { useState } from 'react';
import axios from 'axios';

const RecipeSuggestions = ({ recipes, darkMode }) => {
  const [saveStatus, setSaveStatus] = useState({});
  const [rateStatus, setRateStatus] = useState({});
  const [ratings, setRatings] = useState({});

  const handleSave = async (recipe) => {
    try {
      await axios.post('http://localhost:5001/api/recipes/save', { recipe });
      setSaveStatus(prev => ({ ...prev, [recipe.id]: 'Saved!' }));
    } catch {
      setSaveStatus(prev => ({ ...prev, [recipe.id]: 'Error saving' }));
    }
  };

  const handleRate = async (recipeId, rating) => {
    setRatings(prev => ({ ...prev, [recipeId]: rating }));
    try {
      await axios.post('http://localhost:5001/api/recipes/rate', { recipeId, rating });
      setRateStatus(prev => ({ ...prev, [recipeId]: 'Rated!' }));
    } catch {
      setRateStatus(prev => ({ ...prev, [recipeId]: 'Error rating' }));
    }
  };

  if (!recipes.length) return <div>No recipes found.</div>;
  return (
    <div>
      <h2>Recipe Suggestions</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {recipes.map(recipe => (
          <div key={recipe.id} style={{ 
            border: `1px solid ${darkMode ? '#444' : '#ccc'}`, 
            borderRadius: 8, 
            padding: 16, 
            width: 250, 
            background: darkMode ? '#333' : '#fff',
            color: darkMode ? '#fff' : '#222'
          }}>
            <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: 4 }} />
            <h3>{recipe.title}</h3>
            <div>
              <strong>Used Ingredients:</strong>
              <ul>
                {recipe.usedIngredients && recipe.usedIngredients.map((ing, idx) => (
                  <li key={idx}>{ing.original}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Missed Ingredients:</strong>
              <ul>
                {recipe.missedIngredients && recipe.missedIngredients.map((ing, idx) => (
                  <li key={idx}>{ing.original}</li>
                ))}
              </ul>
            </div>
            <a href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}`} target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#4a9eff' : '#646cff' }}>View Recipe</a>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => handleSave(recipe)} style={{ 
                marginRight: 8,
                background: darkMode ? '#555' : '#f9f9f9',
                color: darkMode ? '#fff' : '#222',
                border: `1px solid ${darkMode ? '#666' : '#ccc'}`
              }}>Save</button>
              {saveStatus[recipe.id] && <span>{saveStatus[recipe.id]}</span>}
            </div>
            <div style={{ marginTop: 8 }}>
              <label>Rate: </label>
              <select
                value={ratings[recipe.id] || ''}
                onChange={e => handleRate(recipe.id, Number(e.target.value))}
                style={{
                  background: darkMode ? '#555' : '#fff',
                  color: darkMode ? '#fff' : '#222',
                  border: `1px solid ${darkMode ? '#666' : '#ccc'}`
                }}
              >
                <option value="">Select</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              {rateStatus[recipe.id] && <span style={{ marginLeft: 8 }}>{rateStatus[recipe.id]}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSuggestions; 