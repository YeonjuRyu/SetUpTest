import ApolloClient from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new ApolloLink(),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
