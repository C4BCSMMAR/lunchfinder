import { useState, useEffect } from 'react'
import type { Restaurant, Order } from './types'
import { ApiService } from './services/api'
import RestaurantGrid from './components/RestaurantGrid'
import OrderForm from './components/OrderForm'
import RecentOrders from './components/RecentOrders'

function App() {
  const [userName, setUserName] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const [restaurantData, orderData] = await Promise.all([
        ApiService.getRestaurants(),
        ApiService.getRecentOrders(5)
      ])

      setRestaurants(restaurantData)
      setRecentOrders(orderData)
      setIsLoading(false)
    }

    loadData()

    // Subscribe to real-time order updates
    ApiService.subscribeToOrders((data) => {
      if (data.action === 'create') {
        // Refresh recent orders when new order is created
        ApiService.getRecentOrders(5).then(setRecentOrders)
      }
    })

    // Cleanup subscription on unmount
    return () => {
      ApiService.unsubscribeFromOrders()
    }
  }, [])

  const handleOrderSubmit = async (mealName: string, notes: string) => {
    if (!selectedRestaurant || !userName.trim()) return

    const orderData = {
      user_name: userName.trim(),
      restaurant_id: selectedRestaurant.id,
      meal_name: mealName.trim(),
      notes: notes.trim() || undefined
    }

    const newOrder = await ApiService.createOrder(orderData)
    if (newOrder) {
      // Refresh recent orders immediately to show the new order
      const updatedOrders = await ApiService.getRecentOrders(5)
      setRecentOrders(updatedOrders)

      // Reset form after a short delay to show the success message
      setTimeout(() => {
        setSelectedRestaurant(null)
      }, 2000)
    }
  }

  const handleBack = () => {
    setSelectedRestaurant(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen lp-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" style={{borderColor: 'var(--primary-color)'}}></div>
          <p className="mt-4" style={{color: 'var(--text-secondary)'}}>Loading LunchFinder...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{background: 'var(--background)'}}>
      {/* Header */}
      <header className="lp-card border-t-0 border-l-0 border-r-0 sticky top-0 z-10" style={{borderBottom: '1px solid var(--border)', backdropFilter: 'blur(8px)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🍽️</span>
              <div>
                <h1 className="text-2xl font-semibold" style={{color: 'var(--text-primary)'}}>
                  LunchFinder
                </h1>
                <div className="text-sm -mt-1" style={{color: 'var(--text-secondary)'}}>
                  Never wonder where to eat again
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full animate-pulse-custom" style={{background: 'var(--success)'}}></div>
              <div className="text-sm" style={{color: 'var(--text-secondary)'}}>
                Live coordination
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{background: 'linear-gradient(135deg, var(--surface) 0%, var(--background) 100%)'}}>
        {!userName ? (
          /* Name Entry Screen */
          <div className="max-w-md mx-auto">
            <div className="lp-card p-8 animate-fadeIn">
              <div className="text-center mb-6">
                <span className="text-4xl block mb-4">👋</span>
                <h2 className="text-2xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Welcome!</h2>
                <p style={{color: 'var(--text-secondary)'}}>Enter your name to get started</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const name = formData.get('name') as string
                if (name.trim()) setUserName(name.trim())
              }}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                      focusRingColor: 'var(--primary-color)'
                    }}
                    placeholder="Enter your name"
                    autoFocus
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full lp-primary py-2 px-4 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{focusRingColor: 'var(--primary-color)'}}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        ) : !selectedRestaurant ? (
          /* Restaurant Selection Screen */
          <div className="animate-fadeIn">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-semibold" style={{color: 'var(--text-primary)'}}>
                    Hi {userName}! 👋
                  </h2>
                  <p className="mt-1 text-lg" style={{color: 'var(--text-secondary)'}}>
                    Choose a restaurant for your lunch
                  </p>
                </div>
                <button
                  onClick={() => setUserName('')}
                  className="text-sm hover:underline transition-colors"
                  style={{color: 'var(--text-secondary)'}}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  Change name
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RestaurantGrid
                  restaurants={restaurants}
                  onSelect={setSelectedRestaurant}
                />
              </div>
              <div>
                <RecentOrders orders={recentOrders} />
              </div>
            </div>
          </div>
        ) : (
          /* Order Form Screen */
          <OrderForm
            restaurant={selectedRestaurant}
            userName={userName}
            onBack={handleBack}
            onSubmit={handleOrderSubmit}
          />
        )}
      </main>
    </div>
  )
}

export default App
