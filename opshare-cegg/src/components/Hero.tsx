import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-green animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-teal animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-yellow animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green bg-green-50 rounded-full">
                Sustainable Sharing Economy
              </span>
              <h1 className="text-balance font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground">
                Share Resources, <br/>
                <span className="text-green">Reduce Waste</span>,<br/>
                Build Community
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground text-balance">
              OpShare connects neighbors to share, rent, or resell items - 
              saving money while helping the planet. Join our growing community today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/sell" 
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                Share an Item
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/browse" 
                className="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Browse Items
              </Link>
            </div>
            
            <div className="relative mt-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green focus:border-green"
                placeholder="Search for items near you..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button className="p-1 focus:outline-none focus:shadow-outline rounded-full bg-green text-white h-8 w-8 flex items-center justify-center">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green"></span>
                10,000+ Items Shared
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-teal"></span>
                5,000+ Active Users
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow"></span>
                200+ Communities
              </span>
            </div>
          </div>
          
          <div className="relative animate-fade-in-slow" style={{ animationDelay: '0.3s' }}>
            <div className="relative z-10 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="People sharing resources"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 glass-card p-4 shadow-lg animate-float hidden md:block z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green/20 flex items-center justify-center text-green">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Sustainability Impact</p>
                  <p className="text-sm text-muted-foreground">50+ tons CO2 saved</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-lg animate-float hidden md:block z-20" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow/20 flex items-center justify-center text-yellow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                    <path d="M9 19h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Money Saved</p>
                  <p className="text-sm text-muted-foreground">$2.4M+ across community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="wave-divider mt-16"></div>
    </section>
  );
};

export default Hero;
