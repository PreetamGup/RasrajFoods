import React from 'react';
import { MenuItem } from '../../types/menu';
import Button from './Button';
import { ShoppingCart } from 'lucide-react';


interface ProductCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;

}

export default function ProductCard({ item, onAddToCart }: ProductCardProps) {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative pt-[56.25%]">
        <img 
          src={item.image} 
          alt={item.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-playfair font-semibold text-secondary">
            {item.name}
          </h3>
          <span className="text-primary font-semibold text-lg">
           ₹{item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {item.description}
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {item.isVegetarian && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                Veg
              </span>
            )}
            {item.spicyLevel  && (
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                Spicy { Array(item.spicyLevel).fill('🌶️').join('') }
              </span>
            )}
          </div>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => onAddToCart(item)}
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
