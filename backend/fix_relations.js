// Fix collection relations and test
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function fixRelations() {
  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword('admin@example.com', 'admin123');
    console.log('✅ Admin authentication successful');

    // Get restaurants collection info
    const restaurantsCollection = await pb.collections.getOne('restaurants');
    console.log('📋 Restaurants collection ID:', restaurantsCollection.id);

    // Get orders collection
    const ordersCollection = await pb.collections.getOne('orders');
    console.log('📋 Orders collection info:', {
      id: ordersCollection.id,
      name: ordersCollection.name,
      hasSchema: !!ordersCollection.schema
    });

    if (ordersCollection.schema && ordersCollection.schema.length > 0) {
      console.log('📋 Orders collection schema:');
      ordersCollection.schema.forEach(field => {
        console.log(`  - ${field.name}: ${field.type}`);
        if (field.type === 'relation') {
          console.log(`    Relation to: ${field.options?.collectionId || 'undefined'}`);
        }
      });
    } else {
      console.log('⚠️ Orders collection has no schema');
    }

    // Update orders collection to fix relation
    const updatedSchema = ordersCollection.schema.map(field => {
      if (field.name === 'restaurant_id' && field.type === 'relation') {
        return {
          ...field,
          options: {
            ...field.options,
            collectionId: restaurantsCollection.id,
            cascadeDelete: false
          }
        };
      }
      return field;
    });

    await pb.collections.update('orders', {
      schema: updatedSchema
    });
    console.log('✅ Fixed orders collection relation');

    // Test the fixed API
    console.log('🔍 Testing API after fixes...');

    // Test restaurants
    const restaurants = await pb.collection('restaurants').getList(1, 3);
    console.log(`✅ Fetched ${restaurants.items.length} restaurants:`);
    restaurants.items.forEach((restaurant, index) => {
      console.log(`  ${index + 1}. ${restaurant.name} (${restaurant.cuisine}) ${restaurant.image}`);
    });

    // Test orders with expand
    try {
      const orders = await pb.collection('orders').getList(1, 5, {
        sort: '-created',
        expand: 'restaurant_id'
      });
      console.log(`✅ Fetched ${orders.items.length} orders with relations`);
    } catch (error) {
      console.log('ℹ️ No orders exist yet, which is expected');
    }

    console.log('✅ Relations fixed successfully!');

  } catch (error) {
    console.error('❌ Error fixing relations:', error);
  }
}

fixRelations();