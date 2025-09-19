// Test PocketBase API connection
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function testAPI() {
  try {
    console.log('🔍 Testing PocketBase API connection...');

    // Test restaurants endpoint
    const restaurants = await pb.collection('restaurants').getList(1, 10);
    console.log(`✅ Successfully fetched ${restaurants.items.length} restaurants`);

    restaurants.items.forEach((restaurant, index) => {
      console.log(`${index + 1}. ${restaurant.name} (${restaurant.cuisine})`);
    });

    // Test orders endpoint
    const orders = await pb.collection('orders').getList(1, 10, {
      sort: '-created',
      expand: 'restaurant_id'
    });
    console.log(`✅ Successfully fetched ${orders.items.length} orders`);

    console.log('✅ API connection test successful!');
  } catch (error) {
    console.error('❌ API connection test failed:', error);
  }
}

testAPI();