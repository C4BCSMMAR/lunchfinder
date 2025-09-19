import { useState } from 'react'
import type { Restaurant } from '../types'

interface OrderFormProps {
  restaurant: Restaurant
  userName: string
  onBack: () => void
  onSubmit: (mealName: string, notes: string) => void
}

export default function OrderForm({ restaurant, userName, onBack, onSubmit }: OrderFormProps) {
  const [mealName, setMealName] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mealName.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit(mealName.trim(), notes.trim())
      // Show success message briefly before going back
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 1500)
    } catch (error) {
      console.error('Order submission failed:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 lp-card p-4 animate-slideInUp" style={{backgroundColor: 'var(--surface)', borderColor: 'var(--success)'}}>
          <div className="flex items-center">
            <span className="text-xl mr-2" style={{color: 'var(--success)'}}>✅</span>
            <div>
              <h3 className="font-medium" style={{color: 'var(--success)'}}>Order Submitted Successfully!</h3>
              <p className="text-sm" style={{color: 'var(--text-secondary)'}}>Your lunch order has been recorded.</p>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center mb-6 transition-colors duration-200"
        style={{color: 'var(--text-secondary)'}}
        disabled={showSuccess}
        onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to restaurants
      </button>

      <div className="lp-card p-8">
        {/* Restaurant Header */}
        <div className="flex items-center mb-6">
          <span className="text-3xl mr-4">{restaurant.image}</span>
          <div>
            <h2 className="text-2xl font-semibold mb-1" style={{color: 'var(--text-primary)'}}>
              {restaurant.name}
            </h2>
            <p style={{color: 'var(--text-secondary)'}}>{restaurant.cuisine}</p>
            <p className="text-sm mt-1" style={{color: 'var(--text-muted)'}}>
              {restaurant.description}
            </p>
          </div>
        </div>

        {/* Menu Link */}
        <div className="lp-surface p-4 rounded mb-6">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              style={{color: 'var(--primary-color)'}}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="font-medium mr-3" style={{color: 'var(--primary-color)'}}>View Menu:</span>
            <a
              href={restaurant.menu_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{color: 'var(--primary-color)'}}
            >
              {restaurant.menu_url.replace('https://', '').replace('http://', '')}
            </a>
            <svg
              className="w-4 h-4 ml-1"
              style={{color: 'var(--primary-color)'}}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>

        {/* Order Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="userName" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              disabled
              className="w-full px-3 py-2 border rounded-md cursor-not-allowed"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text-secondary)'
              }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="mealName" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
              What would you like to order? *
            </label>
            <input
              type="text"
              id="mealName"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
              placeholder="e.g., Margherita Pizza, Caesar Salad, etc."
              autoFocus
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-color)'
                e.target.style.boxShadow = '0 0 0 2px rgba(3, 102, 214, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div className="mb-8">
            <label htmlFor="notes" className="block text-sm font-medium mb-2" style={{color: 'var(--text-primary)'}}>
              Special instructions (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
              placeholder="Any special requests, allergies, or preferences..."
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-color)'
                e.target.style.boxShadow = '0 0 0 2px rgba(3, 102, 214, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={showSuccess}
              className="flex-1 px-4 py-2 border rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--surface)'
              }}
              onMouseEnter={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
              onMouseLeave={(e) => e.target.style.borderColor = 'var(--border)'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!mealName.trim() || isSubmitting || showSuccess}
              className="flex-1 lp-primary py-2 px-4 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{focusRingColor: 'var(--primary-color)'}}
            >
              {showSuccess ? (
                <div className="flex items-center justify-center">
                  <span className="mr-2">✅</span>
                  Order Submitted!
                </div>
              ) : isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 lp-surface rounded">
          <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
            <strong>Note:</strong> This is for lunch coordination only. You'll need to place your actual order with the restaurant directly using their menu link above.
          </p>
        </div>
      </div>
    </div>
  )
}