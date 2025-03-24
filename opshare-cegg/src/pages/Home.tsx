import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <div className="relative">
        <img
          src="/images/hero-image.jpg"
          alt="People sharing items in a community"
          className="w-full h-[500px] object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
            e.currentTarget.onerror = null;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Hero content */}
        </div>
      </div>
      {/* Add other home page components here */}
    </div>
  );
};

export default Home; 
