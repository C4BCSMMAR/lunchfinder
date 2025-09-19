// Fallback restaurant data in case the API is not working
import type { Restaurant } from '../types';

export const fallbackRestaurants: Restaurant[] = [
  {
    id: 'fallback-1',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    menu_url: 'https://example.com/pizza-palace-menu',
    image: '🍕',
    description: 'Authentic Italian pizza with fresh ingredients and traditional recipes'
  },
  {
    id: 'fallback-2',
    name: 'Burger Junction',
    cuisine: 'American',
    menu_url: 'https://example.com/burger-junction-menu',
    image: '🍔',
    description: 'Gourmet burgers with crispy fries and milkshakes'
  },
  {
    id: 'fallback-3',
    name: 'Sushi Masters',
    cuisine: 'Japanese',
    menu_url: 'https://example.com/sushi-masters-menu',
    image: '🍣',
    description: 'Fresh sushi and traditional Japanese specialties'
  },
  {
    id: 'fallback-4',
    name: 'Taco Express',
    cuisine: 'Mexican',
    menu_url: 'https://example.com/taco-express-menu',
    image: '🌮',
    description: 'Quick Mexican food with bold flavors and fresh ingredients'
  },
  {
    id: 'fallback-5',
    name: 'Green Bowl',
    cuisine: 'Healthy',
    menu_url: 'https://example.com/green-bowl-menu',
    image: '🥗',
    description: 'Fresh salads and healthy meal options for conscious eaters'
  },
  {
    id: 'fallback-6',
    name: 'Noodle House',
    cuisine: 'Asian',
    menu_url: 'https://example.com/noodle-house-menu',
    image: '🍜',
    description: 'Traditional Asian noodle dishes and soups'
  }
];