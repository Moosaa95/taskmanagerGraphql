// src/ApolloProvider.tsx
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
} from '@apollo/client';

const token = localStorage.getItem('token')

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', // The backend GraphQL endpoint
    headers: {
      Authorization: token? `Bearer ${token}` : ''
    }
  }),
  cache: new InMemoryCache(),
});

const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
