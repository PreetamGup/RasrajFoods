import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import { MenuItem } from '../types/menu';
import { ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, setCart } = useUserContext();
  const { loggedIn } = useUserContext();
  const navigate = useNavigate();

  const handleIncreaseQuantity = (item: MenuItem) => {
    setCart((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem._id === item._id && cartItem.quantity !== undefined
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleDecreaseQuantity = (item: MenuItem) => {
    setCart((prevCartItems) =>
      prevCartItems
        .map((cartItem) =>
          cartItem._id === item._id && cartItem.quantity !== undefined
            ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity !== undefined && cartItem.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * (item.quantity ?? 0), 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (!loggedIn) {
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Please login to proceed to checkout.');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-12">
          <ShoppingBag className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-playfair text-gray-900">Your Cart</h1>
        </div>

        {cart.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex gap-6">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="grid grid-cols-2 items-start justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                            <p className="mt-1 text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center justify-end gap-4">
                            <button
                              onClick={() => handleDecreaseQuantity(item)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(item)}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-green-100 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            Subtotal
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 lg:col-span-5 lg:mt-0">
              <div className="sticky top-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-base font-medium text-gray-900">Order Total</dt>
                      <dd className="text-2xl font-semibold text-primary">₹{calculateTotal()}</dd>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2 group"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400" />
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">Your cart is empty</h3>
            <p className="mt-4 text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
            <div className="mt-8">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Browse Menu
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}