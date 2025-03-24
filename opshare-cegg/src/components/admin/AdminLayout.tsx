import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Leaf, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Home,
  Bell,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Listings', href: '/admin/listings', icon: ShoppingBag },
    { name: 'Financials', href: '/admin/financials', icon: DollarSign },
    { name: 'Credit System', href: '/admin/credits', icon: Leaf },
    { name: 'Reports', href: '/admin/reports', icon: BarChart2 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar for desktop */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 transition-transform duration-300 ease-in-out transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-auto lg:h-screen shadow-xl
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700">
          <div className="flex items-center">
            <div className="h-9 w-9 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center rounded-lg shadow-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-semibold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">OpShare Admin</span>
          </div>
          <button
            className="lg:hidden hover:bg-gray-700 p-1 rounded-full"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </div>
        <nav className="mt-5 px-3 space-y-1.5">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-green-600/20 to-green-500/10 text-white border-l-4 border-green-500 pl-3' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                `}
              >
                <item.icon 
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0 
                    ${isActive ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-300'}
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-gray-700 pt-4 mt-6">
            <div className="flex items-center px-4 py-2 text-sm text-gray-400 rounded-lg">
              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8 border border-gray-700">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                  <AvatarFallback className="bg-gray-700 text-gray-300">AD</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3 truncate">
                <p className="text-sm font-medium text-gray-300 truncate">
                  {currentUser?.displayName || currentUser?.email}
                </p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <div className="bg-white shadow-sm z-10 border-b">
          <div className="px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open sidebar</span>
              </button>
              
              <div className="hidden md:flex ml-4 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input 
                  type="search" 
                  placeholder="Search admin..." 
                  className="pl-10 bg-gray-50 border-gray-200 w-64 h-9 text-sm" 
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full border-0">
                    <Avatar className="h-9 w-9 border border-gray-200">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                      <AvatarFallback className="bg-green-100 text-green-700">AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{currentUser?.displayName || currentUser?.email}</p>
                      <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex cursor-pointer">
                      <Home className="mr-2 h-4 w-4" />
                      <span>User Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/settings" className="flex cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 