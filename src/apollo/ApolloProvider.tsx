import React from 'react';
import { ApolloProvider as Provider } from '@apollo/client';
import { apolloClient } from './client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  return <Provider client={apolloClient}>{children}</Provider>;
}