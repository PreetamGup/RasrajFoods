import { useState, useEffect } from 'react';
import ProductCard from '../components/shared/ProductCard';
import { MenuItem } from '../types/menu';
import { useSearchParams } from 'react-router-dom';
import { useUserContext } from '../context/user.context';

export default function Menu() {
  // const [products, setProducts] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchParams] = useSearchParams();
  const { cart, setCart, loading, products } = useUserContext();

  const categories = ['all', ...new Set(products.map(item => item.category))];

  const filteredItems = selectedCategory === 'all' 
    ? products 
    : products.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    if (!cart.some((cartItem: MenuItem) => cartItem._id === item._id)) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    console.log(cart);
  };

  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     try {
  //       setLoading(true);
  //       console.log("fetched all products")
  //       const response = await axios.get(`${import.meta.env.VITE_SERVER_API_V1}/product/allproducts`);
  //       setProducts(response.data.products); // Assuming the API response structure is an array of products
  //       setLoading(false);
  //     } catch (error: any) {
  //       console.error('Error fetching products:', error.message);
  //       setLoading(false);
  //     }
  //   };
  //   getAllProducts();
  // }, []);

  useEffect(() => {
    if (searchParams.has('category')) {
      setSelectedCategory(searchParams.get('category') as string);
    }
  }, [searchParams]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair text-secondary mb-8 text-center">
          Our Menu
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 sm:flex-nowrap overflow-x-auto mb-8 pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm lg:text-base rounded-full whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md ${
                selectedCategory === category
                  ? "bg-primary text-white scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          { !loading && filteredItems.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              onAddToCart={handleAddToCart}
              
            />
          ))
        }

        { loading &&

          [1,2,3,4].map((item,idx) =>(
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full animate-pulse">
              <div className="relative pt-[56.25%] bg-gray-200"></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="flex-grow">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))
        
        }

          
        
        
        </div>
      </div>
    </div>
  );
}
