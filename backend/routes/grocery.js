const express = require('express');
const router = express.Router();

/**
 * @route POST /api/grocery/generate
 * @desc Generate a grocery list from ingredient names
 * @body { ingredients: string[] }
 * @returns { groceryList: { name: string }[] }
 */
router.post('/generate', (req, res) => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'ingredients must be an array' });
  }

  // Filter out any falsy or invalid values
  const filtered = ingredients.filter(i => typeof i === 'string' && i.trim() !== '');

  const groceryList = filtered.map(name => ({ name }));

  res.json({ groceryList });
});

module.exports = router;

