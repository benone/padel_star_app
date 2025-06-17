import { setContext } from '@apollo/client/link/context';
import { inMemory } from './tokenStorage';

export const authLink = setContext((_, { headers }) => {
  const token = inMemory.token;
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});