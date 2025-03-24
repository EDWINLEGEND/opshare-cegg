
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Tools & Equipment',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    itemCount: 1243,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
  },
  {
    id: 2,
    name: 'Garden & Outdoor',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22a8 8 0 0 1 9.64-7.83"></path>
        <path d="M10.17 14.17A8 8 0 1 0 22 22"></path>
        <path d="M13.5 22a10 10 0 0 0-11.2-9.65"></path>
        <path d="M16 18a4 4 0 0 0-4.7-4"></path>
        <path d="M15.67 22a12 12 0 0 0 .55-11.817"></path>
        <path d="M18 22a8 8 0 0 0 2.4-5.5"></path>
        <circle cx="18" cy="5" r="1"></circle>
      </svg>
    ),
    itemCount: 872,
    color: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    id: 3,
    name: 'Electronics',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2"></rect>
        <path d="M9 22v-4h6v4"></path>
        <path d="M8 6h.01"></path>
        <path d="M16 6h.01"></path>
        <path d="M12 6h.01"></path>
        <path d="M12 10h.01"></path>
        <path d="M16 10h.01"></path>
        <path d="M8 10h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 14h.01"></path>
      </svg>
    ),
    itemCount: 1054,
    color: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    id: 4,
    name: 'Sporting Goods',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m8 14 2.5 2.5"></path>
        <path d="m14 8 2.5 2.5"></path>
        <path d="m8 8 8 8"></path>
      </svg>
    ),
    itemCount: 658,
    color: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    id: 5,
    name: 'Furniture',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="8" x="2" y="14" rx="2"></rect>
        <rect width="20" height="8" x="2" y="2" rx="2"></rect>
        <line x1="6" x2="6" y1="6" y2="6"></line>
        <line x1="6" x2="6" y1="18" y2="18"></line>
      </svg>
    ),
    itemCount: 531,
    color: 'bg-red-100',
    iconColor: 'text-red-700',
  },
  {
    id: 6,
    name: 'Clothing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
      </svg>
    ),
    itemCount: 423,
    color: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
];

const CategorySection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground text-lg">
            Find exactly what you need from thousands of items available across various categories.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="glass-card flex flex-col items-center p-6 text-center hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 ${category.iconColor}`}>
                {category.icon}
              </div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground">{category.itemCount} items</p>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/categories"
            className="inline-flex items-center text-green font-medium hover:text-green-700 transition-colors"
          >
            View all categories
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
