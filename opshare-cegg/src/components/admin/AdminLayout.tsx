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
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar for desktop */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-auto lg:h-screen
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-green-500" />
            <span className="ml-2 text-xl font-semibold">OpShare Admin</span>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-md group
                  ${isActive 
                    ? 'bg-gray-800 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
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
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 py-2 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </button>
            
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">
                {currentUser?.displayName || currentUser?.email}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="flex w-full">
                      <Home className="mr-2 h-4 w-4" />
                      <span>User Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/admin/settings" className="flex w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 