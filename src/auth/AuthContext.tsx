import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { saveAccessToken, deleteAccessToken, loadAccessToken } from './tokenStorage';

type AuthStatus = 'loading' | 'anonymous' | 'authenticated';

interface AuthContextType {
  status: AuthStatus;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const client = useApolloClient();

  const bootstrap = async () => {
    try {
      const token = await loadAccessToken();
      setStatus(token ? 'authenticated' : 'anonymous');
    } catch (error) {
      console.error('Failed to bootstrap auth:', error);
      setStatus('anonymous');
    }
  };

  const login = async (token: string) => {
    try {
      await saveAccessToken(token);
      await client.resetStore();
      setStatus('authenticated');
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await deleteAccessToken();
      await client.resetStore();
      setStatus('anonymous');
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const value: AuthContextType = {
    status,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}