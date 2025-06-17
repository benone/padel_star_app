import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from './AuthContext';

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { status } = useAuth();
  
  if (status === 'loading') return null;
  if (status === 'anonymous') {
    return <Redirect href="/Screens/Login" />;
  }
  
  return <>{children}</>;
}

export function AnonymousGate({ children }: AuthGateProps) {
  const { status } = useAuth();
  
  if (status === 'loading') return null;
  if (status === 'authenticated') {
    return <Redirect href="/(tabs)" />;
  }
  
  return <>{children}</>;
}