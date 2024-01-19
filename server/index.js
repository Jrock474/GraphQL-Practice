import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// types
import { typeDefs, resolvers } from './schemas.js';

const server = new ApolloServer({
  typeDefs,
  resolvers
});


const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
