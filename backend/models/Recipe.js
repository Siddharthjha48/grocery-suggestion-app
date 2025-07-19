const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  image: String,
  usedIngredients: Array,
  missedIngredients: Array,
  rating: Number,
});

module.exports = mongoose.model('Recipe', RecipeSchema); 