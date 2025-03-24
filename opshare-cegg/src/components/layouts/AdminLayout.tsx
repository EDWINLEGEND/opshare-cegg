import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { LogOut, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/signin');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-600">OpShare Admin</h1>
            </div>
            
            {/* User Profile and Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-2" />
                Back to Site
              </Button>
              
              <div className="flex items-center">
                <Avatar className="h-8 w-8 bg-green-100 text-green-600">
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@opshare.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content - with constrained width */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 