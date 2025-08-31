import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context for direct usage if needed
export { AuthContext };

// Props interface for the auth provider
interface AuthProviderProps {
  children: ReactNode;
}

// Main authentication provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State to store the current user
  const [user, setUser] = useState<User | null>(null);

  // Login function to authenticate users
  const login = async (email: string, password: string) => {
    // Simulate login authentication
    if (email === 'demo@example.com' && password === 'demo123') {
      const user: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        isAuthenticated: true,
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, City, State 12345',
        bio: 'Book lover and avid reader. Always looking for the next great story.'
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Register function to create new accounts
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // Simulate user registration
    const user: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      isAuthenticated: true,
    };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // Logout function to clear user session
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for saved user on component mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Context value object
  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
