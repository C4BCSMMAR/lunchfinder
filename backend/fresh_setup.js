// Fresh setup with proper field handling
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function freshSetup() {
  try {
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword('admin@example.com', 'admin123');
    console.log('✅ Admin authentication successful');

    // Create restaurants collection
    console.log('📝 Creating restaurants collection...');
    const restaurantsCollection = await pb.collections.create({
      name: 'restaurants',
      type: 'base',
      schema: [
        {
          name: 'name',
          type: 'text',
          required: true
        },
        {
          name: 'cuisine',
          type: 'text',
          required: true
        },
        {
          name: 'menu_url',
          type: 'url',
          required: true
        },
        {
          name: 'image',
          type: 'text',
          required: true
        },
        {
          name: 'description',
          type: 'text',
          required: true
        }
      ],
      listRule: '',
      viewRule: '',
      createRule: null,
      updateRule: null,
      deleteRule: null
    });
    console.log('✅ Created restaurants collection');

    // Create orders collection
    console.log('📝 Creating orders collection...');
    const ordersCollection = await pb.collections.create({
      name: 'orders',
      type: 'base',
      schema: [
        {
          name: 'user_name',
          type: 'text',
          required: true
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
            displayFields: null
          }
        },
        {
          name: 'meal_name',
          type: 'text',
          required: true
        },
        {
          name: 'notes',
          type: 'text',
          required: false
        }
      ],
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: null,
      deleteRule: null
    });
    console.log('✅ Created orders collection');

    // Add restaurants with explicit approach
    console.log('📋 Adding restaurants...');
    const restaurantData = [
      ["Mario's Pizza Palace", "Italian", "https://mariospizza.com/menu", "🍕", "Authentic Italian pizza with fresh ingredients and traditional recipes."],
      ["Dragon Express", "Chinese", "https://dragonexpress.com/menu", "🥡", "Fast and delicious Chinese cuisine with generous portions."],
      ["Burger Junction", "American", "https://burgerjunction.com/menu", "🍔", "Juicy burgers and crispy fries made with premium ingredients."]
    ];

    const createdRestaurants = [];
    for (let i = 0; i < restaurantData.length; i++) {
      const [name, cuisine, menu_url, image, description] = restaurantData[i];
      const restaurantRecord = {
        name: name,
        cuisine: cuisine,
        menu_url: menu_url,
        image: image,
        description: description
      };

      console.log(`🔄 Creating: ${name}`);
      const created = await pb.collection('restaurants').create(restaurantRecord);
      createdRestaurants.push(created);
      console.log(`✅ Created restaurant ID: ${created.id}`);
    }

    // Test the data immediately
    console.log('\n🔍 Testing data retrieval...');
    const fetchedRestaurants = await pb.collection('restaurants').getList(1, 10);
    console.log(`📊 Fetched ${fetchedRestaurants.items.length} restaurants:`);

    fetchedRestaurants.items.forEach((restaurant, index) => {
      console.log(`${index + 1}. ${restaurant.name || '[NO NAME]'} (${restaurant.cuisine || '[NO CUISINE]'}) ${restaurant.image || '[NO IMAGE]'}`);
    });

    console.log('\n✅ Fresh setup complete!');

  } catch (error) {
    console.error('❌ Fresh setup failed:', error);
    if (error.data) {
      console.error('Error details:', JSON.stringify(error.data, null, 2));
    }
  }
}

freshSetup();