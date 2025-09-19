// PocketBase setup script
// Run this with: node setup.js

const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://localhost:8081');

async function setupDatabase() {
  try {
    // Authenticate as admin first
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword('admin@example.com', 'admin123');
    console.log('✅ Admin authentication successful');

    try {
      // Create restaurants collection
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
        ]
      });
      console.log('✅ Created restaurants collection');
    } catch (error) {
      if (error.status !== 400) {
        throw error;
      }
      console.log('ℹ️ Restaurants collection already exists');
    }

    // Create orders collection
    try {
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
              collectionId: 'restaurants',
              cascadeDelete: false
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
        ]
      });
      console.log('✅ Created orders collection');
    } catch (error) {
      if (error.status !== 400) {
        throw error;
      }
      console.log('ℹ️ Orders collection already exists');
    }

    console.log('✅ Database schema setup complete!');

  } catch (error) {
    console.error('❌ Error setting up database:', error);

    // If we get auth error, we need to create admin first
    if (error.status === 401) {
      console.log('\n📋 Please visit http://localhost:8081/_/ to create admin account first, then run this script again');
    }
  }
}

// Run setup
setupDatabase();