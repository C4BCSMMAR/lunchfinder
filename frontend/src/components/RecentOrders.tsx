import type { Order } from '../types'

interface RecentOrdersProps {
  orders: Order[]
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="lp-card p-6">
      <div className="flex items-center mb-4">
        <span className="text-xl mr-2">🕒</span>
        <h3 className="text-lg font-medium" style={{color: 'var(--text-primary)'}}>Recent Orders</h3>
        <div className="ml-auto flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full animate-pulse-custom" style={{background: 'var(--success)'}}></div>
          <span className="text-xs font-medium" style={{color: 'var(--text-secondary)'}}>Live</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-4xl block mb-3">🍽️</span>
          <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
            No orders yet. Be the first to order!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="animate-slideInRight"
              style={{
                animationDelay: `${index * 100}ms`,
                borderLeft: '4px solid var(--border)',
                paddingLeft: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-lg mr-2">
                      {order.expand?.restaurant_id?.image || '🍽️'}
                    </span>
                    <span className="font-medium text-sm" style={{color: 'var(--text-primary)'}}>
                      {order.user_name}
                    </span>
                  </div>

                  <p className="text-sm mb-1" style={{color: 'var(--text-secondary)'}}>
                    <strong>{order.meal_name}</strong>
                  </p>

                  <p className="text-xs" style={{color: 'var(--text-muted)'}}>
                    from {order.expand?.restaurant_id?.name || 'Restaurant'}
                  </p>

                  {order.notes && (
                    <p className="text-xs mt-1 italic" style={{color: 'var(--text-muted)'}}>
                      "{order.notes}"
                    </p>
                  )}
                </div>

                <span className="text-xs ml-2 flex-shrink-0" style={{color: 'var(--text-muted)'}}>
                  {formatTimeAgo(order.created)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-4 pt-4" style={{borderTop: '1px solid var(--border)'}}>
          <p className="text-xs text-center" style={{color: 'var(--text-secondary)'}}>
            Updates automatically with new orders
          </p>
        </div>
      )}
    </div>
  )
}