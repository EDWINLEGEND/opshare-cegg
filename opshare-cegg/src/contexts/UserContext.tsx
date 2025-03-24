import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('opshare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Check if the user's email is from opshare.com domain
  const isAdmin = user?.email?.endsWith('@opshare.com') || false;

  // Login function
  const login = (userData: User) => {
    // Check if the user has an opshare.com email and set admin status
    const adminUser = {
      ...userData,
      isAdmin: userData.email.endsWith('@opshare.com')
    };
    
    setUser(adminUser);
    localStorage.setItem('opshare_user', JSON.stringify(adminUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('opshare_user');
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isAdmin,
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 