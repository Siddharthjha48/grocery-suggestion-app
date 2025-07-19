const express = require('express');
const axios = require('axios');
const router = express.Router();
const Recipe = require('../models/Recipe');

const SPOONACULAR_API_KEY = process.env.UPI_KEY;

/**
 * @route POST /api/recipes/suggest
 * @desc Suggest recipes based on ingredients
 * @body { ingredients: string[] }
 * @returns { recipes: Recipe[] }
 */
router.post('/suggest', async (req, res) => {
  const { ingredients } = req.body;
  try {
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
    res.status(500).json({ error: 'Failed to fetch recipes' });
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
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid rating data' });
  }
});

module.exports = router;
