import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
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
              <span className="font-bold text-2xl text-green">OpShare</span>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              OpShare connects neighbors to share, rent, or resell items - 
              saving money while helping the planet. Join our growing community today!
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center hover:bg-green-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center hover:bg-green-700 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center hover:bg-green-700 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-green transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-green transition-colors">Browse Items</Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-green transition-colors">Community</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-green transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/impact" className="text-muted-foreground hover:text-green transition-colors">Impact Report</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/tools" className="text-muted-foreground hover:text-green transition-colors">Tools & Equipment</Link>
              </li>
              <li>
                <Link to="/category/outdoor" className="text-muted-foreground hover:text-green transition-colors">Garden & Outdoor</Link>
              </li>
              <li>
                <Link to="/category/electronics" className="text-muted-foreground hover:text-green transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/category/sports" className="text-muted-foreground hover:text-green transition-colors">Sporting Goods</Link>
              </li>
              <li>
                <Link to="/category/furniture" className="text-muted-foreground hover:text-green transition-colors">Furniture</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-green mt-1" />
                <span className="text-muted-foreground">123 Green Street, Eco City, EC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green" />
                <span className="text-muted-foreground">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green" />
                <span className="text-muted-foreground">contact@opshare.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="footer-brand">
            <h3 className="text-xl font-bold text-green">OpShare</h3>
            <p>&copy; {new Date().getFullYear()} OpShare. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-green transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-green transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-green transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
