import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the context type
type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  signOut: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, you would call your API here
    // For demo purposes, we'll just set authenticated to true
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // Sign out function
  const signOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}; 