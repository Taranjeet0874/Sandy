'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  created_at: string
}

interface Cake {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null)
  const [cart, setCart] = useState<Cake[]>([])
  const router = useRouter()

  const cakes: Cake[] = [
    {
      id: 1,
      name: "Red Velvet Dream",
      description: "Velvety smooth chocolate cake with cream cheese frosting",
      price: 45,
      image: "🎂",
      category: "Classic"
    },
    {
      id: 2,
      name: "Strawberry Bliss",
      description: "Fresh strawberry cake with vanilla buttercream",
      price: 38,
      image: "🧁",
      category: "Fruit"
    },
    {
      id: 3,
      name: "Chocolate Heaven",
      description: "Rich chocolate cake with ganache and berries",
      price: 52,
      image: "🍰",
      category: "Chocolate"
    },
    {
      id: 4,
      name: "Vanilla Elegance",
      description: "Classic vanilla cake with buttercream frosting",
      price: 35,
      image: "🎂",
      category: "Classic"
    },
    {
      id: 5,
      name: "Lemon Delight",
      description: "Tangy lemon cake with lemon curd filling",
      price: 42,
      image: "🍋",
      category: "Citrus"
    },
    {
      id: 6,
      name: "Carrot Cake",
      description: "Moist carrot cake with cream cheese frosting",
      price: 40,
      image: "🥕",
      category: "Spiced"
    }
  ]

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user as User)
      } else {
        router.push('/login')
      }
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user as User)
        } else {
          router.push('/login')
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const addToCart = (cake: Cake) => {
    setCart([...cart, cake])
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, cake) => total + cake.price, 0)
  }

  const handleOrder = async () => {
    try {
      // Save order to Supabase database
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            user_email: user.email,
            items: cart,
            total_amount: getTotalPrice(),
            status: 'pending',
            created_at: new Date().toISOString(),
            order_details: {
              item_count: cart.length,
              cakes: cart.map(cake => ({ name: cake.name, price: cake.price }))
            }
          }
        ])

      if (error) {
        console.error('Error saving order:', error)
        // If table doesn't exist, show a different message
        if (error.code === 'PGRST116' || error.message.includes('relation "orders" does not exist')) {
          alert(`🎂 Order received!\n\nTotal: $${getTotalPrice()}\nItems: ${cart.length} cake${cart.length > 1 ? 's' : ''}\n\n⚠️ Note: Orders will be saved once the database table is created.\n\nWe'll contact you at ${user.email} within 24 hours to confirm delivery details and payment.\n\nSweet dreams! 🍰`)
        } else {
          alert('❌ Sorry, there was an error placing your order. Please try again.')
        }
        return
      }

      // Get the order ID safely
      const orderId = data && data.length > 0 ? data[0].id : 'Processing...'

      alert(`🎂 Order placed successfully!\n\nOrder ID: ${orderId}\nTotal: $${getTotalPrice()}\nItems: ${cart.length} cake${cart.length > 1 ? 's' : ''}\n\nWe'll contact you at ${user.email} within 24 hours to confirm delivery details and payment.\n\nSweet dreams! 🍰`)

      setCart([])
    } catch (err) {
      console.error('Order error:', err)
      alert('❌ Sorry, there was an error placing your order. Please try again.')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-pink-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🍰</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-pink-800">Sweer Meraki</h1>
                <p className="text-sm text-pink-600">by Hanshika</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setSelectedCake(selectedCake ? null : cakes[0])}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center"
                >
                  <span className="mr-2">🛒</span>
                  Cart ({cart.length})
                </button>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </div>
              {(user?.email === 'admin@sweermeraki.com' || user?.email?.includes('admin') || user?.email === 'taranjeetsingh@tarun.com' || user?.email === 'tssandy0874@gmail.com') && (
                <a
                  href="/admin"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                >
                  <span className="mr-2">👑</span>
                  Admin
                </a>
              )}
              <button
                onClick={handleLogout}
                className="text-pink-700 hover:text-pink-900 font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow rounded-lg mb-6 border border-pink-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-pink-900">
                      Welcome back, {user.email.split('@')[0]}! 🎂
                    </h3>
                    <p className="text-sm text-pink-600">
                      Ready to order something sweet?
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-pink-600">Member since</p>
                  <p className="text-lg font-semibold text-pink-900">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Modal */}
          {cart.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-pink-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-pink-900">Your Cart</h3>
                <button
                  onClick={() => setCart([])}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-3 mb-4">
                {cart.map((cake, index) => (
                  <div key={index} className="flex justify-between items-center bg-pink-50 p-3 rounded">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{cake.image}</span>
                      <div>
                        <p className="font-medium text-pink-900">{cake.name}</p>
                        <p className="text-sm text-pink-600">${cake.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-pink-200 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-pink-900">Total: ${getTotalPrice()}</span>
                <button
                  onClick={handleOrder}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 font-semibold"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}

          {/* Cake Categories */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">Choose Your Cake</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cakes.map((cake) => (
                <div key={cake.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-pink-200 hover:border-pink-300">
                  <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center text-6xl">
                    {cake.image}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-pink-900">{cake.name}</h3>
                      <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm font-medium">
                        {cake.category}
                      </span>
                    </div>
                    <p className="text-pink-700 mb-4">{cake.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-pink-600">${cake.price}</span>
                      <button
                        onClick={() => addToCart(cake)}
                        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 border border-pink-200">
              <h3 className="text-xl font-bold text-pink-900 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cart.map((cake, index) => (
                  <div key={index} className="flex justify-between text-pink-700">
                    <span>{cake.name}</span>
                    <span>${cake.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-pink-200 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-pink-900">Total: ${getTotalPrice()}</span>
                <button
                  onClick={handleOrder}
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 font-semibold text-lg"
                >
                  Complete Order
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}