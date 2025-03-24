import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const AdminRoute: React.FC = () => {
  const { currentUser, isLoading, isAdmin } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }
  
  if (!currentUser) {
    // Redirect to login if not logged in
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  if (!isAdmin) {
    // Redirect to dashboard if user is not an admin
    return <Navigate to="/dashboard" replace />;
  }
  
  // Render the protected admin route content
  return <Outlet />;
};

export default AdminRoute; 