import React from 'react';
import Button from './Button';
import { Check } from 'lucide-react';

interface PackageFeature {
  name: string;
  included: boolean;
}

interface BanquetPackage {
  name: string;
  price: number;
  capacity: string;
  features: string[];
}

interface PackageCardProps {
  package: BanquetPackage;
  isPopular?: boolean;
}

export default function PackageCard({ package: pkg, isPopular }: PackageCardProps) {
  return (
    <div className="relative flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {isPopular && (
        <div className="absolute top-4 right-4">
          <span className="bg-primary text-white px-3 py-1 text-sm font-medium rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="p-8 flex flex-col h-full">
        <div className="mb-6">
          <h3 className="text-2xl font-playfair text-secondary mb-2">
            {pkg.name}
          </h3>
          <div className="flex items-baseline mb-2">
            <span className="text-4xl font-bold text-primary">
              ${pkg.price}
            </span>
            <span className="text-gray-500 ml-2">/ event</span>
          </div>
          <p className="text-gray-600">
            Capacity: {pkg.capacity} guests
          </p>
        </div>

        <div className="flex-grow">
          <ul className="space-y-4 mb-8">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button 
          variant="primary" 
          size="lg"
          className="w-full font-semibold"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}