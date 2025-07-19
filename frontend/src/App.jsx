import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import RecipeSuggestions from './components/RecipeSuggestions';
import GroceryList from './components/GroceryList';
import axios from 'axios';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groceryList, setGroceryList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleAddIngredient = (ingredient) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  const handleSuggestRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/recipes/suggest', { ingredients });
      setRecipes(res.data.recipes);
    } catch (err) {
      setRecipes([]);
    }
    setLoading(false);
  };

  const handleGenerateGroceryList = async () => {
    try {
      // Gather all used and missed ingredients from all recipes
      const allIngredients = recipes.flatMap(r => [
        ...(r.usedIngredients || []),
        ...(r.missedIngredients || [])
      ]);
      // Deduplicate by name
      const uniqueIngredients = Array.from(new Set(allIngredients.map(i => i.name)));
      console.log('Sending ingredients to backend:', uniqueIngredients);
      const res = await axios.post('http://localhost:5001/api/grocery/generate', { ingredients: uniqueIngredients });
      setGroceryList(res.data.groceryList);
    } catch (err) {
      setGroceryList([]);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      background: darkMode 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: darkMode ? '#fff' : '#222', 
      margin: 0, 
      padding: 0,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode(dm => !dm)} />
      
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '40px 24px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          padding: '60px 20px',
          background: darkMode 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: darkMode 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            margin: '0 0 20px 0',
            background: darkMode 
              ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' 
              : 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            🍳 Recipe Magic
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: darkMode ? '#b0b0b0' : '#555',
            margin: '0 0 40px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Transform your available ingredients into delicious recipes. 
            Discover new dishes and create your perfect meal plan.
          </p>
          
          <IngredientInput onAdd={handleAddIngredient} darkMode={darkMode} />
        </div>

        {/* Ingredients Display */}
        {ingredients.length > 0 && (
          <div style={{
            background: darkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '30px',
            backdropFilter: 'blur(10px)',
            border: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: darkMode ? '#4ecdc4' : '#667eea' }}>
              📋 Your Ingredients
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {ingredients.map((ingredient, index) => (
                <span key={index} style={{
                  background: darkMode 
                    ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' 
                    : 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button 
            onClick={handleSuggestRecipes} 
            disabled={!ingredients.length || loading}
            style={{
              background: !ingredients.length || loading
                ? (darkMode ? '#444' : '#ccc')
                : 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: !ingredients.length || loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transform: !ingredients.length || loading ? 'none' : 'translateY(-2px)',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              if (ingredients.length && !loading) {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (ingredients.length && !loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }
            }}
          >
            {loading ? '🔍 Searching Recipes...' : '✨ Find Recipes'}
          </button>
        </div>

        {/* Recipe Suggestions */}
        {recipes.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <RecipeSuggestions recipes={recipes} darkMode={darkMode} />
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button 
                onClick={handleGenerateGroceryList} 
                disabled={!recipes.length}
                style={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '50px',
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
                🛒 Generate Grocery List
              </button>
            </div>
          </div>
        )}

        {/* Grocery List */}
        {groceryList.length > 0 && (
          <div style={{
            background: darkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
            border: darkMode 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <GroceryList items={groceryList} darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
