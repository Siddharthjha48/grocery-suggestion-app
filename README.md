# Recipe App

A full-stack recipe suggestion application that helps you find recipes based on available ingredients. The app features a modern UI with dark mode support and allows users to save and rate recipes.

## Features

- 🍳 **Recipe Suggestions**: Get recipe recommendations based on available ingredients
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 💾 **Save Recipes**: Save your favorite recipes for later
- ⭐ **Rate Recipes**: Rate recipes from 1-5 stars
- 🛒 **Grocery List**: Generate shopping lists from recipe ingredients
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js
- Vite
- Axios for API calls
- CSS-in-JS styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your local machine:
   ```bash
   mongod
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5001) and frontend development server simultaneously.

## Project Structure

```
recipe-app/
├── backend/           # Express.js server
│   ├── routes/       # API routes
│   ├── models/       # MongoDB models
│   └── index.js      # Server entry point
├── frontend/         # React.js application
│   ├── src/
│   │   ├── components/  # React components
│   │   └── App.jsx      # Main app component
│   └── package.json
├── package.json       # Root package.json with scripts
└── README.md
```

## Available Scripts

- `npm run dev` - Start both backend and frontend servers
- `npm run dev:backend` - Start only the backend server
- `npm run dev:frontend` - Start only the frontend server
- `npm run install:all` - Install dependencies for all packages

## API Endpoints

### Recipes
- `POST /api/recipes/suggest` - Get recipe suggestions based on ingredients
- `POST /api/recipes/save` - Save a recipe
- `POST /api/recipes/rate` - Rate a recipe

### Grocery
- `POST /api/grocery/generate` - Generate grocery list from recipe ingredients

## Environment Variables

Create a `.env` file in the backend directory if needed:
```
MONGODB_URI=mongodb://localhost:27017/grocery-app
PORT=5001
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 