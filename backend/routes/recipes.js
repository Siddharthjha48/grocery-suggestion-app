const express = require('express');
const axios = require('axios');
const router = express.Router();
const Recipe = require('../models/Recipe');

// IMPORTANT: Log the API key to ensure it's loaded correctly from .env
// REMOVE THIS LINE IN PRODUCTION
const SPOONACULAR_API_KEY = process.env.UPI_KEY;
console.log('SPOONACULAR_API_KEY (first 5 chars):', SPOONACULAR_API_KEY ? SPOONACULAR_API_KEY.substring(0, 5) + '...' : 'NOT_SET');


/**
 * @route POST /api/recipes/suggest
 * @desc Suggest recipes based on ingredients
 * @body { ingredients: string[] }
 * @returns { recipes: Recipe[] }
 */
router.post('/suggest', async (req, res) => {
  const { ingredients } = req.body;

  // --- Input Validation ---
  if (!ingredients) {
    console.error('Error: "ingredients" is missing from request body.');
    return res.status(400).json({ error: 'Ingredients are required.' });
  }
  if (!Array.isArray(ingredients)) {
    console.error('Error: "ingredients" is not an array. Received:', ingredients);
    return res.status(400).json({ error: 'Ingredients must be an array of strings.' });
  }
  if (ingredients.length === 0) {
    console.warn('Warning: "ingredients" array is empty. No recipes will be suggested.');
    return res.status(200).json({ recipes: [] }); // Return empty array if no ingredients
  }
  // --- End Input Validation ---

  try {
    // Check if API key is present before making the request
    if (!SPOONACULAR_API_KEY) {
        console.error('Error: SPOONACULAR_API_KEY is not set. Cannot fetch recipes.');
        return res.status(500).json({ error: 'Server configuration error: API key missing.' });
    }

    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 5,
        apiKey: SPOONACULAR_API_KEY
      }
    });

    const recipes = response.data.map(r => ({
      id: r.id,
      title: r.title,
      image: r.image,
      usedIngredients: r.usedIngredients,
      missedIngredients: r.missedIngredients
    }));
    res.json({ recipes });

  } catch (error) {
    // --- Detailed Error Logging ---
    console.error('Error in /api/recipes/suggest:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx (e.g., 401, 404, 429 from Spoonacular)
      console.error('Spoonacular API response error data:', error.response.data);
      console.error('Spoonacular API response status:', error.response.status);
      console.error('Spoonacular API response headers:', error.response.headers);

      // Forward Spoonacular's error message if available, or a more specific one
      const errorMessage = error.response.data.message || `Spoonacular API error: ${error.response.status}`;
      return res.status(error.response.status).json({ error: errorMessage });
    } else if (error.request) {
      // The request was made but no response was received (e.g., network issue)
      console.error('No response received from Spoonacular API:', error.request);
      return res.status(500).json({ error: 'No response from recipe API. Check network connectivity.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up Spoonacular API request:', error.message);
      return res.status(500).json({ error: 'Error preparing recipe API request.' });
    }
  }
});

/**
 * @route POST /api/recipes/save
 * @desc Save a recipe
 * @body { recipe: Recipe }
 * @returns { success: boolean, savedRecipes: Recipe[] }
 */
router.post('/save', async (req, res) => {
  const { recipe } = req.body;
  if (recipe && recipe.id) {
    try {
      const existing = await Recipe.findOne({ id: recipe.id });
      if (!existing) {
        await Recipe.create(recipe);
      }
      const savedRecipes = await Recipe.find();
      res.json({ success: true, savedRecipes });
    } catch (err) {
      console.error('Database error in /api/recipes/save:', err.message);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid recipe data' });
  }
});

/**
 * @route POST /api/recipes/rate
 * @desc Rate a recipe
 * @body { recipeId: number, rating: number }
 * @returns { success: boolean, recipeRatings: { [id: number]: number } }
 */
router.post('/rate', async (req, res) => {
  const { recipeId, rating } = req.body;
  if (recipeId && typeof rating === 'number') {
    try {
      await Recipe.updateOne({ id: recipeId }, { $set: { rating } });
      const recipeRatings = {};
      const all = await Recipe.find({}, 'id rating');
      all.forEach(r => { if (r.rating !== undefined) recipeRatings[r.id] = r.rating; });
      res.json({ success: true, recipeRatings });
    } catch (err) {
      console.error('Database error in /api/recipes/rate:', err.message);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid rating data' });
  }
});

module.exports = router;
