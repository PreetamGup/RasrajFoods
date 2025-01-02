import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckOut() {
  const { user, cart, loading, setLoading } = useUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.fullName,
    mobile: user.mobile.toString(),
    pincode: '',
    address: user.address,
    city: '',
    state: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (cart.length === 0) {
      alert('Your cart is empty. Redirecting to the cart page.');
      navigate('/cart');
    }
  }, [cart, navigate]);

  const calculateTotal = () => {
    return cart
      .reduce(
        (total: number, item: any) => total + item.price * (item.quantity ?? 0),
        0
      )
      .toFixed(2);
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(formData.mobile))
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!/^[1-9][0-9]{5}$/.test(formData.pincode))
      newErrors.pincode = 'Enter a valid 6-digit PIN code';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      alert('Please fill all the required fields correctly.');
      return;
    }

    setLoading(true);

    try {
      const totalAmount = parseFloat(calculateTotal()) * 100; // Convert to paisa
      const {data: { order }} = await axios.post('http://localhost:8080/api/v1/payment/createOrder', {
        userId: user._id,
        amount: totalAmount.toString(),
        cart,
        customerInfo: {name: formData.name, contact: formData.mobile, address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`},
      
      });

      console.log(order);

      const isScriptLoaded = await loadRazorpayScript();

      setLoading(false);

      if (!isScriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return;
      }

      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: totalAmount.toString(),
        currency: 'INR',
        name: 'Rasraj Foods',
        description: 'Purchase Description',
        image: 'https://pbs.twimg.com/profile_images/1553750801000300544/Cvvw3fh3_400x400.jpg',
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_SERVER_API_V1}/payment/verification`,
        prefill: {
          name: formData.name, // Prefill name
          contact: formData.mobile, // Prefill contact
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
        },
        theme: {
          color: '#F37254', // Customize the payment modal color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Failed to process payment. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 lg:w-2/3 mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair text-secondary mb-8 text-center">
          Checkout
        </h1>
        <div className="bg-orange-100 p-6 rounded-lg shadow-lg ">
          <div className="lg:flex lg:space-x-8">
            {/* Delivery Address Form */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Delivery Address
              </h2>
              <form className="space-y-4 mb-8 ">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-500 px-1 py-1 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Mobile Field */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-500 px-1 py-1 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                {/* PIN Code Field */}
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    PIN Code
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-500 px-1 py-1 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>

                {/* Address Field */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-500 px-1 py-1 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City Field */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-500 px-1 py-1 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State Field */}
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-500 px-1 py-1 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/2 border-l-2 bg-white rounded-lg p-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <ul className="space-y-4">
                {cart.map((item: any) => (
                  <li key={item._id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>
                      ₹{item.price.toFixed(2)} x {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">
                  ₹{calculateTotal()}
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="mt-6 w-full px-6 py-3 bg-primary text-white rounded-full text-lg font-semibold hover:bg-secondary transition-colors"
              >
                Pay with Razorpay
              </button>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-70 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
              {/* Loading Text */}
              <div className="text-white text-xl font-medium mt-4">
                Processing Payment...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  }