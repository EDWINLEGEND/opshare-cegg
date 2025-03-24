import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements - enhanced with more modern styling */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-green-400 mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-teal-400 mix-blend-multiply filter blur-3xl opacity-15" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-yellow-400 mix-blend-multiply filter blur-3xl opacity-15" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="inline-block px-4 py-1.5 mb-5 text-sm font-semibold text-green-600 bg-green-50 rounded-full border border-green-100 shadow-sm">
                Sustainable Sharing Economy
              </span>
              <h1 className="text-balance font-hero font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-800">
                Share Resources, <br/>
                <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Reduce Waste</span>,<br/>
                Build Community
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 text-balance">
              OpShare connects neighbors to share, rent, or resell items - 
              saving money while helping the planet. Join our growing community today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sell">
                <Button 
                  className="w-full sm:w-auto h-12 px-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all font-medium text-base"
                >
                  Share an Item
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto h-12 px-6 bg-white text-gray-800 font-medium text-base border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm"
                >
                  Browse Items
                </Button>
              </Link>
            </div>
            
            <div className="relative mt-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  className="pl-10 pr-16 py-6 h-12 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
                  placeholder="Search for items near you..."
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <Button 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md"
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                10,000+ Items Shared
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                5,000+ Active Users
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
                200+ Communities
              </span>
            </div>
          </div>
          
          <div className="relative animate-fade-in-slow" style={{ animationDelay: '0.3s' }}>
            <div className="relative z-10 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt="People sharing resources"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating elements - enhanced with more modern glass styling */}
            <div className="absolute -top-8 -right-8 bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-xl animate-float hidden md:block z-20 border border-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sustainability Impact</p>
                  <p className="text-sm text-gray-600">50+ tons CO2 saved</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-lg p-4 rounded-xl shadow-xl animate-float hidden md:block z-20 border border-white" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                    <path d="M9 19h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Money Saved</p>
                  <p className="text-sm text-gray-600">$2.4M+ across community</p>
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
