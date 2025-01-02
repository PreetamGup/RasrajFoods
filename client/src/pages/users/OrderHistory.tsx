import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from '../../context/user.context'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Order } from '../../types/Order'

const OrderHistory = () => {

  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])
  const {user, setLoading } = useUserContext()

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_API_V1}/user/userdata/${user._id}`);
      setOrders(response.data.user.orderHistory)
    } catch (error: any) {
      console.error("Error fetching orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders()
  }, [])

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">Order History</h1>
      <div className="order-list space-y-4">
        {orders.sort((a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).map((order: Order) => (
          <div key={order._id} className="order-item border bg-orange-400 bg-opacity-50 p-4 rounded-md shadow-sm">
            <div className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-2 gap-2 mb-4">
              <div className="flex justify-between md:block">
                <span className="font-semibold">Order ID:</span>
                <span className="md:mt-1 px-1">{order.order_id}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="font-semibold">Order Date:</span>
                <span className="md:mt-1 px-1">{new Date(order.orderDate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="font-semibold">Status:</span>
                <span className="text-green-500 md:mt-1 px-1">{order.status}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="font-semibold">Total Amount:</span>
                <span className="md:mt-1 px-1">₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="font-semibold">Address:</span>
                <span className="md:mt-1 px-1">{order.customerInfo.address}</span>
              </div>



            </div>
              
            
            <button 
              onClick={() => toggleOrderDetails(order._id)}
              className="w-full flex items-center justify-center space-x-2 p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              <span>View Items</span>
              {expandedOrders.includes(order._id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expandedOrders.includes(order._id) && (
              <div className="order-items mt-4 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Qty</th>
                <th className="px-4 py-2 border-b text-left">Price</th>
                <th className="px-4 py-2 border-b text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
            <td className="px-4 py-2 border-b">{item.food.name}</td>
            <td className="px-4 py-2 border-b">{item.quantity}</td>
            <td className="px-4 py-2 border-b">₹{item.food.price}</td>
            <td className="px-4 py-2 border-b">
              ₹{(item.food.price * item.quantity).toFixed(2)}
            </td>
                </tr>
              ))}
              <tr>
                <td 
            colSpan={3} 
            className="px-4 py-2 border-b bg-gray-200 text-right font-semibold"
                >
            Total Amount
                </td>
                <td className="px-4 py-2 border-b">₹{order.totalAmount}</td>
              </tr>
            </tbody>
          </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory