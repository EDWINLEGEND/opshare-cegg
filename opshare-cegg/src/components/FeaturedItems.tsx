import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import { Button } from "@/components/ui/button";

const featuredItems = [
  {
    id: 1,
    title: 'Professional DSLR Camera Kit',
    type: 'rent' as const,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=964&q=80',
    price: 35,
    perDay: true,
    location: 'Capitol Hill',
    distance: 1.2,
    owner: {
      name: 'Alex Morgan',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    saved: false,
  },
  {
    id: 2,
    title: 'Camping Set with Tent and Gear',
    type: 'share' as const,
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    price: null,
    location: 'Green Lake',
    distance: 2.4,
    owner: {
      name: 'Jamie Wilson',
      rating: 4.7,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
  },
  {
    id: 3,
    title: 'Mountain Bike - Giant XTC',
    type: 'rent' as const,
    image: 'https://images.unsplash.com/photo-1575585269294-7d28dd912db8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    price: 25,
    perDay: true,
    location: 'Fremont',
    distance: 0.8,
    owner: {
      name: 'Chris Parker',
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    saved: false,
  },
  {
    id: 4,
    title: 'Vintage Record Player',
    type: 'sell' as const,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    price: 120,
    location: 'Central District',
    distance: 3.5,
    owner: {
      name: 'Riley Johnson',
      rating: 4.6,
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
    saved: false,
  },
];

const FeaturedItems = () => {
  return (
    <section className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 animate-fade-in">
          <div>
            <span className="inline-block px-4 py-1 mb-3 text-sm font-semibold text-green-600 bg-green-50 rounded-full border border-green-100">
              Explore Items
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Featured Items</h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Discover high-quality items available in your community, from tools and equipment to furniture and electronics.
            </p>
          </div>
          <Link to="/browse">
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 border-green-300 text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors"
            >
              Browse all items
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ItemCard {...item} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/browse">
            <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all">
              See More Items
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
