import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schemas.js';
import dotenv from "dotenv"

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: process.env.PORT || 3000 },
  });
console.log(`🚀 Server ready at ${url}`);
console.log(process.env.PORT)

