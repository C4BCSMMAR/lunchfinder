// Populate database with restaurant data and set permissions
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

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

async function populateData() {
  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword('admin@example.com', 'admin123');
    console.log('✅ Admin authentication successful');

    // Get existing restaurants
    let existingRestaurants = [];
    try {
      const result = await pb.collection('restaurants').getList(1, 50);
      existingRestaurants = result.items;
      console.log(`📋 Found ${existingRestaurants.length} existing restaurants`);
    } catch (error) {
      console.log('📋 No existing restaurants found');
    }

    // Add restaurants if not already present
    for (const restaurant of restaurants) {
      const exists = existingRestaurants.find(r => r.name === restaurant.name);
      if (!exists) {
        try {
          const created = await pb.collection('restaurants').create(restaurant);
          console.log(`✅ Created restaurant: ${restaurant.name}`);
        } catch (error) {
          console.error(`❌ Error creating restaurant ${restaurant.name}:`, error);
        }
      } else {
        console.log(`ℹ️ Restaurant already exists: ${restaurant.name}`);
      }
    }

    // Set permissions for collections
    console.log('🔧 Setting up collection permissions...');

    // Set restaurants collection permissions (public read)
    try {
      await pb.collections.update('restaurants', {
        listRule: '',  // Anyone can list
        viewRule: '',  // Anyone can view
        createRule: null, // Only admins can create
        updateRule: null, // Only admins can update
        deleteRule: null  // Only admins can delete
      });
      console.log('✅ Set restaurants permissions');
    } catch (error) {
      console.error('❌ Error setting restaurants permissions:', error);
    }

    // Set orders collection permissions (public create/read)
    try {
      await pb.collections.update('orders', {
        listRule: '',  // Anyone can list (for recent orders display)
        viewRule: '',  // Anyone can view
        createRule: '',  // Anyone can create orders
        updateRule: null, // Only admins can update
        deleteRule: null  // Only admins can delete
      });
      console.log('✅ Set orders permissions');
    } catch (error) {
      console.error('❌ Error setting orders permissions:', error);
    }

    console.log('✅ Database population and setup complete!');

  } catch (error) {
    console.error('❌ Error populating data:', error);
  }
}

// Run population
populateData();