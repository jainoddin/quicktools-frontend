'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getEndpoint } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  savedTools?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  updateUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  logout: async () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper to read cookies on the client side
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    // 1. Synchronous Optimistic Check
    // Instantly check for the non-httpOnly user_data cookie
    const userDataCookie = getCookie('user_data');
    
    if (userDataCookie) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userDataCookie));
        setUser(parsedUser);
        setIsAuthenticated(true);
        // If we found the cookie, we can stop loading instantly
        setIsLoading(false);
      } catch (e) {
        console.error('Failed to parse user_data cookie:', e);
      }
    }
    
    // 2. Background Verification (Silently verify the secure httpOnly token)
    const verifyAuth = async () => {
      try {
        const response = await fetch(getEndpoint('/api/auth/me'), { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setUser(data.user);
            setIsAuthenticated(true);
            
            // Re-sync cookie just in case it was modified
            const newUserData = JSON.stringify({
              id: data.user.id || data.user._id,
              name: data.user.name,
              email: data.user.email,
              avatar: data.user.avatar
            });
            document.cookie = `user_data=${encodeURIComponent(newUserData)}; path=/; max-age=${7 * 24 * 60 * 60}`;
          } else {
            // Token expired or invalid
            handleLogoutCleanUp();
          }
        } else {
          handleLogoutCleanUp();
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const handleLogoutCleanUp = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof document !== 'undefined') {
      document.cookie = 'user_data=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  };

  const logout = async () => {
    try {
      await fetch(getEndpoint('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
      });
      handleLogoutCleanUp();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout, updateUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
