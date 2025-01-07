import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-playfair text-secondary mb-8 text-center">
          About Us
        </h1>

        <div className="text-center lg:text-left space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            Welcome to <span className="text-primary font-semibold">Rasraj</span>, 
            your trusted destination for the finest snacks, sweets, and cakes. 
            We take pride in bringing you a delightful experience with our range of 
            carefully crafted products, designed to satisfy every palate.
          </p>

          <p>
            Since our inception, we have been committed to using only the highest quality 
            ingredients in our creations. Our expert chefs blend tradition and innovation 
            to ensure every bite is a celebration of taste and freshness. 
          </p>

          <p>
            At <span className="text-primary font-semibold">Rasraj</span>, we believe in 
            creating moments of joy. Whether it’s a festive occasion, a birthday celebration, 
            or a simple craving for something sweet, our products are here to make your 
            day special.
          </p>

          <p>
            Thank you for choosing <span className="text-primary font-semibold">Rasraj</span>. 
            We look forward to serving you and being a part of your cherished memories.
          </p>
        </div>

        {/* Call-to-Action */}
        <div className="mt-12 text-center">
          <Link to={"/menu"} className="px-6 py-3 bg-primary text-white rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors">
            Explore Our Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
