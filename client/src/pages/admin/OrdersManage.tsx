import axios from "axios";
import { useEffect, useState } from "react";
import { Order } from "../../types/Order";


const OrdersManage = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<string>("Completed");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_V1}/payment/allorders?status=${status}`,{withCredentials: true});
      setAllOrders(response.data.orders);
    } catch (error: any) {
      console.error("Error fetching orders:", error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [status]);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handlePrint = (order: Order) => {
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt</title>
          <style>
            @page {
              size: 80mm 150mm;
              margin: 0;
            }
            body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 10px;
              line-height: 1.2;
              margin: 0;
              padding: 10px;
              width: 80mm;
            }
            .header {
              text-align: center;
              margin-bottom: 8px;
            }
            .logo {
              width: 50px;
              height: 50px;
              margin: 0 auto 8px;
              display: block;
            }
            .divider {
              border-top: 1px dotted #000;
              margin: 4px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin: 2px 0;
            }
            .total {
              font-weight: bold;
              margin-top: 4px;
            }
            .footer {
              text-align: center;
              margin-top: 8px;
              font-size: 9px;
            }
            h2 {
              font-size: 12px;
              margin: 0;
            }
            p {
              margin: 2px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/logos/apple-touch-icon.png" alt="Logo" class="logo" />
            <h2>ORDER RECEIPT</h2>
            <p>#${order.order_id}</p>
            <p>${new Date(order.orderDate).toLocaleString()}</p>
          </div>
          
          <div class="divider"></div>
          
          <div>
            <p>Customer: ${order.customerInfo.name}</p>
            <p>Contact: ${order.customerInfo.contact}</p>
            <p>Address: ${order.customerInfo.address}</p>
          </div>
          
          <div class="divider"></div>
          
          <div>
            ${order.items.map(item => `
              <div class="item">
                <span>${item.food.name} x${item.quantity}</span>
                <span>₹${(item.food.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="divider"></div>
          
          <div class="total">
            <div class="item">
              <span>Total Amount:</span>
              <span>₹${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for your order!</p>
          </div>
        </body>
      </html>
    `;

    // Create an iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Write content to iframe and print
    iframe.contentWindow?.document.write(content);
    iframe.contentWindow?.document.close();

    // Wait for content to load
    setTimeout(() => {
      iframe.contentWindow?.print();
      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 100);
    }, 250);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <div className="mb-4">
        <label htmlFor="status" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="status"
          name="status"
          className="border border-gray-300 rounded p-1"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Contact</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <tr key={order._id}>
              <td className="border border-gray-300 px-4 py-2">{order.order_id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.customerInfo.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.customerInfo.contact}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.customerInfo.address}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => openModal(order)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.order_id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedOrder.customerInfo.name}
            </p>
            <p>
              <strong>Contact:</strong> {selectedOrder.customerInfo.contact}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.customerInfo.address}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul className="list-disc pl-6">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.food.name} - ₹{item.food.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                onClick={() => handlePrint(selectedOrder)}
              >
                Print Receipt
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManage;