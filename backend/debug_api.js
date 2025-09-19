// Debug API to see actual data structure
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function debugAPI() {
  try {
    console.log('🔍 Testing PocketBase API connection...');

    // Test restaurants endpoint
    const restaurants = await pb.collection('restaurants').getList(1, 10);
    console.log('Raw restaurants response:');
    console.log(JSON.stringify(restaurants, null, 2));

    console.log('\n🔍 Individual restaurant data:');
    restaurants.items.forEach((restaurant, index) => {
      console.log(`${index + 1}. Restaurant object:`, restaurant);
      console.log(`   Keys:`, Object.keys(restaurant));
      console.log(`   Name: "${restaurant.name}"`);
      console.log(`   Cuisine: "${restaurant.cuisine}"`);
      console.log(`   Image: "${restaurant.image}"`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

debugAPI();