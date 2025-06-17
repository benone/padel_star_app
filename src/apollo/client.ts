import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { authLink } from '@/src/auth/authLink';

const httpLink = createHttpLink({
  uri: 'https://api.padelstarclub.ru/graphql',
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});