import config from './config';
import {ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

export const graphClient = new ApolloClient({
  link: new HttpLink({
    uri: config.graphUrl,
  }),
  cache: new InMemoryCache()
})

export const legacyGraphClient = new ApolloClient({
  link: new HttpLink({
    uri: config.legacyGraphUrl,
  }),
  cache: new InMemoryCache()
})



