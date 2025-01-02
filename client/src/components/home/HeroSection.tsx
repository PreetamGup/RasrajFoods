import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80")',
          transform: 'translateZ(0)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] text-white mb-6">
            Experience the Royal Taste of India
          </h1>
          <p className="text-xl text-gray-200 mb-8 font-['Poppins']">
            Discover authentic flavors crafted with passion and tradition
          </p>
          <button className="bg-[#FFA500] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#8B4513] transition-colors duration-300">
            Explore Menu
          </button>
        </div>
      </div>
    </div>
  );
}