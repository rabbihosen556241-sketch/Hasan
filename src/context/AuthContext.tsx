import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loginAs: (role: UserRole) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('roktobondhu_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default to an active logged-in regular user for immediate testing convenience
    return {
      id: 'user-donor-1',
      name: 'তানভীর আহমেদ',
      email: 'tanvir@gmail.com',
      phone: '01819223344',
      role: 'donor',
      donorId: 'donor-1',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      createdAt: '2025-01-15T10:00:00.000Z',
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('roktobondhu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('roktobondhu_user');
    }
  }, [user]);

  const loginAs = async (role: UserRole) => {
    try {
      const loggedUser = await api.loginDemo(role);
      setUser(loggedUser);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        loginAs,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
