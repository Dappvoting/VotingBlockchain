// apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const apolloClient = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/74144/voting/version/latest', // Thay thế bằng URL subgraph của bạn
  cache: new InMemoryCache()
});

provideApolloClient(apolloClient);
export default apolloClient;
