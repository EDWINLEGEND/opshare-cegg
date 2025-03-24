import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut, Settings, Gift, Award, Shield } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import NavbarCredits from './NavbarCredits';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    // You might want to redirect to home page after logout
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo.svg" 
                alt="OpShare Logo" 
                className="h-8 w-auto mr-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-bold text-green-600">OpShare</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-green-600">Browse</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-green-600">How It Works</Link>
            <Link to="/community" className="text-gray-700 hover:text-green-600">Community</Link>
            
            {isAuthenticated ? (
              <>
                <NavbarCredits />
                
                <Link 
                  to="/sell" 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Sell
                </Link>
                
                {/* User profile dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <User size={16} />
                      </div>
                    )}
                    <span>{user?.name || 'User'}</span>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link 
                          to="/admin/dashboard" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <Link 
                        to="/missions" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="flex items-center">
                          <Award size={16} className="mr-2" />
                          Missions & Rewards
                        </div>
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="flex items-center">
                          <Settings size={16} className="mr-2" />
                          Settings
                        </div>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-green-600">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && <NavbarCredits />}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/browse" className="block px-3 py-2 text-gray-700 hover:text-green-600">Browse</Link>
            <Link to="/how-it-works" className="block px-3 py-2 text-gray-700 hover:text-green-600">How It Works</Link>
            <Link to="/community" className="block px-3 py-2 text-gray-700 hover:text-green-600">Community</Link>
            
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 border-t border-gray-200 mt-2">
                  <div className="flex items-center space-x-3 mb-3">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{user?.name || 'User'}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  
                  <Link to="/sell" className="block px-3 py-2 bg-green-50 text-green-600 rounded-md mb-2">
                    <div className="flex items-center">
                      <ShoppingBag size={18} className="mr-2" />
                      Sell
                    </div>
                  </Link>
                  <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-green-600">Dashboard</Link>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="block px-3 py-2 text-gray-700 hover:text-green-600">Admin Panel</Link>
                  )}
                  <Link to="/missions" className="block px-3 py-2 text-gray-700 hover:text-green-600">Missions & Rewards</Link>
                  <Link to="/settings" className="block px-3 py-2 text-gray-700 hover:text-green-600">Settings</Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="block px-3 py-2 text-gray-700 hover:text-green-600">Sign In</Link>
                <Link to="/signup" className="block px-3 py-2 bg-green-600 text-white rounded-md">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
