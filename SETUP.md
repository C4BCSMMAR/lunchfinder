# LunchFinder Setup Guide

## Quick Start

### 1. Start PocketBase Backend
```bash
cd backend
./pocketbase.exe serve --http=0.0.0.0:8080
```

### 2. Setup Database
1. Visit http://localhost:8080/_/
2. Create admin account (email: admin@example.com, password: your_password)
3. Create collections:

#### Restaurants Collection
- **Name**: `restaurants`
- **Type**: Base
- **Schema**:
  - `name` (text, required, max: 100)
  - `cuisine` (text, required, max: 50)
  - `menu_url` (url, required)
  - `image` (text, required, max: 10)
  - `description` (text, required, max: 200)

#### Orders Collection
- **Name**: `orders`
- **Type**: Base
- **Schema**:
  - `user_name` (text, required, max: 100)
  - `restaurant_id` (relation to 'restaurants', required, no cascade)
  - `meal_name` (text, required, max: 200)
  - `notes` (text, optional, max: 500)

### 3. Add Restaurant Data
Add these restaurants to the `restaurants` collection:

```json
[
  {
    "name": "Pizza Palace",
    "cuisine": "Italian",
    "menu_url": "https://example.com/pizza-palace-menu",
    "image": "🍕",
    "description": "Authentic Italian pizza with fresh ingredients and traditional recipes"
  },
  {
    "name": "Burger Junction",
    "cuisine": "American",
    "menu_url": "https://example.com/burger-junction-menu",
    "image": "🍔",
    "description": "Gourmet burgers with crispy fries and milkshakes"
  },
  {
    "name": "Sushi Masters",
    "cuisine": "Japanese",
    "menu_url": "https://example.com/sushi-masters-menu",
    "image": "🍣",
    "description": "Fresh sushi and traditional Japanese specialties"
  },
  {
    "name": "Taco Express",
    "cuisine": "Mexican",
    "menu_url": "https://example.com/taco-express-menu",
    "image": "🌮",
    "description": "Quick Mexican food with bold flavors and fresh ingredients"
  },
  {
    "name": "Green Bowl",
    "cuisine": "Healthy",
    "menu_url": "https://example.com/green-bowl-menu",
    "image": "🥗",
    "description": "Fresh salads and healthy meal options for conscious eaters"
  },
  {
    "name": "Noodle House",
    "cuisine": "Asian",
    "menu_url": "https://example.com/noodle-house-menu",
    "image": "🍜",
    "description": "Traditional Asian noodle dishes and soups"
  }
]
```

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 to use the app!

## Features

- ✅ Simple name entry (no authentication)
- ✅ Restaurant selection from predefined list
- ✅ Menu link display for each restaurant
- ✅ Meal name input
- ✅ Optional notes field
- ✅ Real-time order updates
- ✅ Recent orders sidebar
- ✅ Responsive Tailwind CSS design

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS (Vite)
- **Backend**: PocketBase (SQLite database)
- **Real-time**: PocketBase subscriptions
- **Styling**: Tailwind CSS utility classes

## Development

The app runs on:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- Admin Panel: http://localhost:8080/_/

All data is stored in PocketBase's SQLite database with real-time updates across all connected clients.