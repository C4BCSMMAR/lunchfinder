// Debug individual record fetch
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function debugIndividual() {
  try {
    console.log('🔍 Testing individual record fetch...');

    // Get list of restaurants first to get IDs
    const restaurants = await pb.collection('restaurants').getList(1, 1);
    if (restaurants.items.length === 0) {
      console.log('❌ No restaurants found');
      return;
    }

    const firstRestaurantId = restaurants.items[0].id;
    console.log('🔍 Fetching restaurant with ID:', firstRestaurantId);

    // Try to get individual restaurant
    const restaurant = await pb.collection('restaurants').getOne(firstRestaurantId);
    console.log('Individual restaurant data:');
    console.log(JSON.stringify(restaurant, null, 2));

    // Also check collection info
    console.log('\n🔍 Checking collection info...');
    await pb.admins.authWithPassword('admin@example.com', 'admin123');
    const collection = await pb.collections.getOne('restaurants');
    console.log('Collection schema:');
    collection.schema.forEach(field => {
      console.log(`  - ${field.name}: ${field.type} (required: ${field.required})`);
    });

  } catch (error) {
    console.error('❌ Debug failed:', error);
    if (error.data) {
      console.error('Error details:', JSON.stringify(error.data, null, 2));
    }
  }
}

debugIndividual();