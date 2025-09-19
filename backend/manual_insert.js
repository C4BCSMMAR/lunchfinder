// Manually insert data using direct API calls
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function manualInsert() {
  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword('admin@example.com', 'admin123');
    console.log('✅ Admin authentication successful');

    // Clear existing restaurants first
    try {
      const existingRestaurants = await pb.collection('restaurants').getFullList();
      for (const restaurant of existingRestaurants) {
        await pb.collection('restaurants').delete(restaurant.id);
        console.log(`🗑️ Deleted restaurant: ${restaurant.id}`);
      }
    } catch (error) {
      console.log('ℹ️ No existing restaurants to delete');
    }

    // Insert restaurants one by one with explicit field values
    const restaurants = [
      {
        name: "Mario's Pizza Palace",
        cuisine: "Italian",
        menu_url: "https://mariospizza.com/menu",
        image: "🍕",
        description: "Authentic Italian pizza with fresh ingredients and traditional recipes."
      },
      {
        name: "Dragon Express",
        cuisine: "Chinese",
        menu_url: "https://dragonexpress.com/menu",
        image: "🥡",
        description: "Fast and delicious Chinese cuisine with generous portions."
      },
      {
        name: "Burger Junction",
        cuisine: "American",
        menu_url: "https://burgerjunction.com/menu",
        image: "🍔",
        description: "Juicy burgers and crispy fries made with premium ingredients."
      }
    ];

    console.log('📝 Inserting restaurants...');
    for (let i = 0; i < restaurants.length; i++) {
      const restaurant = restaurants[i];
      try {
        console.log(`\n🔄 Creating restaurant ${i + 1}: ${restaurant.name}`);
        console.log('Data being sent:', JSON.stringify(restaurant, null, 2));

        const created = await pb.collection('restaurants').create(restaurant);
        console.log(`✅ Created restaurant with ID: ${created.id}`);

        // Immediately try to fetch it back
        const fetched = await pb.collection('restaurants').getOne(created.id);
        console.log(`🔍 Fetched back:`, fetched);
        console.log(`   Name: "${fetched.name}"`);
        console.log(`   Cuisine: "${fetched.cuisine}"`);

      } catch (error) {
        console.error(`❌ Error creating restaurant ${restaurant.name}:`, error);
        if (error.data) {
          console.error('Error details:', JSON.stringify(error.data, null, 2));
        }
      }
    }

    // Test list fetch
    console.log('\n🔍 Testing list fetch...');
    const allRestaurants = await pb.collection('restaurants').getList(1, 10);
    console.log(`Found ${allRestaurants.items.length} restaurants`);
    allRestaurants.items.forEach((r, i) => {
      console.log(`${i + 1}. ID: ${r.id}, Name: "${r.name}", Cuisine: "${r.cuisine}"`);
    });

  } catch (error) {
    console.error('❌ Manual insert failed:', error);
    if (error.data) {
      console.error('Error details:', JSON.stringify(error.data, null, 2));
    }
  }
}

manualInsert();