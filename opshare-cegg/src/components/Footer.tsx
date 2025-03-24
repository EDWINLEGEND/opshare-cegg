import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8 border-t relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img 
                src="/logo.svg" 
                alt="OpShare Logo" 
                className="w-10 h-10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">OpShare</span>
            </Link>
            
            <p className="text-gray-600 mb-6 max-w-md">
              OpShare connects neighbors to share, rent, or resell items - 
              saving money while helping the planet. Join our growing community today!
            </p>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-green-200 hover:border-green-300 hover:bg-green-50 text-green-600">
                <Facebook size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-green-200 hover:border-green-300 hover:bg-green-50 text-green-600">
                <Twitter size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-green-200 hover:border-green-300 hover:bg-green-50 text-green-600">
                <Instagram size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-green-200 hover:border-green-300 hover:bg-green-50 text-green-600">
                <Github size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  <span className="inline-block w-0 opacity-0 -ml-2 group-hover:w-4 group-hover:opacity-100 transition-all">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  <span className="inline-block w-0 opacity-0 -ml-2 group-hover:w-4 group-hover:opacity-100 transition-all">→</span>
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  <span className="inline-block w-0 opacity-0 -ml-2 group-hover:w-4 group-hover:opacity-100 transition-all">→</span>
                  Community
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  <span className="inline-block w-0 opacity-0 -ml-2 group-hover:w-4 group-hover:opacity-100 transition-all">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  <span className="inline-block w-0 opacity-0 -ml-2 group-hover:w-4 group-hover:opacity-100 transition-all">→</span>
                  Impact Report
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/tools" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  Tools & Equipment
                </Link>
              </li>
              <li>
                <Link to="/category/outdoor" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  Garden & Outdoor
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  Sporting Goods
                </Link>
              </li>
              <li>
                <Link to="/category/furniture" className="text-gray-600 hover:text-green-600 transition-colors flex items-center hover:pl-1 transition-all">
                  Furniture
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <span className="text-gray-600">123 Green Street, Eco City, EC 12345</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                  <Phone size={14} />
                </div>
                <span className="text-gray-600">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 flex-shrink-0">
                  <Mail size={14} />
                </div>
                <span className="text-gray-600">contact@opshare.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-200" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="footer-brand">
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">OpShare</h3>
            <p>&copy; {new Date().getFullYear()} OpShare. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-green-600 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-green-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
