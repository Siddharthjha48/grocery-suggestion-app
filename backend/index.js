const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const groceryRouter = require('./routes/grocery');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/grocery-app');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipesRouter);
app.use('/api/grocery', groceryRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
