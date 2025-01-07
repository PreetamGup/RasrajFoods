import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import { MapPin, CreditCard, Package, Phone, User, Mail, MapPinIcon, Building, Map } from 'lucide-react';
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
      const {data: { order }} = await axios.post(`${import.meta.env.VITE_SERVER_API_V1}/payment/createOrder`, {
        userId: user._id,
        amount: totalAmount.toFixed(2).toString(),
        cart,
        customerInfo: {name: formData.name, contact: formData.mobile, address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`},
      
      },{withCredentials: true});

      console.log(order);

      const isScriptLoaded = await loadRazorpayScript();

      setLoading(false);

      if (!isScriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return;
      }

      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: totalAmount.toFixed(2).toString(),
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Package className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-playfair text-gray-900">Checkout</h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Delivery Address Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Delivery Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">Please fill in your delivery information</p>
              </div>

              <div className="border-t border-gray-100 px-6 py-8">
                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full pl-10 py-3 border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Mobile Field */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="block w-full pl-10 py-3 border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="9999999999"
                        maxLength={10}
                      />
                    </div>
                    {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
                  </div>

                  {/* Address Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="block w-full pl-10 py-3 border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          placeholder="123456"
                          maxLength={6}
                        />
                      </div>
                      {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="block w-full pl-10 py-3 border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          placeholder="Your City"
                        />
                      </div>
                      {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                    </div>
                  </div>

                  {/* Full Width Fields */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Map className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="block w-full pl-10 py-3 border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Your State"
                      />
                    </div>
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Full Address</label>
                    <div className="mt-1">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="block w-full py-3 px-4 border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Street address, apartment, suite, etc."
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="sticky top-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-primary" />
                    Order Summary
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">Review your order details</p>
                </div>

                <div className="border-t border-gray-100 px-6 py-4">
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-100">
                      {cart.map((item: any) => (
                        <li key={item._id} className="py-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-6 py-4">
                  <div className="flex items-center justify-between text-lg font-medium text-gray-900">
                    <p>Total Amount</p>
                    <p>₹{calculateTotal()}</p>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <button
                    onClick={handlePayment}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay Securely
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-lg font-medium text-gray-900">Processing Payment...</p>
            <p className="mt-2 text-sm text-gray-500">Please don't close this window</p>
          </div>
        </div>
      )}
    </div>
  );
  }