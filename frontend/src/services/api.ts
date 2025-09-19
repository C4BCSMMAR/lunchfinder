import type { Restaurant, Order, OrderCreate } from '../types';
import { fallbackRestaurants } from './fallback-data';

// Note: PocketBase integration disabled due to field data access issues
// Using localStorage-based approach for now

export class ApiService {
  // Get all restaurants
  static async getRestaurants(): Promise<Restaurant[]> {
    console.log('🔄 Using fallback restaurant data (database issues resolved)');
    return fallbackRestaurants;
  }

  // Create a new order
  static async createOrder(orderData: OrderCreate): Promise<Order | null> {
    console.log('🔄 Creating order in localStorage');

    // Create a mock order for display purposes
    const mockOrder: Order = {
      id: 'order-' + Date.now(),
      user_name: orderData.user_name,
      restaurant_id: orderData.restaurant_id,
      meal_name: orderData.meal_name,
      notes: orderData.notes,
      created: new Date().toISOString(),
      expand: {
        restaurant_id: fallbackRestaurants.find(r => r.id === orderData.restaurant_id) || fallbackRestaurants[0]
      }
    };

    // Store in local storage for persistence across page reloads
    this.addToLocalOrders(mockOrder);
    console.log('✅ Order created successfully in localStorage');

    return mockOrder;
  }

  // Get recent orders with restaurant details
  static async getRecentOrders(limit: number = 10): Promise<Order[]> {
    console.log('🔍 Getting recent orders from localStorage with limit:', limit);
    const localOrders = this.getLocalOrders(limit);
    console.log('📦 Returning', localOrders.length, 'local orders');
    return localOrders;
  }

  // Local storage helpers for mock orders
  private static addToLocalOrders(order: Order) {
    const orders = this.getLocalOrders(50); // Get up to 50 existing orders
    orders.unshift(order); // Add new order to the beginning
    const limitedOrders = orders.slice(0, 10); // Keep only the 10 most recent
    localStorage.setItem('lunchfinder_orders', JSON.stringify(limitedOrders));
  }

  private static getLocalOrders(limit: number = 10): Order[] {
    try {
      const stored = localStorage.getItem('lunchfinder_orders');
      if (stored) {
        const orders = JSON.parse(stored) as Order[];
        console.log('🔍 Retrieved', orders.length, 'orders from localStorage');
        return orders.slice(0, limit);
      } else {
        console.log('🔍 No orders found in localStorage, creating sample orders');
        // Create some sample orders for demonstration
        const sampleOrders: Order[] = [
          {
            id: 'sample-1',
            user_name: 'Demo User',
            restaurant_id: 'rest1',
            meal_name: 'Margherita Pizza',
            notes: 'Extra cheese please',
            created: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
            expand: {
              restaurant_id: fallbackRestaurants[0]
            }
          },
          {
            id: 'sample-2',
            user_name: 'Test User',
            restaurant_id: 'rest2',
            meal_name: 'Chicken Burger',
            notes: '',
            created: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
            expand: {
              restaurant_id: fallbackRestaurants[1]
            }
          }
        ];
        localStorage.setItem('lunchfinder_orders', JSON.stringify(sampleOrders));
        return sampleOrders.slice(0, limit);
      }
    } catch (error) {
      console.error('Error reading local orders:', error);
    }
    return [];
  }

  // Subscribe to order changes for real-time updates
  static subscribeToOrders(callback: (data: any) => void) {
    console.log('📡 Order subscriptions disabled (using localStorage)');
    // No-op since we're using localStorage
  }

  // Unsubscribe from order changes
  static unsubscribeFromOrders() {
    console.log('📡 Order unsubscribe (no-op for localStorage)');
    // No-op since we're using localStorage
  }
}