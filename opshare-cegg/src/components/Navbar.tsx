import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut, Settings, Gift, Award, Shield, ChevronDown } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import NavbarCredits from './NavbarCredits';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // You might want to redirect to home page after logout
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md backdrop-blur-sm bg-white/90 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="OpShare Logo" 
                className="h-9 w-auto mr-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xl font-hero font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                OpShare
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-gray-700 hover:text-green-600 font-hero font-medium text-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-green-500 after:transition-all hover:after:w-full">Browse</Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-green-600 font-hero font-medium text-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-green-500 after:transition-all hover:after:w-full">How It Works</Link>
            <Link to="/community" className="text-gray-700 hover:text-green-600 font-hero font-medium text-sm relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-green-500 after:transition-all hover:after:w-full">Community</Link>
            
            {isAuthenticated ? (
              <>
                <NavbarCredits />
                
                <Link to="/sell">
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-sm hover:shadow-md transition-all"
                    size="sm"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Sell
                  </Button>
                </Link>
                
                {/* User profile dropdown using Shadcn DropdownMenu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none px-1 focus:bg-transparent">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {user?.name?.charAt(0) || <User size={16} />}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-hero">{user?.name || 'User'}</span>
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="cursor-pointer">
                          <Shield size={16} className="mr-2 text-purple-600" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/missions" className="cursor-pointer">
                        <Award size={16} className="mr-2 text-amber-600" />
                        Missions & Rewards
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings size={16} className="mr-2 text-gray-600" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-green-600 font-hero">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-sm hover:shadow-md transition-all">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && <NavbarCredits />}
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg border-t border-gray-100 overflow-hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/browse" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-hero font-medium text-sm rounded-md">Browse</Link>
            <Link to="/how-it-works" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-hero font-medium text-sm rounded-md">How It Works</Link>
            <Link to="/community" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-hero font-medium text-sm rounded-md">Community</Link>
            
            {isAuthenticated ? (
              <>
                <div className="px-3 py-3 border-t border-gray-200 mt-2 space-y-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {user?.name?.charAt(0) || <User size={20} />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-hero font-medium">{user?.name || 'User'}</div>
                      <div className="text-sm text-gray-500 font-hero">{user?.email}</div>
                    </div>
                  </div>
                  
                  <Link to="/sell">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-sm hover:shadow-md transition-all"
                      size="sm"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      Sell
                    </Button>
                  </Link>
                  
                  <Link to="/dashboard" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-hero font-medium text-sm rounded-md">
                    Dashboard
                  </Link>
                  
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-hero font-medium text-sm rounded-md">
                      <Shield size={16} className="mr-2 text-purple-600" />
                      Admin Panel
                    </Link>
                  )}
                  
                  <Link to="/missions" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-hero font-medium text-sm rounded-md">
                    <Award size={16} className="mr-2 text-amber-600" />
                    Missions & Rewards
                  </Link>
                  
                  <Link to="/settings" className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-50 font-hero font-medium text-sm rounded-md">
                    <Settings size={16} className="mr-2 text-gray-600" />
                    Settings
                  </Link>
                  
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 font-hero font-medium text-sm"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="px-3 py-3 flex flex-col space-y-2">
                <Link to="/signin">
                  <Button variant="outline" className="w-full font-hero">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-sm hover:shadow-md transition-all font-hero">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
