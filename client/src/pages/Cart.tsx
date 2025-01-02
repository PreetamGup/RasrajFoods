import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import { MenuItem } from '../types/menu';

export default function Cart() {
  const { cart, setCart } = useUserContext();
  const { loggedIn } = useUserContext();
  const navigate = useNavigate(); // React Router's navigate hook

  const handleIncreaseQuantity = (item: MenuItem) => {
    setCart((prevCartItems: MenuItem[]) =>
      prevCartItems.map((cartItem: MenuItem) =>
        cartItem._id === item._id && cartItem.quantity !== undefined
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
    console.log(`Increase quantity for ${item.name}`);
  };

  const handleDecreaseQuantity = (item: MenuItem) => {
    setCart((prevCartItems: MenuItem[]) =>
      prevCartItems
        .map((cartItem: MenuItem) =>
          cartItem._id === item._id && cartItem.quantity !== undefined
            ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
            : cartItem
        )
        .filter((cartItem: MenuItem) => cartItem.quantity !== undefined && cartItem.quantity > 0)
    );
    console.log(`Decrease quantity for ${item.name}`);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total: number, item: MenuItem) => total + item.price * (item.quantity ?? 0),
      0
    ).toFixed(2);
  };

  const handleCheckout = () => {
    if (!loggedIn) {
      alert('Please login to proceed to checkout.');
      navigate('/login'); // Redirect to login page
    } else {
      navigate('/checkout'); // Redirect to checkout page
    }
  };

  console.log(cart)

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 lg:w-2/3 mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair text-secondary mb-8 text-center">
          Your Cart
        </h1>

        {cart.length > 0 ? (
          <div className="space-y-6">
            {cart.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">
                      ₹{item.price.toFixed(2)} x {item.quantity} ={' '}
                      {(item.price.toFixed(2) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right">
              <h3 className="text-2xl font-semibold text-gray-800">
                Total: ₹{calculateTotal()}
              </h3>
              <button
                onClick={handleCheckout} // Add click handler for checkout
                className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-700">
            Your cart is empty.{' '}
            <Link to="/menu" className="text-primary font-semibold">
              Explore our menu
            </Link>{' '}
            to add items.
          </p>
        )}
      </div>
    </div>
  );
}
