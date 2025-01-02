import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    title: 'North Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80',
    description: 'Rich and creamy curries with aromatic spices'
  },
  {
    title: 'South Indian',
    image: 'https://images.unsplash.com/photo-1665660710687-b44c50751054?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Authentic dosas and flavorful sambhar'
  },
  {
    title: 'Snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80',
    description: 'Classic chaats, somasa and quick bites'
  },
  {
    title: 'Desserts',
    image: 'https://images.unsplash.com/photo-1695568180070-8b5acead5cf4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Sweet delicacies to complete your meal'
  }
];



export default function CategorySection() {
  const navigate = useNavigate();

  const handleClick = (category:String)=>{
    navigate(`/menu?category=${category}`)
  }
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-['Playfair_Display'] text-[#8B4513] text-center mb-12">
          Explore Our Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div 
              key={category.title}
              className={`group  relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="w-full aspect-[13/8] md:aspect-[9/14] ">
                <img 
                  src={category.image}
                  alt={category.title}
                  className=" object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-2xl font-['Playfair_Display'] text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-200 mb-4 font-['Poppins'] text-sm">
                    {category.description}
                  </p>
                  <button onClick={()=>handleClick(category.title) } className="flex items-center text-[#FFA500] group-hover:text-white transition-colors duration-300">
                    Explore <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}