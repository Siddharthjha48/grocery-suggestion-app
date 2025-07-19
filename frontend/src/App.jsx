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
    <div style={{ minHeight: '100vh', width: '100vw', background: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222', margin: 0, padding: 0 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
        <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode(dm => !dm)} />
        <h1>Recipe Generator</h1>
        <IngredientInput onAdd={handleAddIngredient} />
        <div>
          <strong>Ingredients:</strong> {ingredients.join(', ')}
        </div>
        <button onClick={handleSuggestRecipes} disabled={!ingredients.length || loading}>
          {loading ? 'Loading...' : 'Suggest Recipes'}
        </button>
        <RecipeSuggestions recipes={recipes} darkMode={darkMode} />
        <button onClick={handleGenerateGroceryList} disabled={!recipes.length} style={{ marginTop: 16 }}>
          Generate Grocery List
        </button>
        <GroceryList items={groceryList} />
      </div>
    </div>
  );
}

export default App;
