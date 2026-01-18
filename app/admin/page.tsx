'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface Order {
  id: string
  user_id: string
  user_email: string
  items: any[]
  total_amount: number
  status: string
  order_details: any
  created_at: string
}

interface User {
  id: string
  email: string
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is admin (you can customize this logic)
  const isAdmin = user?.email === 'admin@sweermeraki.com' || user?.email?.includes('admin') || user?.email === 'taranjeetsingh@tarun.com' || user?.email === 'tssandy0874@gmail.com'

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.push('/login')
        return
      }

      setUser(session.user as User)

      // If not admin, redirect to dashboard
      if (!isAdmin && session.user.email !== 'admin@sweermeraki.com' && session.user.email !== 'tssandy0874@gmail.com') {
        router.push('/dashboard')
        return
      }

      // Fetch all orders
      fetchOrders()
    }

    checkUser()
  }, [router])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        // If table doesn't exist, show empty state
        setOrders([])
      } else {
        setOrders(data || [])
      }
    } catch (err) {
      console.error('Fetch orders error:', err)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingOrder(orderId)
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) {
        console.error('Error updating order:', error)
        alert('Failed to update order status')
      } else {
        // Update local state
        setOrders(orders.map(order =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        ))
      }
    } catch (err) {
      console.error('Update error:', err)
      alert('Failed to update order status')
    } finally {
      setUpdatingOrder(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.total_amount, 0)
  }

  const getOrderCount = () => {
    return orders.length
  }

  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'pending').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-pink-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-pink-900 mb-2">Access Denied</h1>
          <p className="text-pink-700 mb-4">You don't have permission to access the admin dashboard.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">👑</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-pink-800">Admin Dashboard</h1>
                <p className="text-sm text-pink-600">Sweer Meraki by Hanshika</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-pink-700">Welcome, {user.email.split('@')[0]}</span>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-pink-700 hover:text-pink-900 font-medium"
              >
                Customer View
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg border border-pink-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 text-lg">📦</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Orders
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {getOrderCount()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border border-pink-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-lg">⏳</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Orders
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {getPendingOrders()}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border border-pink-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">💰</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Revenue
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ${getTotalRevenue().toFixed(2)}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border border-pink-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-lg">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Avg Order Value
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ${getOrderCount() > 0 ? (getTotalRevenue() / getOrderCount()).toFixed(2) : '0.00'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md border border-pink-200">
            <div className="px-4 py-5 sm:px-6 border-b border-pink-200">
              <h3 className="text-lg leading-6 font-medium text-pink-900">
                All Orders
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-pink-600">
                Manage and track all customer orders
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-pink-900 mb-2">No orders yet</h3>
                <p className="text-pink-600">Orders will appear here once customers start placing them.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-pink-200">
                  <thead className="bg-pink-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-pink-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-pink-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-pink-25">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-900">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-700">
                          {order.user_email}
                        </td>
                        <td className="px-6 py-4 text-sm text-pink-700">
                          <div className="space-y-1">
                            {order.items.map((item: any, index: number) => (
                              <div key={index} className="flex items-center">
                                <span className="text-lg mr-2">{item.image}</span>
                                <span>{item.name} (${item.price})</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-900">
                          ${order.total_amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-700">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            disabled={updatingOrder === order.id}
                            className="border border-pink-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {updatingOrder === order.id && (
                            <span className="ml-2 text-pink-600">Updating...</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}