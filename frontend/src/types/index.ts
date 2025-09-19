export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  menu_url: string;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  user_name: string;
  restaurant_id: string;
  meal_name: string;
  notes?: string;
  created: string;
  expand?: {
    restaurant_id: Restaurant;
  };
}

export interface OrderCreate {
  user_name: string;
  restaurant_id: string;
  meal_name: string;
  notes?: string;
}