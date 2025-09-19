// Recreate collections with proper schema
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function recreateCollections() {
  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword('admin@example.com', 'admin123');
    console.log('✅ Admin authentication successful');

    // Delete existing collections if they exist
    try {
      await pb.collections.delete('orders');
      console.log('🗑️ Deleted existing orders collection');
    } catch (error) {
      console.log('ℹ️ No orders collection to delete');
    }

    try {
      await pb.collections.delete('restaurants');
      console.log('🗑️ Deleted existing restaurants collection');
    } catch (error) {
      console.log('ℹ️ No restaurants collection to delete');
    }

    // Create restaurants collection
    console.log('📝 Creating restaurants collection...');
    const restaurantsCollection = await pb.collections.create({
      name: 'restaurants',
      type: 'base',
      schema: [
        {
          name: 'name',
          type: 'text',
          required: true,
          options: {
            max: 100
          }
        },
        {
          name: 'cuisine',
          type: 'text',
          required: true,
          options: {
            max: 50
          }
        },
        {
          name: 'menu_url',
          type: 'url',
          required: true
        },
        {
          name: 'image',
          type: 'text',
          required: true,
          options: {
            max: 10
          }
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          options: {
            max: 200
          }
        }
      ],
      listRule: '',  // Anyone can list
      viewRule: '',  // Anyone can view
      createRule: null, // Only admins can create
      updateRule: null, // Only admins can update
      deleteRule: null  // Only admins can delete
    });
    console.log('✅ Created restaurants collection with ID:', restaurantsCollection.id);

    // Create orders collection
    console.log('📝 Creating orders collection...');
    const ordersCollection = await pb.collections.create({
      name: 'orders',
      type: 'base',
      schema: [
        {
          name: 'user_name',
          type: 'text',
          required: true,
          options: {
            max: 100
          }
        },
        {
          name: 'restaurant_id',
          type: 'relation',
          required: true,
          options: {
            collectionId: restaurantsCollection.id,
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: []
          }
        },
        {
          name: 'meal_name',
          type: 'text',
          required: true,
          options: {
            max: 200
          }
        },
        {
          name: 'notes',
          type: 'text',
          required: false,
          options: {
            max: 500
          }
        }
      ],
      listRule: '',  // Anyone can list
      viewRule: '',  // Anyone can view
      createRule: '',  // Anyone can create orders
      updateRule: null, // Only admins can update
      deleteRule: null  // Only admins can delete
    });
    console.log('✅ Created orders collection with ID:', ordersCollection.id);

    // Add sample restaurants
    console.log('📋 Adding sample restaurants...');
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
      },
      {
        name: "Sushi Zen",
        cuisine: "Japanese",
        menu_url: "https://sushizen.com/menu",
        image: "🍣",
        description: "Fresh sushi and traditional Japanese dishes in a modern setting."
      },
      {
        name: "Taco Fiesta",
        cuisine: "Mexican",
        menu_url: "https://tacofiesta.com/menu",
        image: "🌮",
        description: "Authentic Mexican tacos with bold flavors and fresh salsas."
      },
      {
        name: "Curry House",
        cuisine: "Indian",
        menu_url: "https://curryhouse.com/menu",
        image: "🍛",
        description: "Aromatic Indian curries and tandoor specialties with authentic spices."
      }
    ];

    for (const restaurant of restaurants) {
      try {
        const created = await pb.collection('restaurants').create(restaurant);
        console.log(`✅ Created restaurant: ${restaurant.name} (ID: ${created.id})`);
      } catch (error) {
        console.error(`❌ Error creating restaurant ${restaurant.name}:`, error);
      }
    }

    // Test the API
    console.log('🔍 Testing API...');
    const testRestaurants = await pb.collection('restaurants').getList(1, 3);
    console.log(`✅ Fetched ${testRestaurants.items.length} restaurants:`);
    testRestaurants.items.forEach((restaurant, index) => {
      console.log(`  ${index + 1}. ${restaurant.name} (${restaurant.cuisine}) ${restaurant.image}`);
    });

    console.log('✅ Collections recreated successfully!');

  } catch (error) {
    console.error('❌ Error recreating collections:', error);
    if (error.data) {
      console.error('Error details:', JSON.stringify(error.data, null, 2));
    }
  }
}

recreateCollections();