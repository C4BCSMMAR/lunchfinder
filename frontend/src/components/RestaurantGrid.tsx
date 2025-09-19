import type { Restaurant } from '../types'

interface RestaurantGridProps {
  restaurants: Restaurant[]
  onSelect: (restaurant: Restaurant) => void
}

export default function RestaurantGrid({ restaurants, onSelect }: RestaurantGridProps) {
  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl block mb-4">🔍</span>
        <h3 className="text-lg font-medium mb-2" style={{color: 'var(--text-primary)'}}>No restaurants found</h3>
        <p style={{color: 'var(--text-secondary)'}}>Please check your connection and try again.</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4" style={{color: 'var(--text-primary)'}}>
        Available Restaurants
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant, index) => (
          <div
            key={restaurant.id}
            onClick={() => onSelect(restaurant)}
            className="lp-card p-4 cursor-pointer animate-slideInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center mb-3">
              <span className="text-xl mr-3">{restaurant.image}</span>
              <div>
                <h4 className="text-lg font-semibold" style={{color: 'var(--text-primary)'}}>
                  {restaurant.name}
                </h4>
                <p className="text-xs" style={{color: 'var(--text-secondary)'}}>
                  {restaurant.cuisine}
                </p>
              </div>
            </div>

            <p className="text-sm mb-3 line-clamp-2" style={{color: 'var(--text-secondary)'}}>
              {restaurant.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-xs" style={{color: 'var(--text-muted)'}}>
                Click to view menu
              </span>
              <svg
                className="w-4 h-4 transition-colors"
                style={{color: 'var(--text-muted)'}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}